chrome.storage.local.get(function(items) {
var mode = items.m_mode
eval("var thisArr = items.m_Arr" + mode + ";");
eval("var thisSiteArr = items.m_SiteArr" + mode + ";");
eval("var thisDateArr = items.m_DateArr" + mode + ";");
eval("var thisTitle = items.m_report" + mode + ";");
var num = mode + 1;
var urlNum = thisArr.length;
//未報告URLが存在しない場合
if(urlNum === 0 || urlNum === undefined){	
  alert("「" + num + ": " + thisTitle + "」のリストに未報告のURLはありません。\n\nムラハチ for Googleを使用するには、ブラウザ右上のアイコンから「検索」や「報告」を行ってください。");
	}
//未報告URLが存在する場合
	else {
var footerStart = function(selector){
    $('html,body').animate({scrollTop: $(selector).offset().top},'fast');
}
$("body").append("<span id='item'></span>");
$(function(){
    setTimeout(function(){
var date = new Date();
var month = date.getMonth() + 1,
	day = date.getDate();
if (month<10){ month = "0" + month;}
if (day<10){ day = "0" + day;}
	date = month + "/" + day + "/" + date.getFullYear();
var fullname = items.m_family + " " + items.m_name;
	 for (var i = 0; i < thisArr.length; i ++) {
 		 var url = $('[name=infringing-urls0]').val();
		  url = url + thisArr[i] + "\n";
		  $('[name=infringing-urls0]').val(url);
			}
	 eval("var infringement = items.m_infringement" + mode + ";");
	 eval("var original = items.m_original" + mode + ";");
	 eval("var holder = items.m_holder" + mode + ";");
  $(function(){
	  $('material-checkbox').each(function(index) {
  setTimeout(function(){
    $(this).attr('aria-checked', true);
  }.bind(this), index * 1000);
});
  　　$('.form-title').prepend("<button id=\"test\">test</button>");
	  $('#test').on('click', function() {
    $('input[type="text"]').first().val("test");
		  document.execCommand("paste");
  });
  　　$('[name=first-name]').val(items.m_name);
  　　$('[name=last-name]').val(items.m_family);
  　　$('[name=company-name]').val(items.m_company);
  　　$('[name=email]').val(items.m_email);
  　　$('[name=country-code]').val("JP");
  　　$('[name=cr-work-desc0]').val(original);
  　　$('[name=cr-work-urls0]').val(infringement);	 
	 if(holder === "self" || holder === undefined){
		 $('[name=confirm-self-cr-holder]').prop('checked',true);		 
  　    　$('[name=cr-holder]').val("self");
	  } else{
  　　$('[name=cr-holder]').val(holder);
	  }
  　　$('[name=agree1]').prop('checked',true);
  　　$('[name=agree2]').prop('checked',true);
  　　$('[name=agree5]').prop('checked',true);
  　　$('[name=signature-date]').val(date);
  　　$('[name=signature]').val(fullname);
  　　$('#add-group-link').click(function(){
	  var href = jQuery(this).attr("href");
	  location.href = href;
  		});	
var mode = items.m_mode
eval("var thisArr = items.m_Arr" + mode + ";");
eval("var thisSiteArr = items.m_SiteArr" + mode + ";");
eval("var thisDateArr = items.m_DateArr" + mode + ";");
eval("var thisFinArr = items.m_FinArr" + mode + ";");
eval("var thisFinSiteArr = items.m_FinSiteArr" + mode + ";");
eval("var thisFinDateArr = items.m_FinDateArr" + mode + ";");
eval("var thisTitle = items.m_report" + mode + ";");
var num = mode + 1;
var urlNum = thisArr.length;
if(urlNum > 1000){
	urlNum = 1000;
	}
		for(i=0; i<urlNum; i++){
			thisFinArr.push(thisArr[i]);
			thisFinSiteArr.push(thisSiteArr[i]);
			}
			thisArr.splice(0,urlNum);
			thisSiteArr.splice(0,urlNum);
	  $('input[type="submit"]').click(function(){
		var obj = {};
		var date = new Date();
		date = date.toLocaleString();
		for(i=0; i<urlNum; i++){
			thisFinDateArr.push(date);
			}
			thisDateArr.splice(0,urlNum);
		eval("obj[\'m_Arr" + mode + "\'] = thisArr;");
		eval("obj[\'m_DateArr" + mode + "\'] = thisDateArr;");
		eval("obj[\'m_SiteArr" + mode + "\'] = thisSiteArr;");
		eval("obj[\'m_FinArr" + mode + "\'] = thisFinArr;");
		eval("obj[\'m_FinDateArr" + mode + "\'] = thisFinDateArr;");
		eval("obj[\'m_FinSiteArr" + mode + "\'] = thisFinSiteArr;");
		chrome.storage.local.set(obj,function(items) {});
		   alert("「" + num + ": " + thisTitle + "」について、" + urlNum + "件のURLを送信し、報告ずみURLとして記録しました。");
		  });
	  alert("「" + num + ": " + thisTitle + "」について、" + urlNum + "件のURLを入力します。\n\n記入内容を確認し、ページ末尾のチェックボックス（reCAPCHA）にチェックを入れてから、送信ボタンを押してください。");
// $('#add-group-link').trigger("click");
	});
	  if(items.m_author == "attoney"){
	 setTimeout(function(){
			  footerStart("#dmca");
				},500);
		 }else{
	    setTimeout(function(){
		footerStart("#item");
		},500);
				 }
	  },200);
	});//setTimeoutの終わり
  }//未報告URLが存在する場合の終わり
});