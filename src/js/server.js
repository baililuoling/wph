$(function(){
	// 免登录
	$.ajax({
		url:"./server.php",
		success:function(data){
			if(data=="1"){
				$('.weidenglu').html("");
				$('.yidenglu').css({display:"block"})
				.children('.us').html(getCookie('username'))
			}
		}
	})
	function getCookie(key){
		var str=document.cookie;
		var arr=str.split("; ");
		for(var i=0;i<arr.length;i++){
			var narr=arr[i].split("=");
			if(narr[0]==key){
				return narr[1];
			}
		}
	}
	// 列表详情
	var flag = true;//判断用户是否输入完成,默认是完成的
	$('.txt')[0].addEventListener('compositionstart',function(){
		flag = false;
	})
	$('.txt')[0].addEventListener('compositionend',function(){
		flag = true;
	})
	$('.txt').on('input',function(){
		setTimeout(function(){
			if(flag){
				var keyword = $('.txt').val();//输入的关键字
				$.ajax({
					dataType:'jsonp',
					url:'https://category.vip.com/ajax/getSuggest.php',
					// data:'callback=searchSuggestions&keyword=%E9%9E%8B&_=1576070237685',
					data:{
						jsonp:"searchSuggestions",
						keyword:keyword
					},
					success:function(data){
						var result = data.data;//是一个数组
						console.log(data.data)
						var str = "";
						result.forEach(function(value){
							str+="<li>"+value.word+"</li>";
						})
						$('.sea ul').html(str);
					}
				})
			}
		},0)
	})
})