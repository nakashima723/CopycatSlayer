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
		 if(items.ver160_g === undefined){
	 alert("【ver.1.60】自動入力の方式が変更になりました。\nクリップボードとペースト機能を利用するため、完全に自動で空欄が埋まることはなくなります。\n\n詳細は、次に表示される通知をよく確認してください。")
	 	 var obj = {};
          obj['ver160_g'] = true;
          chrome.storage.local.set(obj, function (items) {});
		 }
        alert("「" + num + ": " + thisTitle + "」について、" + urlNum + "件のURLを入力します。\n\n空のテキスト入力欄をクリックすると、それぞれの欄に対応したデータが【クリップボードに入力】されます。そのままペースト（Ctrl+Vなど）の操作を行って、順に空欄を埋めてください。\n\n・今あるクリップボードの内容を消したくない場合は、入力を中止してください。\n・ラジオボタンや宣誓のチェックボックス、reCAPCHAは手動で入力する必要があることに注意してください。");

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
		
		$(document).ready(function() {
    $('button').prop('disabled', false);
	$(document).on('click', 'button', function() {
		var index = $('button').index(this) + 1;
		if(index === 5) {
			var mode = items.m_mode
			var thisArr = items['m_Arr' + mode];
			var thisSiteArr = items['m_SiteArr' + mode];
			var thisDateArr = items['m_DateArr' + mode];
			var thisFinArr = items['m_FinArr' + mode];
			var thisFinSiteArr = items['m_FinSiteArr' + mode];
			var thisFinDateArr = items['m_FinDateArr' + mode];
			var thisTitle = items['m_report' + mode];
			var num = mode + 1;
			var urlNum = thisArr.length;
			if (urlNum > 1000) {
			  urlNum = 1000;
			}
			for (i = 0; i < urlNum; i++) {
			  thisFinArr.push(thisArr[i]);
			  thisFinSiteArr.push(thisSiteArr[i]);
			}
			thisArr.splice(0, urlNum);
			thisSiteArr.splice(0, urlNum);			
          var obj = {};
          var date = new Date();
          date = date.toLocaleString();
          for (i = 0; i < urlNum; i++) {
            thisFinDateArr.push(date);
          }
          thisDateArr.splice(0, urlNum);
          obj['m_Arr' + mode] = thisArr;
          obj['m_DateArr' + mode] = thisDateArr;
          obj['m_SiteArr' + mode] = thisSiteArr;
          obj['m_FinArr' + mode] = thisFinArr;
          obj['m_FinDateArr' + mode] = thisFinDateArr;
          obj['m_FinSiteArr' + mode] = thisFinSiteArr;
          chrome.storage.local.set(obj, function (items) {});
          alert("「" + num + ": " + thisTitle + "」について、" + urlNum + "件のURLを送信し、報告ずみURLとして記録しました。");
		}
	});
    $('button').prop('disabled', true);
		});

      function copyToClipboard(textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log('「' + textToCopy + '」をクリップボードにコピーしました');
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
      }
      $(function () {
        $('input').eq(1).on('click', function () {
          copyToClipboard(items.m_name);
        });
        $('input').eq(2).on('click', function () {
          copyToClipboard(items.m_family)
        });
        $('input').eq(3).on('click', function () {
          copyToClipboard(items.m_company)
        });
        $('input').eq(4).on('click', function () {
          copyToClipboard(items.email)
        });
        $('input').eq(5).on('click', function () {
          copyToClipboard(fullname)
        });
        $('textarea').eq(0).on('click', function () {
          copyToClipboard(original);
        });
        $('textarea').eq(1).on('click', function () {
          copyToClipboard(infringement);
        });
        $('textarea').eq(2).on('click', function () {
          copyToClipboard(url);
        });
        // $('#add-group-link').trigger("click");
      });
    }); //setTimeoutの終わり
  } //未報告URLが存在する場合の終わり
});
