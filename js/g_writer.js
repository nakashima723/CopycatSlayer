chrome.storage.local.get(function (items) {
  var mode = items.m_mode
  var thisArr = items['m_Arr' + mode];
  var thisSiteArr = items['m_SiteArr' + mode];
  var thisDateArr = items['m_DateArr' + mode];
  var thisTitle = items['m_report' + mode];
  var num = mode + 1;
  var urlNum = thisArr.length;
  //未報告URLが存在しない場合
  if (urlNum === 0 || urlNum === undefined) {
    alert("「" + num + ": " + thisTitle + "」のリストに未報告のURLはありません。\n\nムラハチ for Googleを使用するには、ブラウザ右上のアイコンから「検索」や「報告」を行ってください。");
  }
  //未報告URLが存在する場合
  else {
    $(function () {

      alert("「" + num + ": " + thisTitle + "」について、" + urlNum + "件のURLを入力します。\n\n「日付」とreCAPTCHAは手動で入力してください。");
      var date = new Date();
      var month = date.getMonth() + 1,
        day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      date = month + "/" + day + "/" + date.getFullYear();
      var fullname = items.m_family + " " + items.m_name;
      var url = ""
      for (var i = 0; i < thisArr.length; i++) {
        url = url + thisArr[i] + "\n";
      }
      var infringement = items['m_infringement' + mode];
      var original = items['m_original' + mode];
      var holder = items['m_holder' + mode];


      $(document).ready(function () {
        // 送信ボタンのセレクタ
        var submitButtonSelector = 'button[data-test-id="submit-button"]';

        // ボタンが追加されるのを待つ関数
        function waitForButton() {
          var submitButton = $(submitButtonSelector);
          if (submitButton.length > 0) {
            // ボタンが見つかった場合、MutationObserverを設定
            setupMutationObserver(submitButton[0]);
          } else {
            // ボタンが見つからない場合、100ミリ秒後に再試行
            setTimeout(waitForButton, 100);
          }
        }

        // MutationObserverのセットアップ関数
        function setupMutationObserver(button) {
          var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                if (!$(button).is(':disabled')) {
                  // disabledが解除されたらクリックイベントをバインド
                  $(button).on('click', handleSubmitClick);
                }
              }
            });
          });

          // 監視を開始 (送信ボタンのdisabled属性が変更されるのを監視)
          observer.observe(button, {
            attributes: true // attributesの変化を監視
          });
        }

        // クリックイベントのハンドラー関数
        function handleSubmitClick() {
          // ストレージデータの取得
          chrome.storage.local.get(function (items) {
            var mode = items.m_mode;
            var thisArr = items['m_Arr' + mode];
            var thisSiteArr = items['m_SiteArr' + mode];
            var thisDateArr = items['m_DateArr' + mode];
            var thisFinArr = items['m_FinArr' + mode] || [];
            var thisFinSiteArr = items['m_FinSiteArr' + mode] || [];
            var thisFinDateArr = items['m_FinDateArr' + mode] || [];
            var thisTitle = items['m_report' + mode];
            var num = mode + 1;
            var urlNum = thisArr.length;

            // URL数が1000を超えた場合の制限
            if (urlNum > 1000) {
              urlNum = 1000;
            }

            // 送信されたURLを処理
            for (var i = 0; i < urlNum; i++) {
              thisFinArr.push(thisArr[i]);
              thisFinSiteArr.push(thisSiteArr[i]);
            }
            thisArr.splice(0, urlNum);
            thisSiteArr.splice(0, urlNum);

            var date = new Date().toLocaleString();

            for (i = 0; i < urlNum; i++) {
              thisFinDateArr.push(date);
            }
            thisDateArr.splice(0, urlNum);

            // 更新するキーのみを設定
            var updatedItems = {
              ['m_Arr' + mode]: thisArr,
              ['m_DateArr' + mode]: thisDateArr,
              ['m_SiteArr' + mode]: thisSiteArr,
              ['m_FinArr' + mode]: thisFinArr,
              ['m_FinDateArr' + mode]: thisFinDateArr,
              ['m_FinSiteArr' + mode]: thisFinSiteArr
            };

            // 既存のデータに上書きする
            chrome.storage.local.set(updatedItems, function () {
              alert("「" + num + ": " + thisTitle + "」について、" + urlNum + "件のURLを送信し、報告済みURLとして記録しました。");
            });
          });
        }

        // ボタンの待機を開始
        waitForButton();
      });


      // フォームの自動入力を行う関数
      function autoFillForms() {
        var formFields = [
          { selector: 'input:eq(1)', value: items.m_name },
          { selector: 'input:eq(2)', value: items.m_family },
          { selector: 'input:eq(3)', value: items.m_company },
          { selector: 'input:eq(4)', value: items.m_email },
          { selector: 'input:eq(5)', value: items.m_family + " " + items.m_name },
          { selector: 'textarea:eq(0)', value: items['m_original' + mode] },
          { selector: 'textarea:eq(1)', value: items['m_infringement' + mode] },
          { selector: 'textarea:eq(2)', value: generateUrlList() }
        ];

        formFields.forEach(function (field) {
          simulateManualInput(field.selector, field.value);
        });
        selectNoRadioButton();
        checkAllCheckboxes();
      }

      // 手動入力をシミュレートする関数
      function simulateManualInput(selector, value) {
        var element = $(selector);
        if (element.length > 0) {
          element = element[0]; // jQueryオブジェクトからDOMエレメントを取得

          // フォーカスイベントをシミュレート
          element.focus();

          // 現在の値をクリア
          element.value = '';

          // 一文字ずつ入力をシミュレート
          for (var i = 0; i < value.length; i++) {
            // キーダウンイベントをシミュレート
            var keydownEvent = new KeyboardEvent('keydown', {
              key: value[i],
              bubbles: true
            });
            element.dispatchEvent(keydownEvent);

            // 文字を入力
            element.value += value[i];

            // 入力イベントをシミュレート
            var inputEvent = new InputEvent('input', {
              inputType: 'insertText',
              data: value[i],
              bubbles: true
            });
            element.dispatchEvent(inputEvent);

            // キーアップイベントをシミュレート
            var keyupEvent = new KeyboardEvent('keyup', {
              key: value[i],
              bubbles: true
            });
            element.dispatchEvent(keyupEvent);
          }

          // ブラーイベントをシミュレート
          element.blur();

          // changeイベントをシミュレート
          var changeEvent = new Event('change', { bubbles: true });
          element.dispatchEvent(changeEvent);
        }
      }

      // URL一覧を生成する関数
      function generateUrlList() {
        return thisArr.join("\n");
      }

      // すべてのチェックボックスにチェックを入れる関数
      function checkAllCheckboxes() {
        $('material-checkbox').each(function () {
          var checkbox = $(this);
          if (checkbox.attr('aria-checked') !== 'true') {
            // チェックボックスがまだチェックされていない場合のみ処理を行う

            // クリックイベントをシミュレート
            var clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true
            });
            this.dispatchEvent(clickEvent);

            // チェックボックスの状態を変更
            checkbox.attr('aria-checked', 'true');

            // アイコンを更新
            checkbox.find('i.material-icon-i').text('check_box');

            // changeイベントをシミュレート
            var changeEvent = new Event('change', { bubbles: true });
            this.dispatchEvent(changeEvent);

            console.log('Checkbox checked:', this);
          }
        });
      }

      function selectNoRadioButton() {
        // 「いいえ」のラジオボタンを探す（aria-checked="false"のものを見つけてクリック）
        var noRadioButton = $('material-radio[aria-checked="false"] .content:contains("いいえ")');

        if (noRadioButton.length > 0) {
          // クリックイベントをシミュレートしてチェックを入れる
          noRadioButton.click();
        }
      }

      // ページ読み込み完了後すぐにフォームを自動入力
      $(document).ready(function () {
        // 少し遅延を入れてフォームが完全に読み込まれるのを待つ
        setTimeout(autoFillForms, 100);
      });

    }); //setTimeoutの終わり
  } //未報告URLが存在する場合の終わり
});
