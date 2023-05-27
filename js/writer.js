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
  var urlArr = items['urlArr${mode}'];
  if (setting == undefined || report == undefined) {
    alert(al_setting);
  }
  if (urlArr.length == 0) {
    alert('「${mode+1}: ${items['report${mode}']}」について、報告対象となるURLがありません。\n\n無断転載スレイヤーを使用する場合は画面右上アイコンの各項目から侵害ツイートを検索して、リストに追加してください。');
  }

  if (mode !== undefined && setting !== undefined && report !== undefined && mode !== "disabled" && urlArr.length !== 0) {
    const owner_type = items['owner_type${mode}'];
    var url = location.href,
      lang = "ja",
      front = "https://help.twitter.com/",
      back = "/forms/ipi/dmca",
      mergedURL = front + lang + back;
    if (url === "https://help.twitter.com/forms/dmca" || url === mergedURL) {
      if (owner_type === undefined || owner_type === "" || owner_type === "owner") {
        var end = "/copyright-owner",
          mergedURL = front + lang + back + end;
        window.location.href = mergedURL;
      } else {
        var end = "/authorized-rep",
          mergedURL = front + lang + back + end;
        window.location.href = mergedURL;
      }
    } else {}
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
        var type = artType.slice(0, 1);
        var origLine = items["tweet_image_original" + mode];
        var urlLine = items["tweet_url_original" + mode];
        var infLine = items["tweet_image_infringement" + mode];
        $("input").each(function () {
          var selector = $(this).attr('name');
          if (selector === "acknowledgement") $(this).prop('checked', true);
          if (selector === "good-faith-belief") $(this).prop('checked', true);
          if (selector === "authority-to-act") $(this).prop('checked', true);
          if (selector === "signature") $(this).val(items.fullname);
          var name = selector.split("@"),
            name = name[1];
          if (name === "Content_Owner_Name__c") $(this).val(owner_name);
          if (name === "Form_Name__c") $(this).val(items.fullname);
          if (name === "company") $(this).val(items.company);
          if (name === "jobTitle") $(this).val(items.job);
          if (name === "streetAddress") $(this).val(items.address);
          if (name === "city") $(this).val(items.city);
          if (name === "state") $(this).val(items.state);
          if (name === "postalCode") $(this).val(items.postal);
          if (name === "Form_number__c") $(this).val(items.phone_number);
          if (name === "faxNumber") $(this).val(items.faxnumber);
          if (name === "Type_of_Issue__c") {
            if ($(this).val() === "Twitter") $(this).prop('checked', true);
          }
          if (name === "type") {
            if ($(this).val() === "Text") {
              if (type === "t") $(this).prop('checked', true);
            }
            if ($(this).val() === "Image/Photograph") {
              if (type === "i") $(this).prop('checked', true);
            }
            if ($(this).val() === "Video/Audiovisual Recording") {
              if (type === "m") $(this).prop('checked', true);
            }
          }
          if (name === "originalWork[0].value") $(this).val(urlLine);
        });
        $("select").each(function () {
          var test = $(this).attr('name');
          if (test) {
            var name = test.split("@"),
              name = name[1];
          }
          if (name === "country") {
            $(this).val("JP");
            $(this).next().find("button").text("日本");
          }
        });
        $("textarea").each(function () {
          var test = $(this).attr('name'),
            name = test.split("@"),
            name = name[1];
          console.log(name);
          if (name === "DescriptionText") $(this).val(origLine);
          if (name === "describeInfringement") $(this).val(infLine);
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
              $(this).val(urlArr[0]);
              console.log(urlArr[0]);
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
        $('#submit_button').click(function () {
          var obj = {};
          var d = new Date();
          d = d.toLocaleString();
          var date = d.slice(0, -3);
          for (j = 0; j < urlFinArrNow.length; j++) {
            urlFinDateArr.push(date);
          }
          obj['urlArr${mode}'] = items['urlArr${mode}'];
          obj['urlDateArr${mode}'] = items['urlDateArr${mode}'];
          obj['urlFinArr${mode}'] = items['urlFinArr${mode}'];
          obj['urlFinDateArr${mode}'] = items['urlFinDateArr${mode}'];
          obj['accNameArr${mode}'] = items['accNameArr${mode}'];
          chrome.storage.local.set(obj, function (items) {});
          if (urlArr.length !== 0) {
            alert(urlFinArrNow.length + "件のURLを送信し、報告ずみURLとして記録しました。\n\n未報告のURLは残り" + urlArr.length + "件です。\n\n送信後に表示されたページから戻ると、ひきつづき入力できます。");
          } else if (urlArr.length == 0) {
            alert(urlFinArrNow.length + "件のURLを送信し、報告ずみURLとして記録しました。\n\n未報告のURLはありません。\n\n新たに追加するときは、右上のアイコンのメニューを経由してください。");
          }
          //宣誓欄
        });
        setTimeout(function () {
          footerStart("#item");
        }, 1800);
      }, 1500);
    });
  }
});
