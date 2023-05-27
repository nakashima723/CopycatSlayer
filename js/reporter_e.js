$(function () {
  chrome.storage.local.get(function (items) {
    var reload = items.reload;
    if (reload !== true) {
      var obj0 = {};
      obj0.reload = true;
      chrome.storage.local.set(obj0, function (items) {});
      location.reload(true);
    }
    var mode = items.mode;
    var this_report = items[`report${mode}`];
    var modeNum = mode + 1;
    var pushText = "【リスト" + modeNum + ": " + this_report + "に追加】",
      delText = "【リスト" + modeNum + ": " + this_report + "から削除】";
    finText = "【リスト" + modeNum + ": " + this_report + "から報告ずみ】";
    if (mode !== undefined && mode !== "disabled") {
      //報告ボタンを追加
      var setReporter = function () {
        var url1 = window.location.href;
        if (url1 !== "https://mobile.twitter.com/" || url1 !== "https://twitter.com/") {
          $("a[href='https://help.twitter.com/using-twitter/how-to-tweet#source-labels']").each(function () {
            var nowArr = items["urlArr" + mode];
            var nowFinArr = items["urlFinArr" + mode];
            var judge1 = nowArr.indexOf(url1);
            var judge2 = nowFinArr.indexOf(url1);
            //		console.log(judge1 + " & " + judge2);
            if (judge1 !== -1 && judge2 == -1) {
              $(this).after('<strong><a class="reporter" style="cursor: hand; cursor:pointer; text-decoration:underline;">' + delText + '</a></strong>');
            } else if (judge1 == -1 && judge2 !== -1) {
              $(this).after('<strong><a class="reporter" style="cursor: hand; cursor:pointer; text-decoration:underline;">' + finText + '</a></strong>');
            } else {
              $(this).after('<strong><a class="reporter" style="cursor: hand; cursor:pointer; text-decoration:underline;">' + pushText + '</a></strong>');
            }
          });
        }
      }
      setReporter();
      //報告ボタンをクリックしたときの動作
      var setUrl = function () {
        $('a.reporter').click(function () {
          var urlArr = [];
          var urlDateArr = [];
          var d = new Date();
          d = d.toLocaleString();
          var date = d.slice(0, -3);
          var x = $('a.reporter').index(this);
          var url = window.location.href;
          console.log(url);
          var str_input = url + ' をリスト' + mode + 'に追加しました。',
            str_del = url + ' をリスト' + mode + 'から削除しました。',
            str_fin = "このURLは報告ずみです。";
          const {
            urlArr,
            urlFinArr,
            urlDateArr,
            urlFinDateArr
          } = items;
          const nowArr = urlArr[mode];
          const nowFinArr = urlFinArr[mode];
          const nowDateArr = urlDateArr[mode];
          const nowFinDateArr = urlFinDateArr[mode];
          //文字が「リストに追加」だった場合
          if ($(this).text() === pushText) {
            //文字列を変更
            $(this).text(delText);
            //過去すでに追加ずみかどうか判定
            //追加ずみではなかった場合
            var obj1 = {};
            nowArr.push(url);
            nowDateArr.push(date);
            obj1['urlArr' + mode] = nowArr;
            obj1['urlDateArr' + mode] = nowDateArr;
            chrome.storage.local.set(obj1, function (items) {});
            console.log(str_input);
            //文字が「リストから削除」だった場合、リストから抽出して削除
          } else if ($(this).text() === delText) {
            $(this).text(pushText);
            for (i = 0; i < nowArr.length; i++) {
              if (nowArr[i] == url) {
                nowArr.splice(i, 1);
                nowDateArr.splice(i, 1);
              }
            }
            const obj2 = {
              ['urlArr' + mode]: nowArr,
              ['urlDateArr' + mode]: nowDateArr,
            };
            chrome.storage.local.set(obj2, function (items) {});
            console.log(str_del);
            $(this).text(pushText);
          } else {
            alert(str_fin);
          }
        }); //$('a.reporter').click(function(){
      } //setUrl
      setUrl();
      //スクロール時に実行
      $(window).scroll(function () {
        $('a.reporter').remove();
        setReporter();
        setUrl();
      });
    }
  }); //一番外側のchrome.storage.getの終わり
}); //一番外側のfunctionの終わり
