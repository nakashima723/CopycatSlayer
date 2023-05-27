var showSlyr = function () {
  var divNum1 = $('#tabBox1').length;
  var divNum2 = $('#tabBox2').length;
  if (divNum1 === 1) {
    $('#tabBox1').append('<div id=\"title\"><center><h1 style=\"margin-top:15px; margin-bottom:10px;\">パクツイスレイヤー</h1></div><div id =\"main\" style =\'margin: 0 auto;  padding: 15px 40px; width: 750px;\'><dl id=\"hisMenu\" style =\'margin: 30px auto; width: 100%;\'></dl><div id=\"setting_div\"></div></dl></div>');
  }
  if (divNum2 === 1) {
    $('#tabBox2').append('<div id=\"m-title\"><center><h1 style=\"margin-top:15px; margin-bottom:10px;\">ムラハチ for Google</h1></div><div id =\"m-main\" style =\'margin: 0 auto;  padding: 15px 40px; width: 750px; \'><dl id=\"m-hisMenu\" style =\'margin: 30px auto; width: 100%;\'></dl><div id=\"m-setting_div\"></div></dl></div></div></br></center></div>');
  }

  chrome.storage.local.get(function (items) {
    if (items.m_bar === "off") {
      $('#m-title').append('<center></br><button id="slyr-show" style="padding:20px 50px; background-color:#cc0000; border:none; color:#FFF;">URL追加用バーの表示をONにする</button></center></div>');
      $("#slyr-show").click(function () {
        var bar_mode = new Object();
        bar_mode['m_bar'] = "on";
        chrome.storage.local.set(bar_mode, function (items) {
          alert("URL追加用バーの表示をONにしました。\nバーを表示させたいページを更新すると反映されます。");
          $('#slyr-show').hide();
        });
      });
    }
  });

  //パクツイスレイヤー
  var str_ex1 = "例：壁ドン対処法",
    str_ex2 = "例：私が製作し、以下のツイートで最初に発表したイラストです。",
    str_ex2 = "例：私が製作し、以下のツイートで最初に発表したイラストです。",
    str_ex3 = "例：https://twitter.com/nakashima723/status/493780492345307136",
    str_ex4 = "例：著作権で保護された画像を、無断で転載し利用しています。",
    str_ex4_after = "著作権で保護された画像を、無断で転載し利用しています。",
    str_ex5 = "例：不本意な壁ドン 対処法 -RT -nakashima723.info",
    str_al_save_new = "未記入または内容に不備のある項目があります。\n「任意」の項目以外はすべて入力してください。",
    str_saved = "入力内容を保存しました。",
    str_edit_save = "編集内容を保存する",
    str_edit_saved = "編集内容を保存しました。",
    str_url_copy = "未報告URLをクリップボードにコピー",
    str_url_clear = "この項目の未報告URLをすべて削除";
  str_deleted = "入力内容を削除しました。",
    del_report = "削除すると、この項目のURLとアカウントの記録はすべて破棄されます。\n\n動作確認として使用した場合などを除き、基本的には「項目を非表示にする」オプションを使用することをおすすめします。\n\n本当にこの項目を削除しますか？",
    del_report2 = "本当によろしいですか？",
    str_input = "入力する",
    str_close = "とじる",
    str_nosetting = "「基本設定」と「報告内容」を記入すると、ツイートの検索・報告機能が使えるようになります。",
    str_his_title = "<h2>報告履歴の確認と管理</h2><font size=\"-1\">凍結状況の記録は、「報告ずみURL」と「アカウント」の一覧から行えます。（手動）</font>",
    str_edit = "編集する",
    str_edit_report = "報告内容を追加・編集",
    str_setting = "基本設定",
    str_setting_ex = "<font size=\"-1\">Twitter公式の<a href=\"https://support.twitter.com/forms/dmca\"><strong>著作権侵害報告フォーム</strong></a>に入力する内容を設定してください。<br/>住所氏名など、すべての報告に共通する入力内容となります。</font>",
    str_taro = "例：太郎",
    str_yamada = "例：山田",
    str_company = "例：自営業";

  //登録されている報告内容の数を判定
  var repCounter = function () {
    chrome.storage.local.get(function (items) {
      //console.log(Object.keys(items));
      var length = Object.keys(items).length,
        target = "report",
        repArr = [];
      if (length == 0) {
        alert(str_nosetting);
      }
      for (i = 0; i < length; i++) {
        var wordArr = Object.keys(items);
        var str = " " + wordArr[i];
        if (str.indexOf(" " + target) !== -1) {
          repArr.push(wordArr[i]);
        }
      }
      var repNum = {
        "repNum": repArr.length
      };
      chrome.storage.local.set(repNum, function (items) {});

      var m_target = "m_report",
        m_repArr = [];
      for (i = 0; i < length; i++) {
        var wordArr = Object.keys(items);
        var str = " " + wordArr[i];
        if (str.indexOf(" " + m_target) !== -1) {
          m_repArr.push(wordArr[i]);
        }
      }
      var m_repNum = {
        "m_repNum": m_repArr.length
      };
      chrome.storage.local.set(m_repNum, function (items) {});

    });
  }
  repCounter();
  // chrome.storageに保存したデータの表示
  var showSetting = function () {
    chrome.storage.local.get(function (items) {
      if (items.fullname == undefined) {
        $('#setting').text(str_input)
        $('#setting').css({
          'background-color': '#00aced',
          'color': '#F5F5F5'
        });
      } else {
        $('#setting').css({
          'background-color': '#FFF',
          'color': '#222'
        });
      }
      if (items.m_name == undefined) {
        $('#m-setting').text(str_input)
        $('#m-setting').css({
          'background-color': '#cc0000',
          'color': '#F5F5F5'
        });
      } else {
        $('#m-setting').css({
          'background-color': '#FFF',
          'color': '#222'
        });
      }
      if (items.m_name !== undefined) {
        $('#m-name').val(items.m_name);
        $('#m-family').val(items.m_family);
        $('#m-email').val(items.m_email);
        $('#m-company').val(items.m_company);
        $('#email').val(items.email);
        $('#m-statement1,#m-statement2,#m-statement3').prop('checked', true);
      }
      if (items.fullname !== undefined) {
        $('#main').prepend(str_his_title);
      }
      $('#account_name').val(items.account_name);
      $('#fullname').val(items.fullname);
      $('#company').val(items.company);
      $('#job').val(items.job);
      $('#email').val(items.email);
      $('#address').val(items.address);
      $('#city').val(items.city);
      $('#state').val(items.state);
      $('#postal').val(items.postal);
      $('#country').val(items.country);
      $('#phone_number').val(items.phone_number);
      $('#faxnumber').val(items.faxnumber);
      if (items.fullname !== undefined) {
        $('#statement1,#statement2,#statement3').prop('checked', true);
        $('#statement4').val('この通知の情報は正確です。私は、著作権所有者の代理として行動する権限を持っていることが虚偽の場合は偽証罪に問われることを理解しています。');
      }
    });
  }

  const showReports = function () {
    chrome.storage.local.get(function (items) {
      for (let i = 0; i < items.repNum; i++) {
        if (items[`art_type${i}`] === undefined) {
          $(`input[name='art_type${i}']`).val(['image' + i]);
        } else {
          $(`input[name='art_type${i}']`).val([items[`art_type${i}`]]);
        }

        if (items[`owner_type${i}`] === undefined) {
          $(`input[name='owner_type${i}']`).val(['owner' + i]);
        } else {
          $(`input[name='owner_type${i}']`).val([items[`owner_type${i}`]]);
        }

        $(`#report${i}_input`).val(items[`report${i}`]);
        $(`#owner_name${i}_input`).val(items[`owner_name${i}`]);
        $(`#hide_pop${i}`).prop('checked', items[`hide_pop${i}`]);
        $(`#hide_his${i}`).prop('checked', items[`hide_his${i}`]);
        $(`#tweet_image_original${i}`).val(items[`tweet_image_original${i}`]);
        $(`#tweet_url_original${i}`).val(items[`tweet_url_original${i}`]);
        $(`#tweet_image_infringement${i}`).val(items[`tweet_image_infringement${i}`]);
        $(`#query${i}`).val(items[`query${i}`]);
      }

      if (items.repNum > 0 || items.fullname !== undefined) {
        $('#new_report').css({
          'background-color': '#00aced',
          'color': '#F5F5F5'
        });
      }

      for (let i = 0; i < items.m_repNum; i++) {
        $(`#m-report${i}_input`).val(items[`m_report${i}`]);
        $(`#m-hide_pop${i}`).prop('checked', items[`m_hide_pop${i}`]);
        $(`#m-hide_his${i}`).prop('checked', items[`m_hide_his${i}`]);
        $(`#m-infringement${i}`).val(items[`m_infringement${i}`]);
        $(`#m-original${i}`).val(items[`m_original${i}`]);

        const holder = items[`m_holder${i}`];

        if (holder === undefined || holder === 'self') {
          $(`#author-type${i}`).prop('checked', true);
          $(`#m-holder${i}`).val('self');
        } else {
          $(`#m-holder${i}`).val(holder);
          $(`#attoney-type${i}`).prop('checked', true);
        }

        $(`#m-query${i}`).val(items[`m_query${i}`]);
      }

      if (items.m_repNum > 0) {
        $('#m-new_report').css({
          'background-color': '#cc0000',
          'color': '#F5F5F5'
        });
      }
    });
  }


  //パクツイスレイヤー
  $(function () {
    chrome.storage.local.get(function (items) {
      $('#setting_div').append("<h2>" + str_setting + "</h2>" + str_setting_ex + "<br/><br/><dl id=\"acMenu\" style =\'margin:0 auto; width: 100%;\'><dt><button id=\"setting\">" + str_edit + "</button><br /></dt><dd style =\'margin:0 30px auto; display:none; width:\"100%;\"'>本プログラムは報告対象となる著作物の正式な権利者の方、またはその代理人のみご利用いただけます。著作物の定義や、ご自身の権利の有無については各自でご確認ください。<br /><br /><strong>連絡先</strong><br />あなたの本名（フルネーム）:<br /><input id=\"fullname\" type=\"text\" value=\"例：山田太郎\" /><br />会社名・所属:<br /><input id=\"company\" type=\"text\" value=\"例：自営業\" /><br />肩書き：<br /><input id=\"job\" type=\"text\" /><br />メール アドレス : <input id=\"email\" type=\"text\" /><br />住所１（番地・建物名・部屋番号）：<br /><input id=\"address\" type=\"text\" /><br />住所２（市区町村名）：<br /><input id=\"city\" type=\"text\" /><br />住所３（都道府県名）：<br /><input id=\"state\" type=\"text\" /><br />郵便番号：<br /><input id=\"postal\" type=\"text\" /><br />居住国：<br /><input id=\"country\" type=\"text\" /><br />電話番号（任意）：<br /><input id=\"phone_number\" type=\"text\" /><br />FAX番号（任意）：<br /><input id=\"faxnumber\" type=\"text\" /><br />自分のTwitterアカウント名（任意）<br /><font size=\"-1\">※記入しておくと、自分のアカウントあての非公式RTを除外できます。<br>　半角@から入力してください。（例：@nakashima723）<br /></font><input id=\"account_name\" type=\"text\" value=\"例：@nakashima723\" /><br /><strong>法的な宣誓：</strong><br /><font size=\"2.8em\"><br /><input id=\"statement1\" type=\"checkbox\">故意に報告素材または活動が重大な侵害をしていると偽った場合、17 U.S.C. § 512(f) (米国著作権法) に基づき、私は訴訟費用および弁護士費用を含むあらゆる損害について責任を問われる可能性があることを理解しています。<br /><br /><input id=\"statement2\" type=\"checkbox\">私は申し立てた態様での素材の使用が、著作権者、その代理人、または法律によって許容されていないことを、良心に従い誠実に認識しています。<br /><br /><input id=\"statement3\" type=\"checkbox\">本プログラムは当該フォームへの入力を補助・簡便化するものであり、送信した報告の内容と報告結果について、プログラム製作者は一切の責任を負わないことを承諾します。<br /><br /></font>以下の文章を下の空欄に正確に入力してください。<br /><blockquote cite=\"https://support.twitter.com/forms/dmca\">この通知の情報は正確です。私は、著作権所有者の代理として行動する権限を持っていることが虚偽の場合は偽証罪に問われることを理解しています。</blockquote><textarea id=\"statement4\" rows=\"3\"></textarea><br /><input id=\"save_setting\" type=\"submit\" value=\"この入力内容を保存\" />　<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /><br /></dd><h2>" + str_edit_report + "</h2>");
      $(function () {
        //登録されている報告内容の数を判定
        // オプションデータの更新
        $('#save_setting').click(function () {
          var account_name = $('#account_name').val();
          var fullname = $('#fullname').val();
          var company = $('#company').val();
          var job = $('#job').val();
          var email = $('#email').val();
          var address = $('#address').val();
          var city = $('#city').val();
          var state = $('#state').val();
          var postal = $('#postal').val();
          var country = $('#country').val();
          var phone_number = $('#phone_number').val();
          var faxnumber = $('#faxnumber').val();
          var statement1 = $('#statement1').prop('checked');
          var statement2 = $('#statement2').prop('checked');
          var statement3 = $('#statement3').prop('checked');
          var statement4 = $('#statement4').val();
          //console.log(account_name);
          if (fullname === "" || company === "" || job === "" || email === "" || address === "" || city === "" || state === "" || postal === "" || country === "" || statement1 !== true || statement2 !== true || statement3 !== true || statement4 !== 'この通知の情報は正確です。私は、著作権所有者の代理として行動する権限を持っていることが虚偽の場合は偽証罪に問われることを理解しています。') {
            alert(str_al_save_new);
          } else {
            var obj = new Object();
            obj['account_name'] = account_name;
            obj['fullname'] = fullname;
            obj['company'] = company;
            obj['job'] = job;
            obj['email'] = email;
            obj['address'] = address;
            obj['city'] = city;
            obj['state'] = state;
            obj['postal'] = postal;
            obj['country'] = country;
            obj['phone_number'] = phone_number;
            obj['faxnumber'] = faxnumber;
            obj['slyr_mode'] = "pakutwi";
            chrome.storage.local.set(obj, function () {});
            location.reload();
            alert(str_saved);
          }
        });
        $('#clear').click(function () {
          chrome.storage.local.clear(function () {
            location.reload();
          });
          alert(str_deleted);
        });
        // オプションデータの表示
        showSetting();
        showReports();
      });
      //報告履歴一覧を生成
      if (items.repNum > 0) {
        $('#acMenu h2').after("<font size=\"-1\">侵害の内容ごとに、タイトルや元作品のURLを設定してください。</br>「報告履歴一覧に表示しない」にチェックを入れると、オプションページの表示を軽量化できます。</br></br></font>");
      }
      for (var i = 0; i < items.repNum; i++) {
        window["thisUrlArr" + i] = items["urlArr" + i];
        window["thisUrlDateArr" + i] = items["urlDateArr" + i];
        window["thisFinArr" + i] = items["urlFinArr" + i];
        window["thisFinDateArr" + i] = items["urlFinDateArr" + i];
        window["thisAccArr" + i] = items["accNameArr" + i];
        window["thisSusArr" + i] = items["accSusArr" + i];
        window["thisSusDateArr" + i] = items["accSusDateArr" + i];

        // バグ修正
        if (window["thisFinArr" + i].length !== window["thisFinDateArr" + i].length) {
          var dif = window["thisFinDateArr" + i].length - window["thisFinArr" + i].length;
          window["thisFinDateArr" + i].splice(0, dif);
          var obj = {};
          obj["urlFinDateArr" + i] = window["thisFinDateArr" + i];
          chrome.storage.local.set(obj, function () {});
        }

        // 重複のない一覧を生成
        window["accUniArr" + i] = window["thisAccArr" + i].filter(function (a, b, self) {
          return self.indexOf(a) === b;
        });
        window["finUniArr" + i] = window["thisFinArr" + i].filter(function (a, b, self) {
          return self.indexOf(a) === b;
        });
        var accUniNum = window["accUniArr" + i].length;
        var urlNum = window["thisUrlArr" + i].length;
        var urlFinNum = window["thisFinArr" + i].length;
        var accNum = items["accNameArr" + i].length;
        var susNum = items["accSusArr" + i].length;
        var thisTitle = (i + 1) + ": " + items["report" + i];
        var hide_his = items["hide_his" + i];

        $('#acMenu').append('<dt><button id="report' + i + '"></button></dt>');
        $('#report' + i).text(thisTitle);
        $('#acMenu').append('<dd id = "form' + i + '"><strong>この報告内容の名前</strong><br /><font size ="-1">※他の報告内容と区別できるように、わかりやすい名前をつけてください。</font><input id="report' + i + '_input" type="text" style="margin-bottom:10px" /><input type="checkbox" id="hide_pop' + i + '" style="margin-bottom:30px">検索用ポップアップの一覧に表示しない　<input type="checkbox" id="hide_his' + i + '" style="margin-bottom:30px">報告履歴一覧に表示しない<br/>著作権者の名前：<br /><input id="owner_name' + i + '_input" type="text" style="margin-bottom:10px" /><br/>オリジナル作品の内容：<textarea id="tweet_image_original' + i + '"></textarea><br />オリジナル作品が確認できるURL：<br /><font size ="-1">※侵害ツイートのURLではなく、ご自身でアップロードしたツイートやサイトなど<br />　著作権侵害にあたらない使用例のURLを記入してください.</font><br/><input id="tweet_url_original' + i + '" type="text" style="width:600px"/><br />著作権侵害の内容：<textarea id="tweet_image_infringement' + i + '"></textarea><br />侵害ツイートの検索に使う語句：<br /><font size ="-1">※スペースで区切ると複数入力できます。単語の前に半角で「-（マイナス）」をつけると、<br />　その単語を含むツイートが検索結果から除外されます.</font><br /><input id="query' + i + '" type="text" style="width:600px"/><br />作品の種類：<br /><input type="radio" name="art_type' + i + '" value="image' + i + '" id="image_type' + i + '" style="margin-bottom:40px">イラスト・写真・絵画　　<input type="radio" name="art_type' + i + '" value="movie' + i + '" id="movie_type' + i + '" style="margin-bottom:40px">動画　　<input type="radio" name="art_type' + i + '" value="writing' + i + '" id="writing_type' + i + '" style="margin-bottom:40px">文章<br/>報告者の属性：<br /><input type="radio" name="owner_type' + i + '" value="owner" id="owner_type' + i + '" style="margin-bottom:40px">著作権者本人　　<input type="radio" name="owner_type' + i + '" value="represent" id="represent_type' + i + '" style="margin-bottom:40px">著作権者の正式な代理人　<br/><center><input id="save' + i + '" type="submit" value="この入力内容を保存" />　<input class="closure" type="submit" value="' + str_close + '" /><br /><button id ="del_report' + i + '" style="font-size:0.9em; background-color:#666; color:#fff;">この項目を削除</button></center><br /><br /></dd>');

        eval("$(\'#del_report" + i + "\').hide();");
        if (hide_his !== true) {
          eval("$(\'#hisMenu\').append(\'<dt><button id=\"history" + i + "\" style=\"margin-bottom:10px;\">名称未設定</button><br/><span id = \"reported" + i + "\"><font size = \"-1\">　未報告： " + urlNum + "件　 報告ずみ： " + urlFinNum + "件　 凍結されたアカウント数： " + susNum + "</font><br /></span><br/></dt>\');");

          //未報告URL・報告済みURLのボタンを追加
          eval("$(\'#hisMenu\').append(\'<dd id=\"hisBox" + i + "\"><dl class =\"hisBoxMenu\" style=\"margin: 0 auto; \"><dt><button id=\"urlHis" + i + "\">未報告URL一覧</button><dd id = \"urlBox" + i + "\"><div id = \"urlTable" + i + "\"></div></dd></dt></dl><dl class =\"finBoxMenu\" style=\"margin:0 auto ;\"><dt><button id=\"finHis" + i + "\">　報告ずみURL一覧</button><dd id = \"finBox" + i + "\"><div id = \"finTable" + i + "\"></div></dd></dt></dl><dl class =\"accBoxMenu\" style=\"margin:0 auto ;\"><dt>　 <button id=\"accHis" + i + "\">アカウント別URL一覧</button><dd id = \"accBox" + i + "\"><div id = \"accTable" + i + "\"></div></dd></dt></dl><dl class =\"susBoxMenu\" style=\"margin:0 auto 0;\"><dt><button id=\"susHis" + i + "\">　凍結ずみアカウント一覧</button><dd id = \"susBox" + i + "\"><div id = \"susTable" + i + "\"></div></dd></dt></dl></dd>\');");

          eval("$(\'#history" + i + "\').text(thisTitle);");

          eval("$(\'#urlHis" + i + "\').text('未報告URL一覧 (" + urlNum + "件)');");
          eval("$(\'#urlHis" + i + "\').css({\"color\":\"#FFF\",\"background-color\":\"#888\"});");
          eval("$(\'#finHis" + i + "\').text('報告ずみURL一覧 (" + urlFinNum + "件)');");
          eval("$(\'#finHis" + i + "\').css({\"color\":\"#F4F4F4\",\"background-color\":\"#666\"});");
          eval("$(\'#accHis" + i + "\').text('アカウント別一覧 (" + accUniNum + "件)');");
          eval("$(\'#accHis" + i + "\').css({\"color\":\"#F6F6F6\",\"background-color\":\"#444\"});");
          eval("$(\'#susHis" + i + "\').text('凍結ずみアカウント一覧 (" + susNum + "件)');");
          eval("$(\'#susHis" + i + "\').css({\"color\":\"#F8F8F8\",\"background-color\":\"#222\"});");
          eval("var susHis_txt = $(\'#susHis" + i + "\').text();");
          var a = susHis_txt.split("(");
          var b = a[1].split(")");
          eval("var nowSusNum" + i + " = b[0].slice(0,-1);");

          //0件のときはURL一覧ボタンを隠す
          eval("if (urlNum == 0) $(\'#urlHis" + i + "\').hide();");
          eval("if (urlFinNum == 0) {$(\'#finHis" + i + "\').hide(); $(\'#accHis" + i + "\').hide();} ");
          eval("if (susNum == 0) $(\'#susHis" + i + "\').hide();");

          //未報告URLの一覧を追加
          for (var j = 0; j < urlNum; j++) {
            eval("var urlThis = thisUrlArr" + i + "[" + j + "];");
            eval("var dateThis = thisUrlDateArr" + i + "[" + j + "];");
            eval("$(\'#urlTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><font size = \"2.5\"><span id =\"urlNum" + i + "_" + j + "\"></span><a href =\"" + urlThis + "\" target = \"_blank\"><span id =\"urlLine" + i + "_" + j + "\"></span></a></font><br /><font size = \"1.8\"><span class = \"alignright\" id =\"urlDateLine" + i + "_" + j + "\"></span><br /><br /></font></td><td><font size = \"1.8\"><button class = \"alignright\" id=\"urlDel" + i + "_" + j + "\">削除</button></font></td></tr></table>\');");
            eval("$(\'#urlNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#urlLine" + i + "_" + j + "\').append(\"" + urlThis + "\");");
            eval("$(\'#urlDateLine" + i + "_" + j + "\').append(\"" + dateThis + "　" + "\");");
            eval("$(\'#urlDel" + i + "_" + j + "\').click(function(){ var urlHere = $(\'#urlLine" + i + "_" + j + "\').text(); var dateHere = $(\'#urlDateLine" + i + "_" + j + "\').text(); if ($(this).text() == \"削除\"){ $(this).css({\"color\":\"#F5F5F5\", \"background-color\":\"#222\"}); $(this).text(\'戻す\'); $(\'#urlNum" + i + "_" + j + ", #urlLine" + i + "_" + j + ", #urlDateLine" + i + "_" + j + "\').css({\"color\":\"#999\"});  for(k = 0; k < thisUrlArr" + i + ".length; k++){ if(thisUrlArr" + i + "[k] == urlHere){ thisUrlArr" + i + ".splice( k,1); thisUrlDateArr" + i + ".splice(k,1);}}  } else { $(this).text(\'削除\'); $(this).css({\"color\":\"\",\"background-color\":\"\"}); $(\'#urlNum" + i + '_' + j + ", #urlLine" + i + '_' + j + ", #urlDateLine" + i + '_' + j + "\').css(\"color\", \"\"); thisUrlArr" + i + ".push(urlHere); thisUrlDateArr" + i + ".push(dateHere); }});");
          }
          //アカウント名一覧を追加
          for (var j = 0; j < accUniNum; j++) {
            eval("var accThis = accUniArr" + i + "[" + j + "];");
            eval("var nowAccArr" + i + "= [];");
            eval("for(l=0; l<thisAccArr" + i + ".length; l++){ var nowAcc = thisAccArr" + i + "[l]; if(accThis == nowAcc){ nowAccArr" + i + ".push(accThis);}}");
            eval("$(\'#accTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><span id =\"accNum" + i + "_" + j + "\"></span><a href =\"https://twitter.com/" + accThis + "\" target = \"_blank\"><span id =\"accLine" + i + "_" + j + "\"></span></a><font size = \"3\"><span class = \"alignright\" id =\"accNumLine" + i + "_" + j + "\">回　 </span><br /><br /></font></td><td><font size = \"1.8\"><button class = \"alignright\" id=\"susAcc" + i + "_" + j + "\">未凍結</button></font></td></tr></table>\');");
            eval("$(\'#accNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#accLine" + i + "_" + j + "\').append(\"" + accThis + "\");");
            eval("$(\'#accNumLine" + i + "_" + j + "\').prepend(nowAccArr" + i + ".length);");
            eval("var accRepNum" + i + "= [];");
            eval("accRepNum" + i + ".push(nowAccArr" + i + ".length)");

            //凍結記録ボタンの表示を変更
            eval("if (thisSusArr" + i + ".indexOf(accThis) !== -1){$(\'#susAcc" + i + "_" + j + "\').text(\"凍結済\"); $(\'#susAcc" + i + "_" + j + "\').css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); }");

            //クリックした位置のアカウントを凍結扱いに
            eval("$(\'#susAcc" + i + "_" + j + "\').click(function(){ var d = new Date(); d = d.toLocaleString(); var date = d.slice(0,-3); var id = $(this).attr(\"id\"); var id = $(this).attr(\"id\"); var X=id.split(\"_\"); var x = X[1];　var accHere = accUniArr" + i + "[x]; console.log(\"アカウント: \" + accHere); if($(this).text() == \"未凍結\") { $(this).text(\"凍結済\"); $(this).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"凍結済\"); $(id_fin).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(id_urlFinLine).css({\"color\":\"#999\"}); $(id_urlFinDateLine).css({\"color\":\"#999\"}); $(id_finNumLine).css({\"color\":\"#999\"}); $(id_urlFinNum).css({\"color\":\"#999\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"未凍結\"); $(id_sus).css({\"color\":\"#fff\",\"background-color\":\"#222\"});}} if(thisSusArr" + i + ".indexOf(accHere) == -1 ){ thisSusArr" + i + ".push(accHere); thisSusDateArr" + i + ".push(date);} } else if ($(this).text() == \"凍結済\"){$(this).text(\"未凍結\"); $(this).css({\"color\":\"#222\",\"background-color\":\"#fff\"}); for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"未凍結\"); $(id_fin).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); $(id_urlFinLine).css({\"color\":\"#cc0000\"}); $(id_urlFinDateLine).css({\"color\":\"#222\"}); $(id_finNumLine).css({\"color\":\"#222\"}); $(id_urlFinNum).css({\"color\":\"#222\"}); }} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"未凍結\"); $(id_sus).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<thisSusArr" + i + ".length; k++){ if(thisSusArr" + i + "[k] == accHere){ thisSusArr" + i + ".splice(k,1); thisSusDateArr" + i + ".splice(k,1); } } } }); ");
          }

          //報告ずみURLの一覧を追加
          for (var j = 0; j < urlFinNum; j++) {
            eval("var finThis = thisFinArr" + i + "[" + j + "];");
            eval("var accThis = thisAccArr" + i + "[" + j + "];");
            eval("var finDateThis = thisFinDateArr" + i + "[" + j + "];");
            eval("var finRep" + i + "= [];");

            eval("for(l=0; l<thisFinArr" + i + ".length; l++){if(items.accNameArr" + i + "[j] == thisAccArr" + i + "[l]) finRep" + i + ".push(finThis);}");
            eval("$(\'#finTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><font size = \"2.5\"><span id =\"urlFinNum" + i + "_" + j + "\"></span><a href =\"" + finThis + "\" target = \"_blank\"><span id =\"urlFinLine" + i + "_" + j + "\"></span></a></font><br /><font size = \"1.8\"><span class = \"alignright\" id =\"finNumLine" + i + "_" + j + "\">回　 by <strong><a href=\"https://twitter.com/" + accThis + "\" target=\"_blank\">" + accThis + "</a></strong>　　</span><span class = \"alignright\" id =\"urlFinDateLine" + i + "_" + j + "\">計</span><br /><br /></font></td><td class =\"alignright\"><font size = \"1.8\"><button id=\"susFin" + i + "_" + j + "\">未凍結</button></font></td></tr></table>\');");
            eval("$(\'#urlFinNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#urlFinLine" + i + "_" + j + "\').append(\"" + finThis + "\");");
            eval("$(\'#urlFinDateLine" + i + "_" + j + "\').prepend(\"" + finDateThis + "　" + "\");");
            eval("$(\'#finNumLine" + i + "_" + j + "\').prepend(finRep" + i + ".length);");

            //凍結記録のボタンの表示を変更
            eval("if (thisSusArr" + i + ".indexOf(accThis) !== -1){$(\'#susFin" + i + "_" + j + "\').text(\"凍結済\"); $(\'#susFin" + i + "_" + j + "\').css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(\'#urlFinNum" + i + "_" + j + ",#urlFinLine" + i + "_" + j + ", #urlFinDateLine" + i + "_" + j + ", #finNumLine" + i + "_" + j + "\').css(\"color\",\"#999\"); }");

            //クリックした位置のアカウントを凍結扱いに
            eval("$(\'#susFin" + i + "_" + j + "\').click(function(){var d = new Date(); d = d.toLocaleString(); var date = d.slice(0,-3); var id = $(this).attr(\"id\"); var X=id.split(\"_\"); var x = X[1];　var finHere = thisFinArr" + i + "[x]; var a = finHere.split(\"/\"); var accHere = a[3];  console.log(\"URL: \" + x + finHere + \"アカウント: \" + accHere); if ($(this).text() == \"未凍結\"){ for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"凍結済\"); $(id_fin).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(id_urlFinLine).css({\"color\":\"#999\"}); $(id_urlFinDateLine).css({\"color\":\"#999\"}); $(id_finNumLine).css({\"color\":\"#999\"}); $(id_urlFinNum).css({\"color\":\"#999\"}); }} for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"凍結済\"); $(id_acc).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"凍結済\"); $(id_sus).css({\"color\":\"#fff\",\"background-color\":\"#222\"});}} if(thisSusArr" + i + ".indexOf(accHere) == -1 ){ thisSusArr" + i + ".push(accHere); thisSusDateArr" + i + ".push(date);} } else if ($(this).text() == \"凍結済\"){ $(\'#urlFinNum" + i + "_" + j + ", #urlFinLine" + i + "_" + j + ", #urlFinDateLine" + i + "_" + j + ", #finNumLine" + i + "_" + j + "\').css(\"color\", \"#222\"); for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"未凍結\"); $(id_fin).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); $(id_urlFinLine).css({\"color\":\"#cc0000\"}); $(id_urlFinDateLine).css({\"color\":\"#222\"}); $(id_finNumLine).css({\"color\":\"#222\"}); $(id_urlFinNum).css({\"color\":\"#222\"}); }} for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"未凍結\"); $(id_acc).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"未凍結\"); $(id_sus).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); }} for(k=0; k<thisSusArr" + i + ".length; k++){ if(thisSusArr" + i + "[k] == accHere){ thisSusArr" + i + ".splice(k,1); thisSusDateArr" + i + ".splice(k,1); } } } }); ");
          }

          //凍結ずみアカウント名一覧を追加
          for (var j = 0; j < susNum; j++) {
            eval("var susThis = thisSusArr" + i + "[" + j + "];");
            eval("var susDateThis = thisSusDateArr" + i + "[" + j + "];");
            eval("var nowAccArr" + i + " = [];");
            eval("for(l=0; l<thisAccArr" + i + ".length; l++){ var nowAcc = thisAccArr" + i + "[l]; if(susThis == nowAcc){ nowAccArr" + i + ".push(susThis);}}");
            eval("var susRepNum = nowAccArr" + i + ".length;");
            eval("$(\'#susTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><span id =\"susNum" + i + "_" + j + "\"></span><a href =\"https://twitter.com/" + susThis + "\" target = \"_blank\"><span id =\"susLine" + i + "_" + j + "\"></span></a><span class = \"alignright\" id =\"susNumLine" + i + "_" + j + "\"></span><br /></td><td><font size = \"1.8\"><button class = \"alignright\" id=\"sus" + i + "_" + j + "\" style=\"color:#f5f5f5; background-color:#222; \" >凍結済</button></font></td></tr></table>\');");
            eval("$(\'#susNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#susLine" + i + "_" + j + "\').append(\"" + susThis + "\");");
            eval("$(\'#susNumLine" + i + "_" + j + "\').append(\"" + susDateThis + "　" + "\");");
            eval("$(\'#susNumLine" + i + "_" + j + "\').append(\"" + susRepNum + "回\");");

            //クリックした位置のアカウントを凍結扱いに
            eval("$(\'#sus" + i + "_" + j + "\').click(function(){ var d = new Date(); d = d.toLocaleString(); var date = d.slice(0,-3); var id = $(this).attr(\"id\"); var X=id.split(\"_\"); var x = X[1]; var id_susLine = \"#susLine\" + " + i + " + \"_\" + x;　var accHere = $(id_susLine).text(); console.log(\"アカウント: \" + accHere); if($(this).text() == \"未凍結\") { $(this).text(\"凍結済\"); $(this).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"凍結済\"); $(id_acc).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"});}} for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"凍結済\"); $(id_fin).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(id_urlFinLine).css({\"color\":\"#999\"}); $(id_urlFinDateLine).css({\"color\":\"#999\"}); $(id_finNumLine).css({\"color\":\"#999\"}); $(id_urlFinNum).css({\"color\":\"#999\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"未凍結\"); $(id_sus).css({\"color\":\"#fff\",\"background-color\":\"#222\"});}} if(thisSusArr" + i + ".indexOf(accHere) == -1 ){ thisSusArr" + i + ".push(accHere); thisSusDateArr" + i + ".push(date);} } else if ($(this).text() == \"凍結済\"){$(this).text(\"未凍結\"); $(this).css({\"color\":\"#222\",\"background-color\":\"#fff\"}); for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"未凍結\"); $(id_acc).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"未凍結\"); $(id_fin).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); $(id_urlFinLine).css({\"color\":\"#cc0000\"}); $(id_urlFinDateLine).css({\"color\":\"#222\"}); $(id_finNumLine).css({\"color\":\"#222\"}); $(id_urlFinNum).css({\"color\":\"#222\"}); }} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"未凍結\"); $(id_sus).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<thisSusArr" + i + ".length; k++){ if(thisSusArr" + i + "[k] == accHere){ thisSusArr" + i + ".splice(k,1); thisSusDateArr" + i + ".splice(k,1); } } } }); ");

          }
          //URLの一覧の下に編集用ボタンを追加
          eval("$(\'#urlBox" + i + "\').append(\'<center><input id=\"save_urlArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>　<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /><br/><font size = \"-2\"><input id=\"clear_urlArr" + i + "\" type=\"submit\" value=\"" + str_url_clear + "\" style=\"background-color:#999\; color:#fff; \"/><br/><br/></font></center>\')");
          eval("$(\'#finBox" + i + "\').append(\'<center><input id=\"save_finArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>　<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center>\')");
          eval("$(\'#accBox" + i + "\').append(\'<center><input id=\"save_accArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>　<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center>\')");
          eval("$(\'#susBox" + i + "\').append(\'<center><input id=\"save_susArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>　<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center>\')");

          //スクロールバーのデザイン
          var csObj = new Object();
          csObj.theme = "dark";
          eval("$(\"#urlTable" + i + "\").mCustomScrollbar(csObj);");
          eval("$(\"#finTable" + i + "\").mCustomScrollbar(csObj);");
          eval("$(\"#accTable" + i + "\").mCustomScrollbar(csObj);");
          eval("$(\"#susTable" + i + "\").mCustomScrollbar(csObj);");

          //編集内容保存ボタンの機能
          eval("$('#save_urlArr" + i + "').click(function(){ var del = {}; del[\'urlArr" + i + "\'] = thisUrlArr" + i + "; del[\'urlDateArr" + i + "\'] = thisUrlDateArr" + i + ";  alert(str_edit_saved); chrome.storage.local.set(del,function(){	location.reload();});});");
          eval("$('#clear_urlArr" + i + "').click(function(){ var del = {}; del[\'urlArr" + i + "\'] = []; del[\'urlDateArr" + i + "\'] = [];  alert(\"この項目の未報告URLをすべて削除しました。\"); chrome.storage.local.set(del,function(){	location.reload();});});");
          eval("$('#save_finArr" + i + ", #save_accArr" + i + ", #save_susArr" + i + "\').click(function(){ var del = {}; del[\'accSusArr" + i + "\'] = thisSusArr" + i + "; del[\'accSusDateArr" + i + "\'] = thisSusDateArr" + i + ";  alert(str_edit_saved); chrome.storage.local.set(del,function(){	location.reload();});});");
        }
        //項目削除保存ボタンの機能	


        //データが両方とも空のとき、ボタンを非表示にする
        eval("if(urlNum == 0 && urlFinNum == 0) {$(\'#history" + i + "\').parent('dt').hide();}");
      }
      if (items.fullname !== undefined && items.report0 !== undefined) {
        var urlSum = 0,
          urlFinSum = 0,
          accUniSum = 0;
        accSusSum = 0;
        for (var i = 0; i < items.repNum; i++) {
          eval("var accSetArr" + i + "= items.accNameArr" + i + ".filter(function (a, b, self) { return self.indexOf(a) === b; });");
          eval("var urlArr = items.urlArr" + i + ";");
          eval("var urlFinArr = items.urlFinArr" + i + ";");
          eval("var accSetArr = accSetArr" + i + ";");
          eval("var accSusArr = items.accSusArr" + i + ";");
          urlSum = urlSum + urlArr.length;
          urlFinSum = urlFinSum + urlFinArr.length;
          accUniSum = accUniSum + accSetArr.length;
          accSusSum = accSusSum + accSusArr.length;
        }
        eval("$(\'#title\').append(\'<div id=\"sum\" style=\"padding:20px;\"><center><strong><font size=\"5em\">現在の総計</font><br/><br/>報告ずみURL：  " + urlFinSum + "　アカウント総数： " + accUniSum + "　凍結ずみアカウント： " + accSusSum + "</strong></center>\');");
        if (urlSum == 0) {
          $('#sum').append("<center><font size=\"-1\"><br/><strong>未報告のURLはありません。</strong></font></center>");
        }
        if (urlSum !== 0) {
          eval("$(\'#sum\').append(\'<center><font size=\"-1\"><br/><strong>未報告のURLが " + urlSum + "件あります。</strong></font></center>\');");
        }
        if (urlFinSum !== 0) {
          var t_txt1 = "「無断転載スレイヤー」で計",
            t_txt2 = "件のURLを通報しました。アカウントの総数は" + accUniSum + "件でした。",
            t_txt3 = "うち、現在までに凍結が確認できたのは",
            t_txt4 = "件です。";
          t_txt1 = encodeURIComponent(t_txt1);
          t_txt2 = encodeURIComponent(t_txt2);
          t_txt3 = encodeURIComponent(t_txt3);
          t_txt4 = encodeURIComponent(t_txt4);
          if (accSusSum == 0) {
            $('#sum').append("<center><br/><strong><a href=\"http://twitter.com/share?url=https://twitter.com/nakashima723/status/588309694160113664&text=" + t_txt1 + urlFinSum + t_txt2 + "&related=nakashima723\"><button id=\"tweet\" style=\"padding:20px 50px; background-color:#55acee; border:none; color:#FFF;\">これまでの成果をツイート</button></a></strong></center>");
          } else if (accSusSum !== 0) {
            $('#sum').append("<center><br/><strong><a href=\"http://twitter.com/share?url=https://twitter.com/nakashima723/status/588309694160113664&text=" + t_txt1 + urlFinSum + t_txt2 + t_txt3 + accSusSum + t_txt4 + "&related=nakashima723\"><button id=\"tweet\" style=\"padding:20px 50px; background-color:#00aced; border:none; list-style:none; color:#FFF;\">これまでの成果をツイート</button></a></strong></center>");
          }
        }
      }
      //Url表示部分の終わり
      var num = items.repNum;
      if (!items.repNum) {
        var num = 0;
      }
      $('#acMenu').append('<dt><button id="new_report">新しい報告内容を作成</button></dt>');
      $('#acMenu').append('<dd id="form' + num + '"><strong>新しい報告内容の名前</strong><br /><font size="-1">※他の報告内容と区別できるように、わかりやすい名前をつけてください。</font><input id="report' + num + '_input" type="text" value="例：壁ドン対処法"/><br/>著作権者の名前：<br /><input id="owner_name' + num + '_input" type="text" style="margin-bottom:10px" /><br />オリジナル作品の内容：<textarea id="tweet_image_original' + num + '">例：私が製作し、以下のツイートで最初に発表したイラストです。</textarea><br />オリジナル作品が確認できるURL：<br /><font size="-1">※上記の「内容」に続けて記入されます。<br />　侵害ツイートのURLではなく、ご自身でアップロードしたツイートやサイトなど<br />　著作権侵害にあたらない使用例のURLを記入してください。</font><br/><input id="tweet_url_original' + num + '" type="text" value="例：https://twitter.com/nakashima723/status/493780492345307136" style="width:600px"/><br />著作権侵害の内容：<textarea id="tweet_image_infringement' + num + '">例：著作権で保護された作品を、無断で転載し利用しています。</textarea><br />侵害ツイートの検索に使う語句：(必須)<br /><font size="-1">※スペースで区切ると複数入力できます。単語の前に半角で「-（マイナス）」をつけると、<br />　その単語を含むツイートが検索結果から除外されます。</font><br /><input id="query' + num + '" type="text" style="width:600px" value="' + str_ex5 + '"/><br />作品の種類：<br /><input type="radio" name="art_type' + num + '" value="image' + num + '" id="image_type' + num + '" style="margin-bottom:40px">イラスト・写真・絵画　　<input type="radio" name="art_type' + num + '" value="movie' + num + '" id="movie_type' + num + '" style="margin-bottom:40px">動画　　<input type="radio" name="art_type' + num + '" value="writing' + num + '" id="writing_type' + num + '" style="margin-bottom:40px">文章<br/>報告者の属性：<br /><input type="radio" name="owner_type' + num + '" value="owner" id="owner_type' + num + '" style="margin-bottom:40px">著作権者本人　　<input type="radio" name="owner_type' + num + '" value="represent" id="represent_type' + num + '" style="margin-bottom:40px">著作権者の正式な代理人　<br/><center><input id="save_new" type="submit" value="この内容で新規作成" />　<input class="closure" type="submit" value="' + str_close + '" /></center><br /></dd>');
      //記入例を入力・管理
      eval("var report_input_id =  \"#report" + num + "_input\";");
      $(report_input_id).focus(function () {
        if ($(report_input_id).val() == str_ex1) {
          $(this).val("");
        }
        $(this).css({
          color: '#222'
        });
      });
      $(report_input_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex1);
      });

      eval("var original_id =  \"#tweet_image_original" + num + "\";");
      $(original_id).focus(function () {
        if ($(original_id).val() == str_ex2) {
          $(this).val("");
        }
        $(this).css('color', '#222');
      });
      $(original_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex2);
      });

      eval("var original_url_id =  \"#tweet_url_original" + num + "\";");
      $(original_url_id).focus(function () {
        if ($(original_url_id).val() == str_ex3) {
          $(this).val("");
        }
        $(this).css('color', '#222');
      });
      $(original_url_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex3);
      });

      eval("var infringement_id =  \"#tweet_image_infringement" + num + "\";");
      $(infringement_id).focus(function () {
        if ($(infringement_id).val() == str_ex4) {
          $(this).val(str_ex4_after);
        }
        $(this).css('color', '#222');
      });
      $(infringement_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex4);
      });

      eval("var query_id =  \"#query" + num + "\";");
      $(query_id).focus(function () {
        if ($(query_id).val() == str_ex5) {
          $(this).val("-RT");
        }
        $(this).css('color', '#222');
      });
      $(query_id).blur(function () {
        if ($(this).val() == '' || $(this).val() == "-RT")
          $(this).css({
            color: '#999'
          }).val(str_ex5);
      });

      var all_id = report_input_id + ", " + original_id + ", " + original_url_id + ", " + infringement_id + ", " + query_id;
      $(all_id).css('color', '#999');

      $(function () {
        var save = function () {
          chrome.storage.local.get(function (items) {
            for (let i = 0; i < items.repNum; i++) {
              const report = $('#report' + i + '_input').val();
              const owner_name = $('#owner_name' + i + '_input').val();
              const hide_pop = $('#hide_pop' + i).prop('checked');
              const hide_his = $('#hide_his' + i).prop('checked');
              const tweet_image_original = $('#tweet_image_original' + i).val();
              const tweet_url_original = $('#tweet_url_original' + i).val();
              const tweet_image_infringement = $('#tweet_image_infringement' + i).val();
              const query = $('#query' + i).val();
              const art_type = $('input[name=art_type' + i + ']:checked').val();
              const owner_type = $('input[name=owner_type' + i + ']:checked').val();

              if (report === "" || owner_name === "" || tweet_image_original === "" || tweet_url_original === "" || tweet_image_infringement === "" || query === "") {
                alert(str_al_save_new);
                break;
              }

              const rep = {
                ['report' + i]: report,
                ['owner_name' + i]: owner_name,
                ['hide_pop' + i]: hide_pop,
                ['hide_his' + i]: hide_his,
                ['tweet_image_original' + i]: tweet_image_original,
                ['tweet_url_original' + i]: tweet_url_original,
                ['tweet_image_infringement' + i]: tweet_image_infringement,
                ['query' + i]: query,
                ['art_type' + i]: art_type,
                ['owner_type' + i]: owner_type,
                slyr_mode: "pakutwi"
              };

              chrome.storage.local.set(rep, function (items) {});
            }

            if (report !== "" && owner_name !== "" && tweet_image_infringement !== "" && tweet_url_original !== "" && query !== "") {
              alert(str_saved);
              repCounter();
              location.reload();
            }
          });
        }
        chrome.storage.local.get(function (items) {
          for (i = 0; i < items.repNum; i++) {
            eval("$(\'#save" + i + "\').click(function(){save();});");
          }
        });
        $('#save_new').click(function () {
          chrome.storage.local.get(function (items) {
            var report = $('#report' + num + '_input').val();
            var owner_name = $('#owner_name' + num + '_input').val();
            var tweet_image_original = $('#tweet_image_original' + num).val();
            var tweet_image_infringement = $('#tweet_image_infringement' + num).val();
            var tweet_url_original = $('#tweet_url_original' + num).val();
            var query = $('#query' + num).val();
            var art_type = $('input[name=art_type' + i + ']:checked').val();
            var owner_type = $('input[name=owner_type' + i + ']:checked').val();

            var repNew = report;
            var ownNew = owner_name;
            var origNew = tweet_image_original;
            var urlNew = tweet_url_original;
            var infNew = tweet_image_infringement;
            var queryNew = query;
            var art_typeNew = art_type;
            var owner_typeNew = owner_type;

            if (repNew === str_ex1 || repNew === "" || ownNew === "" || origNew === str_ex2 || origNew === "" || urlNew === str_ex3 || infNew === str_ex4 || infNew === "" || queryNew === str_ex5 || queryNew === "" || art_typeNew === undefined || owner_typeNew === undefined) {
              alert(str_al_save_new);
            } else {
              var obj = {
                ['report' + num]: repNew,
                ['owner_name' + num]: ownNew,
                ['hide_pop' + num]: null,
                ['hide_his' + num]: null,
                ['tweet_image_original' + num]: origNew,
                ['tweet_image_infringement' + num]: infNew,
                ['tweet_url_original' + num]: urlNew,
                ['query' + num]: queryNew,
                ['art_type' + num]: art_typeNew,
                ['owner_type' + num]: owner_typeNew,
                ['urlArr' + num]: [],
                ['urlDateArr' + num]: [],
                ['urlFinArr' + num]: [],
                ['urlFinDateArr' + num]: [],
                ['accNameArr' + num]: [],
                ['accSusArr' + num]: [],
                ['accSusDateArr' + num]: [],
                mode: num
              };

              chrome.storage.local.set(obj, function (items) {});
              repCounter();
              showSetting();
              showReports();
              alert(str_saved);
              location.reload();
            }
          });
        });
        $("#acMenu dt, #hisMenu dt").on("click", function () {
          $(this).next('dd').slideToggle("fast");
          var contents = $(this).next('dd');
          $('dd').not(contents).slideUp("fast");
        });
        $('.hisBoxMenu dt, .finBoxMenu dt, .accBoxMenu dt, .susBoxMenu dt').unbind('click');
        $(".hisBoxMenu dt, .finBoxMenu dt, .accBoxMenu dt, .susBoxMenu dt").on("click", function () {
          $(this).next('dd').slideToggle("fast");
          var contents = $(this).next('dd');
          $('.hisBoxMenu dd, .finBoxMenu dd, .accBoxMenu dd, .susBoxMenu dd').not(contents).slideUp("fast");
        });
        $('.closure').unbind('click');
        $(".closure").on("click", function () {
          $(this).closest('dd').slideToggle("fast");
        });
      });
    });
    $('#main').append('<font size="-1"><br/><center><span>※侵害ツイートの検索・報告は<strong>ウィンドウ右上のアイコン<img src=\"images/ccslyrt_16.png\" width=\"24\"></strong>から行えます。<br/><br/>※報告リストへのURL追加用ボタンは、<strong>各ツイートの日付の横</strong>に表示されます。<br/>うまく表示されない場合は、Ctrlキーを押しながらそのページを更新してください。<br/><br/>※Twitter側の手違いで、オリジナルの画像・動画が削除されてしまった場合の対処法は<a href=\"http://botslyr.nakashima723.info/fax-sample/\"><strong>こちら</strong></a><br/><br/></ br>developed by <a href=\"https://twitter.com/nakashima723\">nakashima723</a> since 2015</font><br/><font size=\"-2\">不具合・ご要望などありましたら、上記アカウントまたは以下のアドレスまでご連絡ください。</font><br/><a href=\"mailto:yokoshima723@gmail.com\">yokoshima723@gmail.com</a></span></center></font>');
  });
  //ムラハチ for Google
  //文字列を定義
  var m_str_ex1 = "例：壁ドン対処法",
    m_str_ex2 = "例1：私が製作し、以下のURLで公開した○○のイラストが無断で転載され利用されています。私が製作者本人であることは、Twitterアカウントのプロフィールに、この報告に使用しているメールアドレスが記載されていることからご確認いただけます。\n例2：弊社が2015年に製作・販売したPCゲーム「○○○」のファイル共有を可能にする違法なTorrentファイルの配布、または無断で転載されたアップローダーへのリンクが行われています。",
    m_str_ex3 = "例：https://twitter.com/nakashima723/status/493780492345307136",
    m_str_ex4 = "例：（自分の作品名） zip OR rar OR torrent OR raw -site:nakashima723.info",
    m_str_setting = "基本設定",
    str_holder = "ここに委任元の作者・権利者名を入力",
    m_str_setting_ex = "<font size=\"-1\">Googleの<a href=\"https://www.google.com/webmasters/tools/dmca-notice\" target=\"report\"><strong>著作権侵害報告フォーム</strong></a>に入力する内容を設定します。<br/>氏名などすべての報告に共通する「基本設定」と、<br/>侵害の内容ごとに異なる「報告内容」を記入してください。</font>",
    m_str_company = "例：陰陽社";

  var m_save = function () {
    chrome.storage.local.get(function (items) {
      for (i = 0; i < items.m_repNum; i++) {
        var rep = new Object();
        var m_report = $('#m-report' + i + '_input').val();
        var m_hide_pop = $('#m-hide_pop' + i).prop('checked');
        var m_hide_his = $('#m-hide_his' + i).prop('checked');
        var m_infringement = $('#m-infringement' + i).val();
        var m_original = $('#m-original' + i).val();
        var m_query = $('#m-query' + i).val();
        var m_holder = $('#m-holder' + i).val();
        if (m_report == "" || m_original == "" || m_infringement == "" || m_query == "" || m_holder == "" || m_holder == str_holder) {
          alert(str_al_save_new);
          break;
        }
        rep['m_report' + i] = m_report;
        rep['m_hide_pop' + i] = m_hide_pop;
        rep['m_hide_his' + i] = m_hide_his;
        rep['m_original' + i] = m_original;
        rep['m_infringement' + i] = m_infringement;
        rep['m_holder' + i] = m_holder;
        rep['m_query' + i] = m_query;
        rep['slyr_mode'] = 'murahachi';
        rep['m_bar'] = 'on';
        chrome.storage.local.set(rep, function (items) {});
      }
      if (m_report !== "" && m_infringement !== "" && m_original !== "" && m_query !== "" && m_holder !== "" && m_holder !== str_holder) {
        alert(str_saved);
        repCounter();
        location.reload();
      }
    });
  }

  //入力フォームを生成
  chrome.storage.local.get(function (items) {
    var num = items.m_repNum;
    if (!items.m_repNum) {
      var num = 0;
    }
    //登録ずみの著作者名からプルダウンメニューを生成
    const holderArr = [];
    for (let i = 0; i < num; i++) {
      const holderTemp = items[`m_holder${i}`];
      if (holderTemp !== "self") holderArr.push(holderTemp);
    }

    const uniqueHolderArr = Array.from(new Set(holderArr));
    uniqueHolderArr.sort();
    let holderMenu = "<option value=\"0\">登録ずみの権利者名から入力</option>";
    for (let i = 0; i < uniqueHolderArr.length; i++) {
      const holderOption = uniqueHolderArr[i];
      const holderLine = `<option value="${holderOption}">${holderOption}</option>`;
      holderMenu += holderLine;
    }

    $('#m-setting_div').append("<dl id=\"m-acMenu\" style =\'margin:0 auto; width: 100%;\'><h2>" + m_str_setting + "</h2>" + m_str_setting_ex + "<br/><br/><dt><button id=\"m-setting\">" + str_edit + "</button><br /></dt><dd style =\'margin:0 30px auto; display:none; width:\"100%;\"'>本プログラムは報告対象となる著作物の正式な権利者の方、またはその代理人のみご利用いただけます。著作物の定義や、ご自身の権利の有無については各自でご確認ください。<br /><br /><strong>連絡先</strong><br />本名（姓）:<br /><input id=\"m-family\" type=\"text\" value=\"" + str_yamada + "\"/><br />本名（名）:<br /><input id=\"m-name\" type=\"text\" value=\"" + str_taro + "\" /><br />会社名（任意）:<br /><input id=\"m-company\" type=\"text\" value=\"" + m_str_company + "\" /><br />メール アドレス : <input id=\"m-email\" type=\"text\" /><br /><strong>法的な宣誓：</strong><br /><font size=\"2.8em\"><br /><input id=\"m-statement1\" type=\"checkbox\">私は、報告対象となるURL上の著作物が著作権の所有者、代理人、または法律による許可なく使用されていることを誠実に確信したうえで、このツールを使用します。<br /><br /><input id=\"m-statement2\" type=\"checkbox\">このツール内で入力している情報に偽りはありません。私は、偽証が処罰の対象であることを承知のうえで、独占的権利を侵害された著作物の著作権所有者またはその正式な代理人であることを誓います。<br /><br /><input id=\"m-statement3\" type=\"checkbox\">法的な通知はすべてその写しが Lumen プロジェクト（http://lumendatabase.org）に送付され、公開されたり注釈を付けられたりする場合があることを理解しています。また、個人の連絡先情報は Lumen によって公開前に通知から削除されるものの、多くの場合、個人名は削除されないことも理解しています。<br /><br /></font><br /><input id=\"m_save_setting\" type=\"submit\" value=\"この入力内容を保存\" />　<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /><br /></dd> <h2>" + str_edit_report + "</h2><dt><button id=\"m-new_report\">新しい報告内容を作成</button></dt> <dd id = \"m-form" + num + "\"><strong>新しい報告内容の名前</strong><br /><font size =\"-1\">※他の報告内容と区別できるように、わかりやすい名前をつけてください。</font><input id=\"m-report" + num + "_input\" type=\"text\" value=\"" + m_str_ex1 + "\"/><br /><strong>オリジナル作品の内容と、著作権侵害の内容：</strong></br><font size=\"-1\">※Googleの削除担当者が、削除対象となるページにその作品が出現するかどうかを確認するのに</br>　使われます。<strong>１つの報告内容で扱うのは１種類の作品（商品）のみ</strong>とし、わかりやすく記述して</br>　ください。</font><textarea id=\"m-original" + num + "\" style=\"height:140px;\" \">" + m_str_ex2 + "</textarea><br /><strong>報告者の属性：</strong></br><input type=\"radio\" name=\"reporter-type\" value=\"author\" id=\"author-type\" style=\"margin-bottom:15px\"> 作者、または権利者<strong>本人</strong></br><input type=\"radio\" name=\"reporter-type\" value=\"attoney\" id=\"attoney-type\" style=\"margin-bottom:20px\"> 作者または権利者の、正式な<strong>代理人</strong> <input id=\"m-holder" + num + "\" style=\"margin-bottom:10px\" name=\"holder\" type=\"text\" value=\"\"/><form><select id=\"holder-menu" + num + "\">" + holderMenu + "</select></form><p id=\"g-input" + num + "\"><font size =\"-1\">※新規に権利者名を登録する場合、Google側の報告フォームでも<strong>初回報告時のみ手入力</strong>が必要です。</br>　ここに記入したものと<strong>同じ権利者名</strong>を、Google側の報告フォームにも登録してください。</font></p id=\"g-input" + num + "\"><strong>オリジナルの作品が確認できるURL：</strong></br><font size=\"-1\">※削除対象となるURLではなく、作品の販売ページや自身でアップロードしたサイトなど、</br><strong>　著作権を侵害していないページのURL</strong>を記入してください。（1行に1件）</font><textarea id=\"m-infringement" + num + "\">" + m_str_ex3 + "</textarea><br /><strong>侵害サイトの検索に使う語句：</strong></br><font size=\"-1\">※必要に応じて<a href=\"https://support.google.com/websearch/answer/2466433\" target=\"_blank\"><strong>検索演算子</a></strong>を使用すると、サイトの絞込みがしやすくなります。</font><input id=\"m-query" + num + "\" type=\"text\" style=\"width:600px\" value=\"" + m_str_ex4 + "\"/><br /><center><input id=\"m-save_new\" type=\"submit\" value=\"この内容で新規作成\" />　<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center><br /></dd>");
    $('#m-holder' + num).hide();
    $('#g-input' + num).hide();
    $('#holder-menu' + num).hide();
    $('#author-type').click(function () {
      $('#m-holder' + num).val('self');
      $('#holder-menu' + num).hide();
      $('#m-holder' + num).hide();
      $('#g-input' + num).hide();
    });
    $('#attoney-type').click(function () {
      $('#m-holder' + num).css({
        color: '#999'
      }).val(str_holder);
      $('#m-holder' + num).show();
      $('#holder-menu' + num).show();
      $('#g-input' + num).show();
    });
    $('#holder-menu' + num).change(function () {
      var val = $('#holder-menu' + num).val();
      $('#m-holder' + num).css({
        color: '#222'
      }).val(val);
      $('#holder-menu' + num).val(0);
    });

    if (items.m_repNum > 0) {
      $('#m-acMenu h2:eq(1)').after("<font size=\"-1\">侵害の内容ごとに、タイトルや元作品のURLを設定してください。</br></font>");
      for (var i = 0; i < items.m_repNum; i++) {
        var m_thisTitle = (i + 1) + ': ' + items['m_report' + i];
        var m_hide_his = items['m_hide_his' + i];
        var $newButton = $('<button>').attr('id', 'm_report' + i).text(m_thisTitle);
        var $newDt = $('<dt>').append($newButton);
        $('#m-new_report').closest('dt').before($newDt);
        $('#m_report' + i).text(m_thisTitle);
        $('#m-new_report').closest('dt').before(`<dd id="m-form${i}">
  <strong>この報告内容の名前</strong><br />
  <font size="-1">※他の報告内容と区別できるように、わかりやすい名前をつけてください。</font>
  <input id="m-report${i}_input" type="text" style="margin-bottom:10px" />
  <input type="checkbox" id="m-hide_pop${i}" style="margin-bottom:30px">検索用ポップアップの一覧に表示しない
  <input type="checkbox" id="m-hide_his${i}" style="margin-bottom:30px">報告履歴一覧に表示しない<br />
  <strong>オリジナル作品の内容と、著作権侵害の内容：</strong><br />
  <font size="-1">※Googleの削除担当者が、削除対象となるページにその作品が出現するかどうかを確認するのに使われます。<strong>１つの報告内容で扱うのは１種類の作品（商品）のみ</strong>とし、わかりやすく記述してください。</font><textarea style="height:140px;" id="m-original${i}"></textarea><br /><strong>報告者の属性：</strong></br><input type="radio" name="reporter-type${i}" value="author" id="author-type${i}" style="margin-bottom:15px">作者、または権利者<strong>本人</strong></br><input type="radio" name="reporter-type${i}" value="attoney" id="attoney-type${i}" style="margin-bottom:15px">作者または権利者の、正式な<strong>代理人</strong> <input name="holder" style="margin-bottom:10px" id="m-holder${i}" type="text" value=""/><form><select id="holder-menu${i}">${holderMenu}</select></form><p id="g-input${i}"><font size ="-1">※新規に権利者名を登録する場合、Google側の報告フォームでも<strong>初回報告時のみ手入力</strong>が必要です。</br>　ここに記入したものと<strong>同じ権利者名</strong>を、Google側の報告フォームにも登録してください。</font></p><strong>オリジナルの作品が確認できるURL：</strong></br><font size=" -1">※削除対象となるURLではなく、作品の販売ページや自身でアップロードしたサイトなど、</br><strong>　著作権を侵害していないページのURL</strong>を記入してください。（1行に1件）</font><textarea id="m-infringement${i}"></textarea><br /><strong>侵害サイトの検索に使う語句：</strong></br><font size=" -1">※必要に応じて<a href="https://support.google.com/websearch/answer/2466433" target="_blank"><strong>検索演算子</a></strong>を使用すると、サイトの絞込みがしやすくなります。</font><input id="m-query${i}" type="text" style="width:600px"/><br /><center><input id="m-save${i}" type="submit" value="この入力内容を保存" />　<input class="closure" type="submit" value='${str_close}' /><br /><button id ="m-del_report${i}" style="font-size:0.9em; background-color:#666; color:#fff;">この項目を削除</button></center><br /><br />
</dd>`);
        $('#m-del_report' + i).hide();

        if (items['m_holder' + i] === 'self' || items['m_holder' + i] === undefined) {
          $('#m-holder' + i).hide();
          $('#holder-menu' + i).hide();
          $('#g-input' + i).hide();
        }

        $('#author-type' + i).click(function () {
          $('#m-holder' + i).val('self');
          $('#m-holder' + i).hide();
          $('#holder-menu' + i).hide();
          $('#g-input' + i).hide();
        });

        $('#attoney-type' + i).click(function () {
          $('#m-holder' + i).val(str_holder);
          $('#m-holder' + i).css({
            color: '#999'
          });
          $('#m-holder' + i).show();
          $('#holder-menu' + i).show();
          $('#g-input' + i).show();
        });

        $('#holder-menu' + i).change(function () {
          var val = $('#holder-menu' + i).val();
          $('#m-holder' + i).css({
            color: '#222'
          }).val(val);
          $('#holder-menu' + i).val(0);
        });

      }
      //報告履歴一覧を生成
      $('#m-hisMenu').append('<h2>報告履歴の確認と管理</h2><font size="-1">報告後の結果は、<a href ="https://www.google.com/webmasters/tools/dmca-dashboard" target="m_dashboard"><strong>Googleの削除用ダッシュボード</strong></a>から確認できます。</font></br></br>');
      for (var i = 0; i < items.m_repNum; i++) {
        var thisArr = items['m_Arr' + i];
        var thisDateArr = items['m_DateArr' + i];
        var thisSiteArr = items['m_SiteArr' + i];
        var thisFinArr = items['m_FinArr' + i];
        var thisFinDateArr = items['m_FinDateArr' + i];
        var thisFinSiteArr = items['m_FinSiteArr' + i];
        var thisTitle = (i + 1) + ': ' + items['m_report' + i];
        var hide_his = items['m_hide_his' + i];
        var urlNum = thisArr.length;
        var urlFinNum = thisFinArr.length;

        //ドメイン別一覧を生成
        var DomArr = [],
          DomUniArr = [],
          domUniNum = DomUniArr.length;
        //重複のない一覧を生成

        //	var DomeUniArr= thisDomeArr.filter(function (a, b, self) { return self.indexOf(a) === b; });
        //	var finDomeUniArr= thisFinDomeArr.filter(function (a, b, self) { return self.indexOf(a) === b; });	
        //	var accUniNum = accUniArr" + i + ".length;
        //表示がONになっているか判定
        if (hide_his !== true) {
          // dt要素の追加
          var $newDt = $('<dt>');
          $newDt.append($('<button>').attr('id', 'm-history' + i).text('名称未設定'));
          $newDt.append('<br/>');
          $newDt.append($('<span>').attr('id', 'm-reported' + i).html('<font size="-1">　未報告： ' + urlNum + '件　 報告ずみ： ' + urlFinNum + '件　</font><br /><br/>'));
          $('#m-hisMenu').append($newDt);

          // dd要素の追加
          var $newDd = $('<dd>').attr('id', 'm-hisBox' + i);

          // m-urlBoxMenuの追加
          var $newDl1 = $('<dl>').addClass('m-hisBoxMenu').css('margin', '0 auto');
          $newDl1.append($('<dt>').append($('<button>').attr('id', 'm-urlHis' + i).text('未報告URL一覧 (' + urlNum + '件)')));
          $newDl1.append($('<dd>').attr('id', 'm-urlBox' + i).append($('<div>').attr('id', 'm-urlTable' + i)));
          $newDd.append($newDl1);

          // m-finBoxMenuの追加
          var $newDl2 = $('<dl>').addClass('m-finBoxMenu').css('margin', '0 auto');
          $newDl2.append($('<dt>').append($('<button>').attr('id', 'm-finHis' + i).text('報告ずみURL一覧 (' + urlFinNum + '件)')));
          $newDl2.append($('<dd>').attr('id', 'm-finBox' + i).append($('<div>').attr('id', 'm-finTable' + i)));
          $newDd.append($newDl2);

          // m-domBoxMenuの追加
          var $newDl3 = $('<dl>').addClass('m-domBoxMenu').css('margin', '0 auto');
          $newDl3.append($('<dt>').append($('<button>').attr('id', 'm-domHis' + i).text('サイト別一覧 (開発中)')));
          $newDl3.append($('<dd>').attr('id', 'm-domBox' + i).append($('<div>').attr('id', 'm-domTable' + i).text('※自動Web魚拓機能は、サーバーへの負担から開発を見送りました。\n\n')));
          $newDd.append($newDl3);

          $('#m-hisMenu').append($newDd);

          // ボタンのタイトルを更新
          $('#m-history' + i).text(thisTitle);

          // m-urlHisのスタイルを設定
          $('#m-urlHis' + i).css({
            color: '#FFF',
            backgroundColor: '#888'
          });

          // m-finHisのスタイルを設定
          $('#m-finHis' + i).css({
            color: '#F4F4F4',
            backgroundColor: '#666'
          });

          // m-domHisのスタイルを設定
          $('#m-domHis' + i).css({
            color: '#F6F6F6',
            backgroundColor: '#444'
          });

          // 0件のときはURL一覧ボタンを非表示
          if (urlNum == 0) {
            $('#m-urlHis' + i).hide();
          }

          if (urlFinNum == 0) {
            $('#m-finHis' + i).hide();
            $('#m-domHis' + i).hide();
          }

          for (var j = 0; j < urlNum; j++) {
            var urlThis = thisArr[j];
            var siteThis = thisSiteArr[j];
            var dateThis = thisDateArr[j];
            var lineThis = siteThis + '　' + urlThis;

            var $newTable = $('<table>').attr('width', '100%');
            var $newTr = $('<tr>');
            var $newTd = $('<td>').attr('width', '85%').css('margin', '0 auto');
            $newTd.append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlNum' + i + '_' + j).text((j + 1) + ': ')));
            $newTd.append($('<a>').attr('href', urlThis).attr('target', '_blank').append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlLine' + i + '_' + j).text(lineThis))));
            $newTd.append($('<br>'));
            $newTd.append($('<font>').attr('size', '1.8').append($('<span>').addClass('alignright').attr('id', 'm-urlDateLine' + i + '_' + j).text(dateThis)));
            $newTd.append($('<br>'));
            $newTd.append($('<br>'));
            $newTr.append($newTd);
            $newTable.append($newTr);

            $('#m-urlTable' + i).prepend($newTable);
          } //URLの一覧を追加の終わり

          //報告ずみURLの一覧を追加
          for (var j = 0; j < urlFinNum; j++) {
            var finThis = thisFinArr[j];
            var siteThis = thisFinSiteArr[j];
            var finDateThis = thisFinDateArr[j];
            var m_finRep = [];

            for (var l = 0; l < thisFinArr.length; l++) {
              if (items.m_FinSiteArr[i][j] === thisSiteArr[i][l]) {
                m_finRep.push(finThis);
              }
            }

            var $newTable = $('<table>').attr('width', '100%');
            var $newTr = $('<tr>');
            var $newTd = $('<td>').attr('width', '85%').css('margin', '0 auto');
            $newTd.append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlFinNum' + i + '_' + j).text((j + 1) + ': ')));
            $newTd.append($('<a>').attr('href', finThis).attr('target', '_blank').append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlFinLine' + i + '_' + j).text(finThis))));
            $newTd.append($('<br>'));
            $newTd.append($('<font>').attr('size', '1.8').append($('<span>').addClass('alignright').attr('id', 'm-finNumLine' + i + '_' + j).append(finDateThis + '　by ').append($('<strong>').append($('<a>').attr('href', finThis).attr('target', '_blank').text(siteThis)))));
            $newTd.append($('<br>'));
            $newTd.append($('<br>'));
            $newTr.append($newTd);
            $newTable.append($newTr);

            $('#m-finTable' + i).prepend($newTable);
          }
          //報告ずみURLの一覧を追加の終わり
          //スクロールバーのデザイン
          // Create object for custom scrollbar settings
          var csObj = new Object();
          csObj.theme = "dark";

          // Set custom scrollbar to URL and Finished URL tables
          $("#m-urlTable" + i).mCustomScrollbar(csObj);
          $("#m-finTable" + i).mCustomScrollbar(csObj);

          // Add clear button to URL box
          var clearButtonHtml = '<center><input id="clear_m_Arr' + i + '" type="submit" value="' + str_url_clear + '" style="background-color:#999; color:#fff;"/><br/><br/></font></center>';
          $("#m-urlBox" + i).append(clearButtonHtml);
          var copyButtonHtml = '<center><input id="copy_m_Arr' + i + '" type="submit" value="' + str_url_copy + '" style="background-color:#111; color:#fff;"/><br/><br/></font></center>';
          $("#m-urlBox" + i).append(copyButtonHtml);

          // Add click event listener to clear button

          $("#copy_m_Arr" + i).click(function () {
            var mode = $(this).attr("id").replace("copy_m_Arr", "");
            var Arr = items['m_Arr' + mode];
            ArrString = "";
            for (var i = 0; i < Arr.length; i++) {
              ArrString = ArrString + Arr[i] + "\n";
            }
            const textToCopy = ArrString;
            navigator.clipboard.writeText(textToCopy)
              .then(() => {
                console.log(`Copied "${textToCopy}" to clipboard successfully.`);
              })
              .catch((error) => {
                console.error(`Failed to copy "${textToCopy}" to clipboard: ${error}`);
              });
            alert("URL一覧をクリップボードにコピーしました。");
          });
          $("#clear_m_Arr" + i).click(function () {
            if (window.confirm("この項目の未報告URLをすべて削除しますか？")) {
              // Create object for storage keys to be deleted
              var del = {};
              var mode = $(this).attr("id").replace("clear_m_Arr", "");
              del["m_Arr" + mode] = [];
              del["m_DateArr" + mode] = [];
              del["m_SiteArr" + mode] = [];

              // Delete storage keys and reload page
              chrome.storage.local.set(del, function () {
                location.reload();
              });

              alert("この項目の未報告URLをすべて削除しました。");
            } else {}
          });
        } //表示がONになっているか判定の終わり			
      } //報告履歴一覧生成の終わり
    }

    //基本設定の保存・更新ボタンにクリックイベントを設定
    $('#m_save_setting').click(function () {
      var m_name = $('#m-name').val();
      var m_family = $('#m-family').val();
      var m_company = $('#m-company').val();
      var m_email = $('#m-email').val();
      var m_statement1 = $('#m-statement1').prop('checked');
      var m_statement2 = $('#m-statement2').prop('checked');
      var m_statement3 = $('#m-statement3').prop('checked');
      //console.log(account_name);
      if (m_name == "" || m_name == str_taro || m_family == "" || m_family == str_yamada || m_company == m_str_company || m_email == "" || m_statement1 !== true || m_statement2 !== true || m_statement3 !== true) {
        alert(str_al_save_new);
      } else {
        var obj = new Object();
        obj['m_name'] = m_name;
        obj['m_family'] = m_family;
        obj['m_company'] = m_company;
        obj['m_email'] = m_email;
        obj['slyr_mode'] = "murahachi";
        chrome.storage.local.set(obj, function () {});
        location.reload();
        alert(str_saved);
      }
    });
    //報告内容の保存・更新ボタンにクリックイベントを設定
    for (i = 0; i < items.m_repNum; i++) {
      $('#m-save' + i).click(m_save);
    }
    $('#m-save_new').click(function () {
      chrome.storage.local.get(function (items) {
        const m_report_input_id = "#m-report" + num + "_input";
        const m_original_id = "#m-original" + num;
        const m_infringement_id = "#m-infringement" + num;
        const m_query_id = "#m-query" + num;

        const m_report = $(m_report_input_id).val();
        const m_infringement = $(m_infringement_id).val();
        const m_original = $(m_original_id).val();
        const m_query = $(m_query_id).val();
        const m_holder = $("#m-holder" + num).val();

        //正しく入力されているか判定
        const m_repNew = m_report;
        const m_origNew = m_original;
        const m_infNew = m_infringement;
        const m_queryNew = m_query;
        const m_holdNew = m_holder;

        //URL欄にURLが記入されているかどうか判定
        var urls = m_infNew.split("\n");
        for (i = 0; i < urls.length; i++) {
          if (urls[i].indexOf('http://') == -1 && urls[i].indexOf('https://') == -1) {
            var notURL = true;
          }
          if (urls[i].indexOf(' ') !== -1 || urls[i].indexOf('　') !== -1) {
            var notURL = true;
          }
        }
        //入力内容に不備がないか判定
        if (m_repNew === m_str_ex1 || m_repNew === "" || m_origNew === m_str_ex2 || m_origNew === "" || m_infNew === m_str_ex3 || m_infNew === "" || m_queryNew === m_str_ex4 || m_queryNew === "" || m_holdNew === "" || m_holdNew === str_holder || m_holdNew === null || m_holdNew === undefined || notURL === true) {
          alert(str_al_save_new);
          if (notURL === true) {
            alert("「オリジナル作品のURL」は1行に1件、「http://」または「https://」からはじまるURLのみを入力してください。");
          }
        } else {
          var obj = new Object();
          obj['m_report' + num] = m_repNew;
          obj['m_hide_pop' + num] = null;
          obj['m_hide_his' + num] = null;
          obj['m_original' + num] = m_origNew;
          obj['m_infringement' + num] = m_infNew;
          obj['m_holder' + num] = m_holdNew;
          obj['m_query' + num] = m_queryNew;
          obj['m_Arr' + num] = [];
          obj['m_SiteArr' + num] = [];
          obj['m_DateArr' + num] = [];
          obj['m_FinArr' + num] = [];
          obj['m_FinSiteArr' + num] = [];
          obj['m_FinDateArr' + num] = [];
          obj['m_mode'] = num;
          obj['slyr_mode'] = "murahachi";
          obj['m_bar'] = "on";
          chrome.storage.local.set(obj, function (items) {});
          repCounter();
          showSetting();
          showReports();
          alert(str_saved);
          location.reload();
        }

      });
    });
    //記入例の表示/非表示を管理
    $('#m-name').focus(function () {
      if ($('#m-name').val() == str_taro) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $('#m-name').blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(str_taro);
    });
    $('#m-family').focus(function () {
      if ($('#m-family').val() == str_yamada) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $('#m-family').blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(str_yamada);
    });
    $('[name=holder]').focus(function () {
      if ($(this).val() === str_holder) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $('[name=holder]').blur(function () {
      if ($(this).val() === '')
        $(this).css({
          color: '#999'
        }).val(str_holder);
    });
    $('#m-company').focus(function () {
      if ($('#m-company').val() == m_str_company) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    //	    $('#m-company').blur(function(){
    //			if ($(this).val() == '')
    //			$(this).css({color:'#999'}).val(str_company);
    //			});
    var m_report_input_id = "#m-report" + num + "_input";
    var m_original_id = "#m-original" + num;
    var m_infringement_id = "#m-infringement" + num;
    var m_query_id = "#m-query" + num;
    var m_id_all = m_report_input_id + ", " + m_original_id + ", " + m_infringement_id + ", " + m_query_id;
    $(m_id_all).css('color', '#999');
    $(m_report_input_id).focus(function () {
      if ($(m_report_input_id).val() == m_str_ex1) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_report_input_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex1);
    });
    $(m_original_id).focus(function () {
      if ($(m_original_id).val() == m_str_ex2) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_original_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex2);
    });
    $(m_infringement_id).focus(function () {
      if ($(m_infringement_id).val() == m_str_ex3) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_infringement_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex3);
    });
    $(m_query_id).focus(function () {
      if ($(m_query_id).val() == m_str_ex4) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_query_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex4);
    });

    //トグルを設定
    $("#m-acMenu dt, #m-hisMenu dt").on("click", function () {
      $(this).next('dd').slideToggle("fast");
      var contents = $(this).next('dd');
      $('dd').not(contents).slideUp("fast");
    });
    $('.m-hisBoxMenu dt, .m-finBoxMenu dt, .m-domBoxMenu dt').unbind('click');
    $(".m-hisBoxMenu dt, .m-finBoxMenu dt, .m-domBoxMenu dt").on("click", function () {
      $(this).next('dd').slideToggle("fast");
      var contents = $(this).next('dd');
      $('.m-hisBoxMenu dd, .m-finBoxMenu dd, .m-domBoxMenu dd').not(contents).slideUp("fast");
    });
    $('.closure').unbind('click');
    $(".closure").on("click", function () {
      $(this).closest('dd').slideToggle("fast");
    });

    $('#m-main').append('<font size="-1"><br/><center><span>※侵害サイトの検索・報告は<strong>ウィンドウ右上のアイコン<img src=\"images/ccslyrt_16.png\" width=\"24\"></strong>から行えます。<br/><br/>※報告リストへのURL追加用ボタンは、「基本設定」と「報告内容」記入後に</br><strong>各ページの最上部</strong>に表示されます。<br/>まずはツールアイコンからGoogle検索を行ってみてください。<br/></br><font size=\"3\"><strong>著作権侵害にあたらない例を通報しないよう十分ご注意ください。</strong></font></br>たとえば、Twitter・Facebook・Pixivなど</br>SNSの公式ウィジェットを使用した作品の転載（埋め込み）は</br>利用規約によって認められており、合法な引用の要件を満たさなくても</br>著作権侵害とはなりません。</br></br>developed by <a href=\"https://twitter.com/nakashima723\">nakashima723</a> since 2015</font><br/><font size=\"-2\">不具合・ご要望などありましたら、上記アカウントまたは以下のアドレスまでご連絡ください。</font><br/><a href=\"mailto:yokoshima723@gmail.com\">yokoshima723@gmail.com</a></span></center></font>');

  }); //chromestorageの終わり
} //showSlyrの終わり
showSlyr();
//
$(function () {
  $("#tabMenu li a").on("click", function () {
    $("#tabBoxes div").hide();
    $($(this).attr("href")).fadeToggle();
    $($(this).attr("href")).empty();
    showSlyr();
  });
  return false;
});

//ムラハチ重点のとき、ムラハチの画面を表示
chrome.storage.local.get(function (items) {
  if (items.slyr_mode === "murahachi") {
    $('#tabMenu li a').eq(1).trigger("click");
  }
});
$(function () {
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace == "local") {
      location.reload();
    }
  });
});

var obj = {};
