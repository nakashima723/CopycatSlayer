$(function(){
	chrome.storage.local.get(function(items){
 var mode =items.mode;
 var modeNum = mode;
 var pushText = "【リスト" + modeNum + "に追加】",
	  delText = "【リスト" + modeNum + "から削除】";
	  finText = "【報告ずみ】";
 if (mode !== undefined && mode !== "disabled"){ 
//報告ボタンを追加
var setReporter = function() {
$('time').each(function(){
	var numP = $('time').index(this);
	var numA = $('a.reporter').length;
	if($(this).parent().nextAll("strong").children("a.reporter").length<1){
		var url1 = $(this).parent().prop('href');
//		console.log(url1);		
		var nowArr = items["urlArr" + mode];
		var nowFinArr = items["urlFinArr" + mode];
		var judge1 = nowArr.indexOf(url1);
		var judge2 = nowFinArr.indexOf(url1);
//		console.log(judge1 + " & " + judge2);
		if (judge1 !== -1 && judge2 == -1){			
	 	$(this).parent().after('<strong><a class="reporter">' + delText + '</a></strong>');
		}
		 else if (judge1 == -1 && judge2 !== -1){
	 　	$(this).parent().after('<strong><a class="reporter">' + finText + '</a></strong>');	
		} else{	
		$(this).parent().after('<strong><a class="reporter">' + pushText + '</a></strong>');
			}		
		}
	});
}
setReporter();
//報告ボタンをクリックしたときの動作
var setUrl = function(){
$('a.reporter').click(function(){
        var urlArr = [];
        var urlDateArr = [];
		var d = new Date();
		d = d.toLocaleString();
		var date = d.slice(0,-3);
		var x = $('a.reporter').index(this);
		var url = $('time').parent().eq(x).prop('href');
		var str_input = url + ' をリスト' + mode + 'に追加しました。',
			str_del = url + ' をリスト' + mode + 'から削除しました。',
			str_fin = "このURLは報告ずみです。";
		const nowArr = items[`urlArr${mode}`];
		const nowFinArr = items[`urlFinArr${mode}`];
		const nowDateArr = items[`urlDateArr${mode}`];
		const nowFinDateArr = items[`urlFinDateArr${mode}`];
		//文字が「リストに追加」だった場合
		if($(this).text() === pushText){
			//文字列を変更
			$(this).text(delText);			
		//過去すでに追加ずみかどうか判定
			//追加ずみではなかった場合
			var obj1 = {};
		   	nowArr.push(url);
		   	nowDateArr.push(date);
	obj1[`urlArr${mode}`] = nowArr;
	obj1[`urlDateArr${mode}`] = nowDateArr;
			chrome.storage.local.set(obj1,function(items){});
    	    console.log(str_input);
		//文字が「リストから削除」だった場合、リストから抽出して削除
		}else if ($(this).text() === delText){
			$(this).text(pushText);
			for(i = 0; i < nowArr.length; i++){
 				if(nowArr[i] == url){
				 nowArr.splice(i,1);
				 nowDateArr.splice(i,1);
					}
				}
const obj2 = {
  ['urlArr' + mode]: nowArr,
  ['urlDateArr' + mode]: nowDateArr
};
				chrome.storage.local.set(obj2,function(items){});
    	  	    console.log(str_del);
				$(this).text(pushText);
		}else{
			alert(str_fin);
		}
}); //$('a.reporter').click(function(){
}//setUrl
//読み込み時に実行
setUrl();
//スクロールするたびに更新
$(window).scroll(function () {
	$('a.reporter').unbind('click');
		setReporter();
		setUrl();
		});
 }
});//一番外側のchrome.storage.getの終わり
});//一番外側のfunctionの終わり