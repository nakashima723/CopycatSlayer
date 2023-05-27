chrome.storage.local.get(function (items) {
  console.log(items.slyr_mode);
});
var setHeight = function () {
  $('html,body').height(0);
}
var showOption = function () {
  chrome.storage.local.get(function (items) {
    //パクスレ表示部分	
    for (i = 0; i < items.repNum; i++) {
      var urlNum = items["urlArr" + i].length;
      var urlFinNum = items["urlFinArr" + i].length;
      var accSusNum = items["accSusArr" + i].length;
      var query = items["query" + i];
      var query_type;
      var artType = items["art_type" + i];
      if (artType === "image" + i || artType === undefined) {
        query_type = " filter:images -filter:videos -twipple&src=typd";
      } else if (artType === "movie" + i) {
        query_type = " filter:videos -filter:images -youtube -vine&src=typd";
      } else if (artType === "writing" + i) {
        query_type = " -filter:videos -filter:images&src=typd";
      }

      var hide_pop = items["hide_pop" + i];
      var query = encodeURIComponent(query);
      if (hide_pop !== true) {
        var data = items["report" + i];
        var repTitle = i + 1 + ": " + data;

        $('#acMenu').append('<dt><button style="margin-bottom: 10px" id="list' + i + '">' + repTitle + '</button></dt>');
        $('#acMenu').append('<dd id="form' + i + '"><span id="reported"><font size="-1">未報告： ' + urlNum + '件<br/>報告ずみ： ' + urlFinNum + '件</font><br /></span><center><input id="search' + i + '" type="submit" value="　検索　" style="margin:10 auto;" /><br /><input id="report' + i + '" type="submit" value="　報告　" style="background-color:#cc0000; color:#F5F5F5; border-color:#990000;"/><center></dd>');
        $('dl').css('margin', '10 auto 0 auto');
        $('#options').css('margin-bottom', '5px');

        if (urlNum === 0) {
          $('#report' + i).hide();
        }

        if (urlNum !== 0) {
          $('#list' + i).css({
            'background-color': '#cc0000',
            'color': '#F5F5F5'
          });
        }

        $('#search' + i).click(function () {
          var obj = {
            'mode': i
          };
          chrome.storage.local.set(obj, function () {});
          window.open("https://mobile.twitter.com/search?q=" + query + " -" + items.account_name + query_type + "&f=live");
        });

        $('#report' + i).click(function () {
          var obj = {
            'mode': i
          };
          chrome.storage.local.set(obj, function () {});
          console.log(obj['mode'] = i);
          window.open("https://support.twitter.com/forms/dmca");
        });

        $("#acMenu dt").eq(i).on("click", function () {
          var list = {
            'mode': i
          };
          chrome.storage.local.set(list, function () {});
        });

      }
    } //パクスレ表示部分	

    //ムラハチ表示部分	   
    for (i = 0; i < items.m_repNum; i++) {
      var m_Num = items["m_Arr" + i].length;
      var m_FinNum = items["m_FinArr" + i].length;
      var m_hide_pop = items["m_hide_pop" + i];
      if (m_hide_pop !== true) {
        var m_data = items['m_report' + i];
        var m_repTitle = (i + 1) + ": " + m_data;
        const mListButton = `<dt><button style="margin-bottom: 10px" id="m-list${i}">${m_repTitle}</button></dt>`;
        const mForm = `<dd id="m-form${i}"><span id="m-reported"><font size="-1">未報告： ${m_Num}件<br/>報告ずみ： ${m_FinNum}件</font><br /></span><center><input id="m-search${i}" type="submit" value="　検索　" style="margin:10 auto;" /><br /><input id="m-report${i}" type="submit" value="　報告　" style="background-color:#cc0000; color:#F5F5F5; border-color:#990000;" /><center></dd>`;
        $('#m-acMenu').append(mListButton, mForm);
        $('dl').css('margin', '10 auto 0 auto');
        $('#m-options').css('margin-bottom', '5px');
        if (m_Num == 0) {
          $(`#m-report${i}`).hide();
        }
        if (m_Num !== 0) {
          $('#m-list' + i).css({
            'background-color': '#cc0000',
            'color': '#F5F5F5'
          });
        }
        document.querySelector('#m-search' + i).addEventListener('click', function () {
          var obj = {};
          obj['m_bar'] = 'on';
          var mode = $(this).attr("id").replace("m-search", "")
          obj['m_mode'] = mode;
          chrome.storage.local.set(obj, function (items) {});
          var m_query = items["m_query" + mode],
            m_query = encodeURIComponent(m_query);
          window.open('https://www.google.co.jp/search?q=' + m_query);
        });
        $('#m-report' + i).click(function () {
          var obj = {};
          var mode = $(this).attr("id").replace("m-report", "");
          obj['m_mode'] = mode;
          chrome.storage.local.set(obj, function (items) {});
          window.open('https://www.google.com/webmasters/tools/dmca-notice', 'report');
        });

        $("#m-acMenu dt").eq(i).on("click", function () {
          var list = {};
          var mode = $("#m-acMenu dt").index(this);
          list['m_mode'] = mode;
          chrome.storage.local.set(list, function (items) {});
        });
      }
    } //ムラハチ表示部分	

    if (items.mode !== "disabled" && items.mode !== undefined) {
      $('#pakutwi').append('<center><font size="1em"><button id="disable" style="color:#fff; background-color:#777; margin:0 0 10 0;">リスト追加ボタンを非表示にする</button></font></center>');
    }
    if (items.fullname === undefined) {
      $("#pakutwi").prepend("<br />報告機能を有効にするには、住所・氏名などの基本設定を入力してください。<br />");
      $("#pakutwi h3, #disable").hide();
    }
    $('#pakutwi').append('<center><a href="options.html" target="options"><input type="button" id="options" value="報告内容を確認・編集" style="background-color:#222; color:#F5F5F5;"/></a><font size="1em"><button id="change-m" style="color:#fff; background-color:#cc0000;; margin: 10 auto;">ムラハチ for Google に切り替え</button></font></center>');
    $('#murahachi').append('<center><a href="options.html" target="options"><input type="button" id="m-options" value="報告内容を確認・編集" style="background-color:#222; color:#F5F5F5;"/></a><font size="1em"><button id="change-p" style="color:#fff; background-color:#00aced; margin: 10 auto; width: 240px ;">パクツイスレイヤーに切り替え</button></font></center>');
    //	  	$('#murahachi').hide();
    chrome.storage.local.get(function (items) {
      if (items.slyr_mode == "pakutwi" || items.slyr_mode == undefined) {
        $('#murahachi').hide();
      } else if (items.slyr_mode == "murahachi") {
        $('#pakutwi').hide();
        $('#murahachi').show();
      }
    });


    $("#acMenu dt, #m-acMenu dt").on("click", function () {
      $(this).next().slideToggle(180);
      var contents = $(this).next();
      $('dd').not(contents).slideUp(180);
      setTimeout(function () {
        setHeight();
      }, 120);
    });
    $('.closure').unbind('click');
    $(".closure").on("click", function () {
      $(this).closest('dd').slideToggle("fast");
      setHeight();
    });
    $("#disable").on("click", function () {
      $(this).parent().append('<br/><center><font size=\"2em\"><span id=\"txt_disabled\">「リストに追加」ボタンを非表示にし、自動書記機能を停止しました。<br/>ページを再読み込みすると<br/>反映されます。<br/><br/>再稼働させたいときは、このポップアップ・ウィンドウ内のいずれかの報告内容の項目をクリックしてください。</span></font></center>');
      $(this).hide();
      var obj = {};
      obj['mode'] = "disabled";
      chrome.storage.local.set(obj, function (items) {});
      setHeight();
    });

    $("#change-m").on("click", function () {
      $('#pakutwi').hide();
      var obj = {};
      obj['slyr_mode'] = "murahachi";
      chrome.storage.local.set(obj, function (items) {});
      setHeight();
      $('#murahachi').show();
    });

    $("#change-p").on("click", function () {
      $('#murahachi').hide();
      var obj = {};
      obj['slyr_mode'] = "pakutwi";
      chrome.storage.local.set(obj, function (items) {});
      setHeight();
      $('#pakutwi').show();
    });
  });
};

showOption();
setHeight();
