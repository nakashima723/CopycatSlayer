function setBar() {
  chrome.storage.local.get(function (items) {
    if (items.m_bar === "on" && items.m_report0 !== undefined && items.m_family !== undefined) {
      $("#matomeSiteHeaderArea, #topline, #siteHeader, #masthead-positioner").hide();
      $("html").prepend('<div id="slyr-overlay"><center><span id="slyr-before">このページのURLを、</span><form id="slyr-list"></form> <span id="slyr-after">のリストに </span><button id="slyr-add">追加</button></p><p style="margin-top:10px !important;">　<button id="ref-list" style="background-color:#f5f5f5 !important; color:#222 !important; font-size:16px !important; padding: 3px 10px !important; -webkit-border-radius: 3px !important;">リストを確認・編集</button>　　<button id="report-now">いますぐ報告</button><button id="slyr-hide" style="background-color:#f5f5f5 !important; color:#222 !important; font-size:20px !important; padding: 3px 8px !important; -webkit-border-radius: 3px; float:right;">×</button></font></center></div>');
      $('#slyr-list').append('<select id="mode-menu"></select>');
      $("html").css({
        'cssText': 'display:inline !important; padding-top:100px !important;'
      });
      $("#slyr-overlay").contents().css({
        'cssText': 'padding:0 !important; margin:0 !important;'
      });
      $("#slyr-list").css({
        'cssText': 'display:inline !important;'
      });
      $("#slyr-add, #ref-list, #report-now").css({
        'cssText': 'color:#222 !important; background-color:#f5f5f5 !important; font-size:14px !important; padding:3px 10px !important; -webkit-border-radius: 3px !important;'
      });
      $("#slyr-before, #slyr-after").css({
        'cssText': 'font-size:12px !important; color:#f5f5f5 !important;'
      });
      $("#slyr-overlay").css({
        'cssText': 'background-color:rgba(0, 0, 0, 0.9) !important; font-color:#f5f5f5 !important; display:inline !important; position:fixed !important; z-index:9999 !important; font-family:Lucida Grande,Hiragino Kaku Gothic ProN, Meiryo, sans-serif !important; font-size:1em !important; width:100% !important; height:100px !important; line-height:120% !important; padding-top:20px !important; overflow:scroll !important; overflow-x:hidden !important; top:0 !important; left:0 !important;'
      });
      $("#mode-menu").css({
        'cssText': 'font-size:16px !important; max-width:360px !important; padding: 3px 10px !important; display:inline !important;'
      });
      //		$( "#slyr-list", '#mode-menu', '#slyr-add').css({ 'font-family': 'Lucida Grande,Hiragino Kaku Gothic ProN, Meiryo, sans-serif', 'font-size':'1em', 'display':'inline', 'color':'#111'}) ;

      //報告内容の数を判定
      var length = Object.keys(items).length,
        m_target = "m_report",
        m_repArr = [];
      for (i = 0; i < length; i++) {
        var wordArr = Object.keys(items);
        var str = " " + wordArr[i];
        if (str.indexOf(" " + m_target) !== -1) {
          m_repArr.push(wordArr[i]);
        }
      }
      for (i = 0; i < m_repArr.length; i++) {
        var thisReport = items[`m_report${i}`];
        var thisNum = items[`m_Arr${i}`].length;
        thisReport = thisReport + " (" + thisNum + "件)";
        var num = i + 1;
        $('#mode-menu').append("<option value=" + i + " style=\"font-size:16px; font-family:Meiryo;\">" + num + ": " + thisReport + "</option>");
      }

      $("#report-now").click(function () {
        var url = "https://www.google.com/webmasters/tools/dmca-notice";
        window.open(url, "report");
      });

      $("#ref-list").click(function () {
        var url = chrome.extension.getURL("options.html");
        window.open(url, "options");
      });

      //バーの表示/非表示を切り替え
      $("#slyr-hide").click(function () {
        chrome.storage.local.get(function (items) {
          var bar_mode = new Object();
          bar_mode['m_bar'] = "off";
          chrome.storage.local.set(bar_mode, function (items) {
            alert("URL追加用バーの表示をOFFにしました。\n\n再表示させたい場合は、ブラウザ右上のツールアイコンから「検索」を行ってください。");
          });
          $("html").css('padding-top', '0px');
          $("#slyr-overlay").hide();
          return false;
        });
      });
      //プルダウンメニューの項目を作業中のものに自動変更
      var mode = items.m_mode;
      $('#mode-menu').val(mode);
		  console.log(mode);
      function setButton() {
        var mode = $('#mode-menu option:selected').val();
          mode = Number(mode);
        var obj = {};
        obj['m_mode'] = mode;
        chrome.storage.local.set(obj, function (items) {});
        var deleted = false;
		  var thisTitle = items[`m_reports${mode}`];
    var thisArr = items[`m_Arr${mode}`];      
    var thisSiteArr = items[`m_SiteArr${mode}`];
    var thisDateArr = items[`m_DateArr${mode}`];

        for (i = 0; i < thisArr.length; i++) {
          var url = location.href;
          if (thisArr[i] == url) {
            var deleted = true;
            $('#slyr-add').text('削除');
            $('#slyr-after').text('のリストから ');
          }
        }
        if (deleted !== true) {
          $('#slyr-add').text('追加');
          $('#slyr-after').text('のリストに ');
        }
      }
      setButton();
      $('#mode-menu').change(function () {
        setButton();
      });
      //すでに報告ずみの時、ボタンを非表示に
		var thisFinArr = items[`m_FinArr${mode}`];
      for (i = 0; i < thisFinArr.length; i++) {
        if (location.href == thisFinArr[i]) {
          $('#before').text('このURLは ');
          $('#slyr-after').text('のリストから報告ずみです。');
          $('#slyr-add').hide();
          break;
        }
      }

      //URLをリストに追加
      $("#slyr-add").click(function () {
        var url = location.href;
        var title = document.title;
        var date = new Date();
        var host = url.replace(/https?:\/\/([^\/]+).*/, "$1");
        var tree = host.split(".");
        var parts = tree.length;
        var domain;
        if (parts == 1) {
          alert("ドメイン名を取得できません。");
          return;
        } else if (parts == 2) {
          domain = host;
        } else if (tree[parts - 1].length >= 3) {
          domain = tree[parts - 2] + '.' + tree[parts - 1];
        } else if (tree[parts - 2].length == 2) {
          domain = tree[parts - 3] + '.' + tree[parts - 2] + '.' + tree[parts - 1];
        } else {
          domain = tree[parts - 2] + '.' + tree[parts - 1];;
        }
        var month = date.getMonth() + 1,
          day = date.getDate(),
          dateSign = date.getFullYear() + "年 " + month + "月" + day + "日 " + date.getHours() + "時" + date.getMinutes() + "分" + date.getSeconds() + "秒";
        if ($('#slyr-add').text() == "追加") {
          var mode = $('#mode-menu option:selected').val(),
            mode = Number(mode);
			var thisTitle = items[`m_report${mode}`];
          var thisArr = items["m_Arr" + mode];
          var thisSiteArr = items[`m_SiteArr${mode}`];
          var thisDateArr = items[`m_DateArr${mode}`];
          date = date.toLocaleString();
          thisArr.push(url);
          thisSiteArr.push(title);
          thisDateArr.push(date);
          var obj = {
            ["m_Arr" + mode]: thisArr,
            ["m_SiteArr" + mode]: thisSiteArr,
            ["m_DateArr" + mode]: thisDateArr
          };

          obj['m_mode'] = mode;
          chrome.storage.local.set(obj, function (items) {});
          $('#slyr-add').text('削除');
          $('#slyr-after').text('のリストから ');
          var num = mode + 1;
          alert("「" + num + ": " + thisTitle + "」のリストに、以下の情報を追加しました。\n\nページ名：" + title + "\n追加した日時：" + dateSign + "\nドメイン：" + domain + "\nURL：" + url);
        } else if ($('#slyr-add').text() == "削除") {
          var mode = $('#mode-menu option:selected').val(),
            mode = Number(mode);
			var thisTitle = items[`m_report${mode}`];
			var thisArr = items[`m_Arr${mode}`];
			var thisSiteArr = items[`m_SiteArr${mode}`];
			var thisDateArr = items[`m_DateArr${mode}`];
          for (i = 0; i < thisArr.length; i++) {
            if (thisArr[i] == url) {
              thisArr.splice(i, 1);
              thisSiteArr.splice(i, 1);
              thisDateArr.splice(i, 1);
            }
          }
          var obj = new Object();
obj[`m_Arr${mode}`] = thisArr;
obj[`m_SiteArr${mode}`] = thisSiteArr;
obj[`m_DateArr${mode}`] = thisDateArr;
          obj['m_mode'] = mode;
          chrome.storage.local.set(obj, function (items) {});
          var num = mode + 1;
          alert("「" + num + ": " + thisTitle + "」のリストから、以下の情報を削除しました。\n\nページ名：" + title + "\nドメイン：" + domain + "\nURL：" + url);
          $('#slyr-add').text('追加');
          $('#slyr-after').text('のリストに ');
        }
      });
    }
  });
}
setBar();
//変更があったとき、表示内容を更新
$(function () {
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace == "local") {
      $('#slyr-overlay').remove();
      $("html").css('padding-top', 0);
      setBar();
    }
  });
});
