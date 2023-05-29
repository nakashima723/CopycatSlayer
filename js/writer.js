var al_setting = "無断転載スレイヤーを使用するには、画面右上のアイコンのポップアップウィンドウから「基本設定」と「報告内容」を設定してください。";
var footerStart = function (selector) {
  $('html,body').animate({
    scrollTop: $(selector).offset().top
  }, 'fast');
}
$("body").append("<span id='item'></span>");
var urlFinArrNow = [];
chrome.storage.local.get(function (items) {
  var mode = items.mode;
  var setting = items.fullname;
  var report = items.report0;
  var urlArr = items[`urlArr${mode}`];
  if (setting == undefined || report == undefined) {
    alert(al_setting);
  }
  if (urlArr.length == 0) {
    alert(`「${mode+1}: ${items['report' + mode]}」について、報告対象となるURLがありません。\n\n無断転載スレイヤーを使用する場合は画面右上アイコンの各項目から侵害ツイートを検索して、リストに追加してください。`);
  }

  if (mode !== undefined && setting !== undefined && report !== undefined && mode !== "disabled" && urlArr.length !== 0) {
    $(function () {
      setTimeout(function () {
        var owner_type = items["owner_type" + mode];
        var owner_name = items["owner_name" + mode];
        var urlArr = items["urlArr" + mode];
        var urlDateArr = items["urlDateArr" + mode];
        var urlFinArr = items["urlFinArr" + mode];
        var urlFinDateArr = items["urlFinDateArr" + mode];
        var accNameArr = items["accNameArr" + mode];
        var artType = items["art_type" + mode];
        var origLine = items["tweet_image_original" + mode];
        var urlLine = items["tweet_url_original" + mode];
        var infLine = items["tweet_image_infringement" + mode];
	  alert(`「${mode+1}: ${items['report' + mode]}」について、「${items['urlArr'+ mode].length}件」の未報告URLを入力します。\n\n空のテキスト入力欄をクリックすると、それぞれの欄に対応したデータが【クリップボードに入力】されます。そのままペースト（Ctrl+Vなど）の操作を行って、順に空欄を埋めてください。\n\n・今あるクリップボードの内容を消したくない場合は、入力を中止してください。\n・プルダウンメニュー（国の選択）やラジオボタン、宣誓のチェックボックスは手動で入力する必要があることに注意してください。`);
        function inputData(element, textToInput) {
          $(element).on('click', function () {
             $(this).val('テスト');
          });
        }		  
		function copyToClipboard(element, textToCopy) {
          $(element).on('click', function () {
            navigator.clipboard.writeText(textToCopy)
              .then(() => {
                console.log('「' + textToCopy + '」をクリップボードにコピーしました');
              })
              .catch(err => {
                console.error('Could not copy text: ', err);
              });
          });
        }
        $("input").each(function () {
          var selector = $(this).attr('name');
          //if (selector === "acknowledgement") $(this).prop('checked', true);
          //if (selector === "good-faith-belief") $(this).prop('checked', true);
          //if (selector === "authority-to-act") $(this).prop('checked', true);
          if (selector === "signature") copyToClipboard(this, items.fullname); //$(this).val(items.fullname);
          var name = selector.split("@"),
            name = name[1];
          if (name === "Content_Owner_Name__c") copyToClipboard(this, owner_name);
          if (name === "Form_Name__c") copyToClipboard(this, items.fullname);
          if (name === "company") copyToClipboard(this, items.company);
          if (name === "jobTitle") copyToClipboard(this, items.job);
          if (name === "streetAddress") copyToClipboard(this, items.address);
          if (name === "city") copyToClipboard(this, items.city);
          if (name === "state") copyToClipboard(this, items.state);
          if (name === "postalCode") copyToClipboard(this, items.postal);
          if (name === "Form_number__c") copyToClipboard(this, items.phone_number);
          if (name === "faxNumber") copyToClipboard(this, items.faxnumber);
          if (name === "Type_of_Issue__c") {
            if ($(this).val() === "Twitter") {} //$(this).prop('checked', true);
          }
          if (name === "type") {
            if ($(this).val() === "Text") {
              if (artType === "text") {}//$(this).prop('checked', true);
            }
            if ($(this).val() === "Image/Photograph") {
              if (artType === "image") {}//$(this).prop('checked', true);
            }
            if ($(this).val() === "Video/Audiovisual Recording") {
              if (artType === "movie") {}//$(this).prop('checked', true);
            }
          }
          if (name === "originalWork[0].value") copyToClipboard(this, urlLine);
        });
        $("select").each(function () {
          var test = $(this).attr('name');
          if (test) {
            var name = test.split("@"),
              name = name[1];
          }
          if (name === "country") {
            //$(this).val("JP");
            //$(this).next().find("button").text("日本");
          }
        });
        $("textarea").each(function () {
          var test = $(this).attr('name'),
            name = test.split("@"),
            name = name[1];
          if (name === "DescriptionText") copyToClipboard(this, origLine);
          if (name === "describeInfringement") copyToClipboard(this, infLine);
        });
        for (i = 1; i < urlArr.length; i++) {
          $(".Button-adornment").eq(1).trigger("click");
          if (i > 30) break;
        }
        for (i = 0; i < 30; i++) {
          if (urlArr[0] === undefined) break;
          var selector = "Infringing_Urls__c[" + i + "].value";
          var a = urlArr[0].split("/");
          var accName = a[3];
          $("input[type='text']").each(function () {
            var test = $(this).attr('name'),
              name = test.split("@"),
              name = name[1];
            if (name === selector) {
              copyToClipboard(this, urlArr[0]);
            }
          });
          urlFinArrNow.push(urlArr[0]);
          urlFinArr.push(urlArr[0]);
          accNameArr.push(accName);
          urlArr.splice(0, 1);
          urlDateArr.splice(0, 1);
        }
        $('#liability_disclaimer').prop("checked", true);
        $('#good_faith_disclaimer').prop("checked", true);
        $('#exact_match_input').val("この通知の情報は正確です。私は、著作権所有者の代理として行動する権限を持っていることが虚偽の場合は偽証罪に問われることを理解しています。");
        $('[type="submit"]').click(function () {
          var obj = {};
          var d = new Date();
          d = d.toLocaleString();
          var date = d.slice(0, -3);
          for (j = 0; j < urlFinArrNow.length; j++) {
            console.log(date);
            urlFinDateArr.push(date);
          }
          obj[`urlArr${mode}`] = urlArr;
          obj[`urlDateArr${mode}`] = urlDateArr;
          obj[`urlFinArr${mode}`] = urlFinArr;
          obj[`urlFinDateArr${mode}`] = urlFinDateArr;
          obj[`accNameArr${mode}`] = accNameArr;
          chrome.storage.local.set(obj, function (items) {});
          if (urlArr.length !== 0) {
            alert(urlFinArrNow.length + "件のURLを送信し、報告ずみURLとして記録しました。\n\n未報告のURLは残り" + urlArr.length + "件です。\n\n送信後に表示されたページから戻ると、ひきつづき入力できます。");
          } else if (urlArr.length == 0) {
            alert(urlFinArrNow.length + "件のURLを送信し、報告ずみURLとして記録しました。\n\n未報告のURLはありません。\n\n新たに追加するときは、右上のアイコンのメニューを経由してください。");
          }
          //宣誓欄
        });
      }, 2000);
    });
  }
});
