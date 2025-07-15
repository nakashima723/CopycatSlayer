
// g_writer.js — Google DMCA フォーム自動入力 (radio final fix)
chrome.storage.local.get(function (items) {
  const mode = items.m_mode;
  const urls = items['m_Arr' + mode] || [];
  if (!urls.length) { alert('未報告URLがありません'); return; }
  const fullname = (items.m_family || '') + ' ' + (items.m_name || '');

  function manual(el, val) {
    if (!el) return;
    if (el.matches('gdf-text-input, gdf-textarea')) {
      el = el.querySelector('input, textarea, div[contenteditable="true"][role="textbox"]');
      if (!el) return;
    }
    if (el.tagName === 'DIV' && el.getAttribute('contenteditable') === 'true') {
      el.innerText = val;
      ['input', 'change', 'blur'].forEach(ev => el.dispatchEvent(new Event(ev, { bubbles: true })));
    } else {
      el.value = val;
      ['input', 'change'].forEach(ev => el.dispatchEvent(new Event(ev, { bubbles: true })));
    }
  }

  function pick(selectors) {
    for (const s of selectors) {
      let el = document.querySelector(s);
      if (!el) {
        const forInput = s.replace(/^input/i, 'textarea');
        el = document.querySelector(
          `gdf-text-input ${s}, gdf-textarea ${forInput}`
        );
      }
      if (el) {
        const parent = el.closest('gdf-text-input, gdf-textarea');
        return parent || el;
      }
    }
    return null;
  }

  function pickByLabel(texts) {
    for (const t of texts) {
      const label = Array.from(document.querySelectorAll('label'))
        .find(l => l.textContent.trim() === t);
      if (label) {
        const id = label.getAttribute('for');
        if (id) {
          const el = document.getElementById(id);
          if (el) return el.closest('gdf-text-input, gdf-textarea') || el;
        }
      }
      const span = Array.from(document.querySelectorAll('gdf-text-input span.mdc-floating-label, gdf-textarea span.mdc-floating-label'))
        .find(l => l.textContent.trim() === t);
      if (span) {
        const parent = span.closest('gdf-text-input, gdf-textarea');
        if (parent) return parent;
      }
    }
    return null;
  }

  function tickCheckboxes() {
    document.querySelectorAll('material-checkbox[role="checkbox"]').forEach(cb => {
      if (cb.getAttribute('aria-checked') !== 'true') { cb.click(); }
    });
  }

  function clickRadioElem(elem) {
    if (!elem) return;
    elem.click();
    if (elem.getAttribute('aria-checked') === 'true') return true;
    const icon = elem.querySelector('.icon-container');
    if (icon) { icon.click(); if (elem.getAttribute('aria-checked') === 'true') return true; }
    elem.focus();
    ['keydown', 'keyup'].forEach(e => {
      const ev = new KeyboardEvent(e, { key: ' ', code: 'Space', bubbles: true });
      elem.dispatchEvent(ev);
    });
    return elem.getAttribute('aria-checked') === 'true';
  }

  // returns true if successfully selected
  function selectRadioNo() {
    const mats = Array.from(document.querySelectorAll('material-radio[role="radio"]'));
    for (const r of mats) {
      const txt = (r.querySelector('.content') || {}).textContent || '';
      if (/いいえ|No/i.test(txt)) {
        if (r.getAttribute('aria-checked') === 'true') return true;
        if (clickRadioElem(r)) return true;
      }
    }
    // fallback traditional radio
    const inputs = Array.from(document.querySelectorAll('input[type="radio"]'));
    for (const inp of inputs) {
      const lbl = inp.nextElementSibling ? inp.nextElementSibling.textContent : '';
      if (inp.value === 'no' || /いいえ|No/i.test(lbl)) {
        if (inp.checked) return true;
        inp.click();
        inp.checked = true;
        ['input', 'change'].forEach(ev => inp.dispatchEvent(new Event(ev, { bubbles: true })));
        return inp.checked;
      }
    }
    return false;
  }

  async function ensureRadioNo() {
    for (let i = 0; i < 40; i++) {           // 最大8秒
      if (selectRadioNo()) return;
      await new Promise(r => setTimeout(r, 200));
    }
  }

  function attachSubmit() {
    const btn = document.querySelector('[data-test-id="submit-button"], [type="submit"]');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = 1;
    btn.addEventListener('click', () => chrome.storage.local.get(null, cur => {
      const m = cur.m_mode;
      const arr = cur['m_Arr' + m] || [];
      if (!arr.length) return;
      const now = new Date().toLocaleString();
      chrome.storage.local.set({
        ['m_Arr' + m]: [],
        ['m_DateArr' + m]: [],
        ['m_FinArr' + m]: (cur['m_FinArr' + m] || []).concat(arr),
        ['m_FinDateArr' + m]: (cur['m_FinDateArr' + m] || []).concat(arr.map(() => now))
      });
    }));
  }

  function scrollBottom() { setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 400); }

  async function fill() {
    const sig = pick([
      '[data-test-id="form-container-component-signature"] input',
      '[gdf-id="signature"] input',
      'input[aria-label="署名"]',
      'input[name="signature"]',
      '#signature'
    ]) || pickByLabel(['署名', 'Signature']);
    if (!sig) return false;

    manual(
      pick([
        '[data-test-id="form-container-component-given-name"] input',
        '[gdf-id="given-name"] input',
        'input[aria-label="名"]',
        'input[name="firstName"]',
        'input[name="first_name"]',
        'input[name="first-name"]',
        '#firstName'
      ]) || pickByLabel(['名', 'First name']),
      items.m_name
    );
    manual(
      pick([
        '[data-test-id="form-container-component-family-name"] input',
        '[gdf-id="family-name"] input',
        'input[aria-label="姓"]',
        'input[name="lastName"]',
        'input[name="last_name"]',
        'input[name="last-name"]',
        '#lastName'
      ]) || pickByLabel(['姓', 'Last name']),
      items.m_family
    );
    manual(
      pick([
        '[data-test-id="form-container-component-company-name"] input',
        '[gdf-id="company-name"] input',
        'input[aria-label="組織名"]',
        'input[aria-label="会社名"]',
        'input[name="company"]',
        'input[name="organization"]',
        '#company'
      ]) || pickByLabel(['組織名', '会社名', 'Organization name']),
      items.m_company
    );
    manual(
      pick([
        '[data-test-id="form-container-component-email-text"] input',
        '[gdf-id="email-text"] input',
        'input[type="email"]',
        'input[name="email"]',
        '#email',
        'input[aria-label="メールアドレス"]'
      ]) ||
        pickByLabel(['メールアドレス', 'Email']),
      items.m_email
    );
    manual(sig, fullname);

    const ta = document.querySelectorAll('textarea, [contenteditable="true"][role="textbox"]');
    const desc =
      pick([
        '[gdf-id="description"] textarea',
        '[gdf-id="description"] [contenteditable="true"][role="textbox"]'
      ]) || ta[0];
    const loc =
      pick([
        '[gdf-id^="location-of-material"] textarea',
        '[gdf-id^="location-of-material"] [contenteditable="true"][role="textbox"]'
      ]) || ta[1];
    const urlsBox =
      pick([
        '[gdf-id="urls"] textarea',
        '[gdf-id="urls"] [contenteditable="true"][role="textbox"]'
      ]) || ta[2];
    if (desc) manual(desc, items['m_original' + mode]);
    if (loc) manual(loc, items['m_infringement' + mode]);
    if (urlsBox) manual(urlsBox, urls.join('\n'));

    tickCheckboxes();
    await ensureRadioNo();
    attachSubmit();
    scrollBottom();
    return true;
  }

  function init() {
    fill().then(done => {
      if (done) return;
      const obs = new MutationObserver(() => fill().then(ok => { if (ok) obs.disconnect(); }));
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => obs.disconnect(), 15000);
    });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  
});
