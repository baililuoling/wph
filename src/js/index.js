$(function(){
	// 右侧窗口移入移出
	$('.fix_r > a').on('mouseenter',function(){
		$(this).children('span').animate({left:-116});
	})
	$('.fix_r > a').on('mouseleave',function(){
		$(this).children('span').animate({left:0});
	})
	// 右侧购物袋窗口移出
	$('.f-cartlist')[0].flag=0;
	$('.f-cart').on('click',function(){
		if($('.f-cartlist')[0].flag==0){
			$('.f-cartlist').animate({right:36});
			$('.f-cartlist')[0].flag=1;
		}else{
			$('.f-cartlist').animate({right:-240});
			$('.f-cartlist')[0].flag=0;
		}
	})
	// 楼层跳跃
	for(var i=0;i<$('.fix_nav ul li').length;i++){
		$('.fix_nav ul li')[i].index=i;
		$('.fix_nav ul li')[i].onclick=function(){
			$(window).scrollTop($('.market').eq(this.index).offset().top)
		}
	}
	$(window).on("scroll",function(){
		for(var i=0;i<$('.market').length;i++){
			if($(window).scrollTop()>=$('.market').eq(i).offset().top&&(i==$('.market').length-1||$(window).scrollTop()<$('.market').eq(i+1).offset().top)){
				$('.fix_nav ul li').eq(i).children('a').addClass("pickc").siblings().removeClass("pickc")
				$('.fix_nav ul li').eq(i).siblings().children('a').removeClass("pickc")
			}
		}
		// 左侧导航定位
		if($(window).scrollTop()>=174){
			$('.fix_l').css({
				position:'fixed',
				top:0
			})
		}else{
			$('.fix_l').css({
				position:'absolute',
				top:174
			})
		}
		// 右侧导航显隐
		if($(window).scrollTop()>=$('.market').eq(0).offset().top){
			$('.fix_nav').css({display:'block'})
		}else{
			$('.fix_nav').css({display:'none'})
		}
	})
})