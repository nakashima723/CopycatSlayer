// 集中砲火モード用 content script（barrage.js）
// Google検索結果スニペット末尾に「通報」ボタンを挿入する。

(() => {
  // === 定数 ===
  const PUSH = "【通報】";
  const DEL = "【リストから削除】";
  const FIN = "【報告済み】";

  const linkSelector = 'a[jsname="UWckNb"]';

  // --- Promise ラッパ ---
  const getS = k => new Promise(r => chrome.storage.local.get(k, r));
  const setS = o => new Promise(r => chrome.storage.local.set(o, r));

  async function active() {
    const { m_bar, barrage_mode } = await getS(["m_bar", "barrage_mode"]);
    return m_bar === "on" && barrage_mode === "on";
  }

  async function ctx() {
    const it = await getS(null);
    const mode = Number.isInteger(it.m_mode) ? it.m_mode : 0;
    return {
      mode,
      arr: it[`m_Arr${mode}`] || [],
      finArr: it[`m_FinArr${mode}`] || [],
      dateArr: it[`m_DateArr${mode}`] || [],
      siteArr: it[`m_SiteArr${mode}`] || []
    };
  }

  // 状態に応じて配色を当てる
  function applyStyle(btn, state) {
    // reset common
    btn.style.background = "#f2f2f2";
    btn.style.color = "#222";
    btn.style.border = "1px solid #666";

    if (state === PUSH) {
      btn.style.background = "#cc0000"; // 赤背景
      btn.style.color = "#ffffff"; // 白文字
    } else if (state === FIN) {
      btn.style.color = "#808080"; // 50% グレー
    }
  }

  // ボタン生成
  function makeBtn(label) {
    const b = document.createElement("button");
    b.textContent = label;
    Object.assign(b.style, {
      marginLeft: "6px",
      fontSize: "18px",   // 1.5 倍
      fontWeight: "700",    // 太字
      cursor: "pointer",
      borderRadius: "3px",
      lineHeight: "1.3",
      padding: "0 6px",
      verticalAlign: "middle"
    });
    applyStyle(b, label);
    return b;
  }

  // 挿入メイン
  async function inject() {
    if (!(await active())) return;

    const base = await ctx();

    document.querySelectorAll(linkSelector).forEach(link => {
      const container = link.closest('div.MjjYud, div.g');
      if (!container || container.dataset.barrageInjected) return;
      container.dataset.barrageInjected = "1";

      const href = link.href;
      const title = link.textContent.trim();
      let label = PUSH;
      let disabled = false;
      if (base.finArr.includes(href)) { label = FIN; disabled = true; }
      else if (base.arr.includes(href)) { label = DEL; }

      const btn = makeBtn(label);
      if (disabled) btn.disabled = true;

      // クリック処理
      btn.addEventListener('click', async e => {
        e.preventDefault();
        const c = await ctx();
        const { mode, arr, dateArr, siteArr } = c;
        const idx = arr.indexOf(href);
        const now = new Date().toLocaleString();

        if (btn.textContent === PUSH) {
          if (idx === -1) {
            arr.push(href);
            dateArr.push(now);
            siteArr.push(title);
            await setS({ [`m_Arr${mode}`]: arr, [`m_DateArr${mode}`]: dateArr, [`m_SiteArr${mode}`]: siteArr });
            console.log('[barrage] 追加', href);
          }
          btn.textContent = DEL;
          applyStyle(btn, DEL);
        } else if (btn.textContent === DEL) {
          if (idx !== -1) {
            arr.splice(idx, 1);
            dateArr.splice(idx, 1);
            siteArr.splice(idx, 1);
            await setS({ [`m_Arr${mode}`]: arr, [`m_DateArr${mode}`]: dateArr, [`m_SiteArr${mode}`]: siteArr });
            console.log('[barrage] 削除', href);
          }
          btn.textContent = PUSH;
          applyStyle(btn, PUSH);
        }
      });

      // 挿入場所（スニペット末尾）
      const snippetDiv = container.querySelector('div.VwiC3b');
      if (snippetDiv) snippetDiv.appendChild(btn); else link.after(btn);
    });
  }

  inject();
  const mo = new MutationObserver(inject);
  mo.observe(document.body, { childList: true, subtree: true });
})();
