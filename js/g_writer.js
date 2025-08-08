/*
 * g_writer.js (v21-date-after-scroll)
 * - Chrome storage → payload (no dmcaProfile, no hardcoding)
 * - Robust text fill (from v9): native setters, proper events, host propagation
 * - Works inside iframe[name="app"]
 * - Radios: choose "No / いいえ" when found (best-effort)
 * - Checkboxes: tick all Material + native checkboxes (best-effort)
 * - Auto-retry passes for late-rendered controls
 * - Suppress focus-induced auto scrolling during autofill
 * - Scroll to bottom exactly once, after the final pass (no animation)
 * - FIX: URL textarea fill works again (regex, newline, iframe-aware fallback)
 * - NEW: Set “署名日” to today exactly once, only after all other fills & final scroll
 */
(() => {
  'use strict';

  const AUTO_RUN = true;
  const MAX_ATTEMPTS = 6;
  const PASS_INTERVAL_MS = 500;

  // --- Helpers: quiet logging -----------------------------------------------
  const log = (..._args) => {};
  const warn = (..._args) => {};
  const err  = (...args) => { try{ console.error('[g_writer]', new Date().toISOString().slice(11,19), ...args); }catch(_){} };

  // --- Frame/scroll helpers --------------------------------------------------
  const getRootDoc = () => {
    const frame = document.querySelector('iframe[name="app"]');
    return (frame && frame.contentDocument) ? frame.contentDocument : document;
  };
  const getScrollTarget = () => {
    const frame = document.querySelector('iframe[name="app"]');
    if (frame && frame.contentDocument && frame.contentWindow) {
      const doc = frame.contentDocument;
      const win = frame.contentWindow;
      const root = doc.scrollingElement || doc.documentElement || doc.body;
      return { doc, win, root };
    }
    const doc = document;
    const win = window;
    const root = doc.scrollingElement || doc.documentElement || doc.body;
    return { doc, win, root };
  };
  function scrollToBottomFinal() {
    try {
      const { win, root } = getScrollTarget();
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto'; // no animation, no jitter
      root.scrollTop = root.scrollHeight;
      try { win.scrollTo(0, root.scrollHeight); } catch {}
      setTimeout(() => { root.style.scrollBehavior = prev || ''; }, 0);
    } catch (e) {
      err('scrollToBottomFinal failed', e);
    }
  }

  // Avoid browser auto-scroll on focus
  const safeFocus = (el) => {
    try { el.focus({ preventScroll: true }); }
    catch { try { el.focus(); } catch {} }
  };

  // --- Realm/dispatch helpers ------------------------------------------------
  const rAF2 = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  const delay = ms => new Promise(r => setTimeout(r, ms));

  const dispatch = (el, type, opts = {}) => {
    try {
      const ev = new Event(type, { bubbles: true, cancelable: true, composed: true, ...opts });
      el.dispatchEvent(ev);
    } catch (e) { warn('dispatch failed', type, e); }
  };

  const getRealmProto = (el) => {
    const view = el?.ownerDocument?.defaultView || window;
    if (el instanceof view.HTMLInputElement) return view.HTMLInputElement.prototype;
    if (el instanceof view.HTMLTextAreaElement) return view.HTMLTextAreaElement.prototype;
    return null;
  };

  const setNativeValue = (el, value) => {
    try {
      const proto = getRealmProto(el);
      if (!proto) return (el.value = value);
      const desc = Object.getOwnPropertyDescriptor(proto, 'value');
      desc?.set?.call(el, value);
    } catch (e) {
      el.value = value;
      warn('setNativeValue fallback used', e);
    }
  };

  const setNativeChecked = (el, checked) => {
    try {
      const view = el?.ownerDocument?.defaultView || window;
      const proto = view.HTMLInputElement?.prototype;
      const desc = proto ? Object.getOwnPropertyDescriptor(proto, 'checked') : null;
      desc?.set?.call(el, !!checked);
    } catch (e) {
      el.checked = !!checked;
      warn('setNativeChecked fallback used', e);
    }
  };

  const valuesEqual = (el, value) => {
    try {
      const cur = (el.value ?? '').toString();
      const want = (value ?? '').toString();
      return cur === want;
    } catch { return false; }
  };

  const commitText = async (el, value, host = null) => {
    if (!el) return false;
    try {
      safeFocus(el);               // do not scroll on focus
      setNativeValue(el, value);
      dispatch(el, 'input');
      await rAF2();
      if (!host) host = el.closest('material-input, .mdc-text-field, .mdc-text-area, gdf-text-input, gdf-textarea');
      if (host) {
        try {
          host.setAttribute('value', value);
          dispatch(host, 'input');
        } catch {}
      }
      dispatch(el, 'change');
      try { el.blur(); } catch {}
      if (host) dispatch(host, 'change');
      await rAF2();
      return true;
    } catch (e) { err('commitText failed', e); return false; }
  };

  const commitCheck = async (el, checked = true) => {
    if (!el) return false;
    try {
      safeFocus(el);
      setNativeChecked(el, checked);
      el.click();
      await rAF2();
      dispatch(el, 'change');
      try { el.blur(); } catch {}
      await rAF2();
      return true;
    } catch (e) { err('commitCheck failed', e); return false; }
  };

  // Material checkbox/radio (ARIA) helpers
  const clickMaterialToggle = (el) => {
    if (!el) return false;
    const before = el.getAttribute('aria-checked');
    el.click();
    if (el.getAttribute('aria-checked') !== before) return true;
    const icon = el.querySelector('.icon-container, .radioripple, .ripple');
    if (icon) { icon.click(); if (el.getAttribute('aria-checked') !== before) return true; }
    try { el.focus({ preventScroll: true }); } catch {}
    ['keydown', 'keyup'].forEach(t => el.dispatchEvent(new KeyboardEvent(t, { key: ' ', code: 'Space', bubbles: true })));
    return el.getAttribute('aria-checked') !== before;
  };

  // ----- Query helpers (root-aware) -----------------------------------------
  const q = (sel, root = getRootDoc()) => Array.from(root.querySelectorAll(sel));

  const byAriaLabel = (rx, tag = null, root = getRootDoc()) => {
    const sels = [
      'input[aria-label]',
      'textarea[aria-label]',
      'input[placeholder]',
      'textarea[placeholder]'
    ];
    const nodes = sels.flatMap(s => q(s, root)).filter(el => (tag ? el.tagName === tag.toUpperCase() : true));
    return nodes.filter(el => {
      const label = (el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim();
      return rx.test(label);
    });
  };

  const byNearbyLabel = (rx, root = getRootDoc()) => {
    const labels = q('label, [aria-label], .mdc-floating-label, p.asterisk, .container-label', root);
    const hits = [];
    labels.forEach(lab => {
      const text = (lab.textContent || lab.getAttribute('aria-label') || '').trim();
      if (!rx.test(text)) return;
      const forId = lab.getAttribute('for');
      if (forId) {
        const el = root.getElementById(forId);
        if (el) hits.push(el);
      }
      const host = lab.closest('material-input, .mdc-text-field, .mdc-text-area, .form-field, .mdc-form-field, gdf-text-input, gdf-textarea');
      if (host) {
        const el = host.querySelector('input, textarea, div[contenteditable="true"][role="textbox"]');
        if (el) hits.push(el);
      }
    });
    return hits;
  };

  const getEmailCandidates = (root = getRootDoc()) => {
    const sels = [
      'input[type="email"]',
      'input[name*="mail" i]',
      'input[id*="mail" i]',
      'input[name*="email" i]',
      'input[id*="email" i]',
      'input[autocomplete="email"]'
    ];
    const nodes = Array.from(new Set(sels.flatMap(s => q(s, root))));
    const more = byAriaLabel(/メール|email/i, 'input', root);
    return Array.from(new Set(nodes.concat(more)));
  };

  const preferEmpty = (arr) => arr.sort((a, b) => (a?.value ? 1 : 0) - (b?.value ? 1 : 0));

  // ----- Chrome storage → payload -------------------------------------------
  const readStorage = () => new Promise(res => {
    try { chrome.storage.local.get(null, res); }
    catch (e) { err('chrome.storage.local.get failed', e); res({}); }
  });

  const buildPayloadFromItems = (items) => {
    const mode = items?.m_mode;
    const urls = items?.['m_Arr' + mode] || [];
    const first = items?.m_name || '';
    const last  = items?.m_family || '';
    return {
      firstName: first,
      lastName: last,
      company: items?.m_company || '',
      signature: `${(last || '').trim()} ${(first || '').trim()}`.trim(),
      description: items?.['m_original' + mode] || '',
      urls: urls,
      infringingExample: items?.['m_infringement' + mode] || '',
      email: items?.m_email || ''
    };
  };

  // ----- Domain actions ------------------------------------------------------
  const ensureRadioNo = async (root = getRootDoc()) => {
    // Material radios
    const mats = q('material-radio[role="radio"]', root);
    for (const r of mats) {
      const txt = ((r.querySelector('.content') || {}).textContent || '').trim();
      if (/いいえ|No/i.test(txt)) {
        if (r.getAttribute('aria-checked') === 'true') return true;
        if (clickMaterialToggle(r)) return true;
      }
    }
    // Native radios
    const inputs = q('input[type="radio"]', root);
    for (const inp of inputs) {
      const lbl = inp.nextElementSibling ? (inp.nextElementSibling.textContent || '') : '';
      if ((inp.value || '').toLowerCase() === 'no' || /いいえ|No/i.test(lbl)) {
        if (inp.checked) return true;
        await commitCheck(inp, true);
        if (inp.checked) return true;
      }
    }
    return false;
  };

  const tickAllCheckboxes = async (root = getRootDoc()) => {
    // Material
    q('material-checkbox[role="checkbox"]', root).forEach(el => {
      if (el.getAttribute('aria-checked') !== 'true') clickMaterialToggle(el);
    });
    // Native
    const natives = q('input[type="checkbox"]', root);
    for (const box of natives) {
      if (!box.checked) await commitCheck(box, true);
    }
  };

  const attachSubmit = (root = getRootDoc()) => {
    const btn = root.querySelector('[data-test-id="submit-button"], button[type="submit"], material-button[debugid="submit"]');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = 1;
    btn.addEventListener('click', () => {
      try {
        chrome.storage.local.get(null, cur => {
          const m = cur.m_mode;
          const arr = cur['m_Arr' + m] || [];
          if (!arr.length) return;
          const nowStr = new Date().toLocaleString();
          chrome.storage.local.set({
            ['m_Arr' + m]: [],
            ['m_DateArr' + m]: [],
            ['m_FinArr' + m]: (cur['m_FinArr' + m] || []).concat(arr),
            ['m_FinDateArr' + m]: (cur['m_FinDateArr' + m] || []).concat(arr.map(() => nowStr))
          });
        });
      } catch {}
    });
  };

  // ----- URL textarea robust finder (iframe-aware) --------------------------
  function findUrlsTextarea(root = getRootDoc()) {
    // Prefer container by data-test-id/gdf-id
    let container = root.querySelector('[data-test-id="form-container-component-urls"],[gdf-id="urls"]');
    let ta = container && (container.querySelector('textarea.mdc-text-field__input') ||
                           container.querySelector('textarea[aria-label]') ||
                           container.querySelector('textarea'));
    if (ta) return ta;
    // Fallback by aria-label containing URL (JP or en)
    ta = root.querySelector('textarea[aria-label*="URL" i], textarea[aria-label*="url" i]');
    if (ta) return ta;
    // Fallback by nearby label text
    const labels = Array.from(root.querySelectorAll('.mdc-floating-label,.label-text,.container-label,.mdc-text-field-helper-text'));
    for (let i = 0; i < labels.length; i++) {
      const t = (labels[i].textContent || '').trim();
      if (/URL/.test(t) || /ここに\s*URL\s*を入力/.test(t)) {
        const host = labels[i].closest('.mdc-text-field,material-input,material-textarea') || labels[i].parentElement;
        if (host) {
          ta = host.querySelector('textarea');
          if (ta) return ta;
        }
      }
    }
    // Last resort: the first visible textarea inside that section
    ta = root.querySelector('gdf-textarea textarea, material-input[textarea] textarea');
    return ta || null;
  }

  // ----- Signature date (run once after everything) -------------------------
  let DATE_DONE = false;
  async function setSignatureDateToToday(root = getRootDoc()) {
    if (DATE_DONE) return false;
    try {
      // Find the “署名日:*” datepicker's button
      const pickers = Array.from(root.querySelectorAll('material-datepicker'));
      let btn = null;
      for (const p of pickers) {
        const b = p.querySelector('.button[aria-haspopup="dialog"], [role="button"][aria-haspopup="dialog"]');
        const label = (b?.getAttribute('aria-label') || b?.textContent || '').trim();
        if (b && /署名日/.test(label)) { btn = b; break; }
        // Nearby label heuristic
        if (!btn) {
          const lbl = p.querySelector('.label-text, .label, .label-container');
          const t = (lbl?.textContent || '').trim();
          if (b && /署名日/.test(t)) { btn = b; break; }
        }
      }
      if (!btn) {
        // Fallback: any dropdown-button mentioning 署名日
        btn = Array.from(root.querySelectorAll('[role="button"][aria-haspopup="dialog"]'))
          .find(el => /署名日/.test((el.getAttribute('aria-label') || el.textContent || '').trim()));
      }
      if (!btn) return false;

      // Open popup
      try { btn.focus({ preventScroll: true }); } catch {}
      btn.click();
      await rAF2();

      // Find the popup (owned by the same doc)
      const pop = root.querySelector('material-popup[__is_owner="true"], material-popup.gm-select');
      if (!pop) { DATE_DONE = true; return false; }

      // Try to click today's cell
      let cell =
        pop.querySelector('[aria-current="date"]') ||
        pop.querySelector('[aria-label*="今日"]') ||
        pop.querySelector('[aria-label*="Today" i]');

      if (!cell) {
        const day = String(new Date().getDate());
        const candidates = Array.from(pop.querySelectorAll('button, [role="gridcell"], td'))
          .filter(n => /^\d{1,2}$/.test((n.textContent || '').trim()) && (n.getAttribute('aria-disabled') !== 'true'));
        cell = candidates.find(n => (n.textContent || '').trim() === day) || null;
        if (cell && cell.querySelector) {
          const b2 = cell.querySelector('button,[role="button"]');
          if (b2) cell = b2;
        }
      }

      if (cell) {
        try { cell.focus({ preventScroll: true }); } catch {}
        cell.click();
        await rAF2();
      }

      // Close popup if still open
      if (btn.getAttribute('aria-expanded') === 'true') {
        btn.click();
        await rAF2();
      }

      DATE_DONE = true;
      return true;
    } catch (e) {
      err('setSignatureDateToToday failed', e);
      DATE_DONE = true; // avoid loops
      return false;
    }
  }

  // ----- Public API ----------------------------------------------------------
  const gWriter = {
    version: 'v21',

    async fillAll(payload, root = getRootDoc()) {
      log('fillAll start', payload ? 'with-storage' : 'no-payload');

      const tasks = [];
      const pickOne = (cands) => preferEmpty(cands)[0];

      // 名 / 姓 / 会社名 / 署名
      const first = pickOne(byAriaLabel(/^(名)$/, 'input', root).concat(byNearbyLabel(/^(名)$/, root)));
      if (first && payload?.firstName && !valuesEqual(first, payload.firstName)) tasks.push(commitText(first, payload.firstName));

      const last = pickOne(byAriaLabel(/^(姓)$/, 'input', root).concat(byNearbyLabel(/^(姓)$/, root)));
      if (last && payload?.lastName && !valuesEqual(last, payload.lastName)) tasks.push(commitText(last, payload.lastName));

      const company = pickOne(byAriaLabel(/^会社名|組織名$/, 'input', root).concat(byNearbyLabel(/^会社名|組織名$/, root)));
      if (company && payload?.company && !valuesEqual(company, payload.company)) tasks.push(commitText(company, payload.company));

      const signature = pickOne(byAriaLabel(/^署名$/, 'input', root).concat(byNearbyLabel(/^署名$/, root)));

      // 説明 / URL / 例
      const desc = pickOne(byAriaLabel(/^ここに説明を入力$/, 'textarea', root).concat(byNearbyLabel(/^ここに説明を入力$/, root)));
      if (desc && payload?.description && !valuesEqual(desc, payload.description)) tasks.push(commitText(desc, payload.description));

      // Correct regex (\s) and newline join, plus robust finder
      const urlsStr = (payload?.urls || []).join('\n');
      let urlsBox = pickOne(byAriaLabel(/ここに\s*URL\s*を入力/, 'textarea', root).concat(byNearbyLabel(/ここに\s*URL\s*を入力/, root)));
      if (!urlsBox) urlsBox = findUrlsTextarea(root);
      if (urlsBox && urlsStr && !valuesEqual(urlsBox, urlsStr)) tasks.push(commitText(urlsBox, urlsStr));

      const example = pickOne(byAriaLabel(/^ここに例を入力$/, 'textarea', root).concat(byNearbyLabel(/^ここに例を入力$/, root)));
      if (example && payload?.infringingExample && !valuesEqual(example, payload.infringingExample)) tasks.push(commitText(example, payload.infringingExample));

      // メール
      const emailEl = pickOne(getEmailCandidates(root));
      if (emailEl && payload?.email && !valuesEqual(emailEl, payload.email)) tasks.push(commitText(emailEl, payload.email));

      await Promise.allSettled(tasks);

      // Checks & Radios
      await tickAllCheckboxes(root);
      await ensureRadioNo(root);

      // Fill signature last to bias view near bottom (focus suppressed)
      if (signature && payload?.signature && !valuesEqual(signature, payload.signature)) {
        try { await commitText(signature, payload.signature); } catch {}
      }

      attachSubmit(root);

      log('fillAll done');
      return true;
    }
  };

  // Expose for manual use
  window.gWriter = gWriter;

  // ----- Boot ---------------------------------------------------------------
  const boot = async () => {
    // Wait DOM (outer)
    if (document.readyState === 'loading') await new Promise(r => document.addEventListener('DOMContentLoaded', r, { once: true }));

    // Wait inner iframe if present
    const root = getRootDoc();
    if (root !== document && root.readyState === 'loading') {
      await new Promise(r => root.addEventListener('DOMContentLoaded', r, { once: true }));
    }

    // Read chrome.storage once up front
    const items = await readStorage();
    const payload = buildPayloadFromItems(items);
    const hasAny =
      payload.firstName || payload.lastName || payload.company || payload.signature ||
      payload.description || (payload.urls && payload.urls.length) || payload.infringingExample || payload.email;

    const tryPass = async (_pass) => {
      try { await gWriter.fillAll(hasAny ? payload : null, getRootDoc()); }
      catch (e) { err('autofill error', e); }
    };

    // Try now + a few retries (handles SPA re-render)
    await tryPass(1);
    for (let i = 2; i <= MAX_ATTEMPTS; i++) {
      await delay(PASS_INTERVAL_MS);
      await tryPass(i);
    }

    // Finally, scroll once to the bottom (no animation)
    scrollToBottomFinal();

    // After scroll settles, set the date once (best-effort)
    await delay(250);
    await setSignatureDateToToday(getRootDoc());
  };

  if (AUTO_RUN) {
    setTimeout(boot, 0);
    ['popstate', 'hashchange'].forEach(ev => window.addEventListener(ev, () => setTimeout(boot, 50)));
  }
})();