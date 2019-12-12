(function(){
	var products = [
		{
			name:"3L家用IH加热触摸操控球釜智能电饭煲SF30HC849",
			pic:"./images/dianfanbao.jpg",
			price:'￥379',
		},
		{
			name:"斐乐2019秋季新款 男款系带休闲时尚潮流复古老爹鞋",
			pic:"./images/yundongxie.jpg",
			price:'￥379',
		},
		{
			name:"北欧风格客厅装饰品摆件大号白色鹿头顶含水晶球小号黑色鹿组合",
			pic:"./images/luzuhe.jpg",
			price:'￥147',
		}
	];
	class ShoppingCart{
		constructor(containerId,products){
			this.container=document.getElementById(containerId);
			this.products=products;
			this.cartProducts=this.getStorage()||[];
			this.shopList=document.createElement("table");
			this.cartList=document.createElement("table");
			this.container.appendChild(this.shopList);
			this.container.appendChild(this.cartList);
			
		}
		setStorage(json){
			localStorage.setItem("cart",JSON.stringify(json));
		}
		getStorage(){
			return JSON.parse(localStorage.getItem("cart"))||[];
		}
		init(){
			this.initShopList();
			if(this.getStorage().length>0){
				this.rendCartList();
			}
		}
		initShopList(){
			var str='<thead><tr><th>精选特卖</th><th></th><th>单价</th><th>操作</th></tr></thead>';
			str+="<tbody>";
			for(var i=0;i<this.products.length;i++){
				str+='<tr><td class="box" ><div class="small"><img src="'+this.products[i].pic+'"><div class="mask"><img src="'+this.products[i].pic+'"></div><div class="bg"></div></div><div class="big"><img src="'+this.products[i].pic+'" class="bigImg"></div></td><td>'+this.products[i].name+'</td><td>&nbsp;&nbsp;'+this.products[i].price+'</td><td><a href="javascript:;" class="addCart">加入购物车</a></td></tr>';
			}
			str+="</tbody>";
			this.shopList.innerHTML=str;
			this.addCartListEvent();
		}
		addCartListEvent(){
			var that=this;
			var allAddCartBtn=document.querySelectorAll(".addCart");
			allAddCartBtn.forEach((addCartBtn)=>{
				addCartBtn.onclick=function(){
					var tr=this.parentNode.parentNode;
					var currentProduct={
						pic:tr.children[0].children[0].children[0].src,
						name:tr.children[1].innerHTML,
						price:tr.children[2].innerHTML
					}
					that.addToCartProducts(currentProduct);
					that.rendCartList();
				}
			})
		}
		addToCartProducts(currentProduct){
			this.cartProducts=this.getStorage();
			for(var i=0;i<this.cartProducts.length;i++){
				if(this.cartProducts[i].name===currentProduct.name){
					this.cartProducts[i].num++;
					this.setStorage(this.cartProducts);
					return;
				}
			}
			currentProduct.num=1;
			this.cartProducts.push(currentProduct);
			this.setStorage(this.cartProducts);
			this.rendCartList();
		}
		rendCartList(){
			var str='<thead><tr><th>精选特卖</th><th></th><th>数量</th><th>操作</th></tr></thead>';
			str+="<tbody>";
			for(var i=0;i<this.getStorage().length;i++){
				str+='<tr><td><img src="'+this.getStorage()[i].pic+'"></td><td>'+this.getStorage()[i].name+'</td><td class="change">&nbsp;&nbsp;&nbsp;&nbsp;<span class="jian">-</span>'+this.getStorage()[i].num+'<span class="jia">+</span></td><td><a href="javascript:;" class="del">删除</a></td></tr>';
			}
			str+="</tbody>";
			this.cartList.innerHTML=str;
			this.delEvent();
			this.changeNum();
		}
		delEvent(){
			var that=this;
			var allDelBtn=this.container.querySelectorAll(".del");
			allDelBtn.forEach((delBtn)=>{
				delBtn.onclick=function(){
					var name=this.parentNode.parentNode.children[1].innerHTML;
					that.delFromCartProducts(name);
				}
			})
		}
		delFromCartProducts(name){
			this.cartProducts=this.getStorage();
			this.cartProducts=this.cartProducts.filter((product)=>{
				if(product.name===name){
					return false;
				}
				return true;
			});
			this.setStorage(this.cartProducts);
			this.rendCartList();
			if(this.cartProducts.length<1){
				this.cartList.innerHTML="";
			}
		}
		changeNum(){
			var that=this;
			var changeNumTdArr=this.container.querySelectorAll(".change");
			changeNumTdArr.forEach((changeNumTd)=>{
				changeNumTd.onclick=function(e){
					var e=window.event||e;
					var target=e.target||e.srcElement;
					var name=this.parentNode.children[1].innerHTML;
					if(target.className=="jian"){
						that.jianNum(name)
					}
					if(target.className=="jia"){
						that.jiaNum(name)
					}
				}
			})
		}
		jianNum(name){
			this.cartProducts=this.getStorage();
			for(var i=0;i<this.cartProducts.length;i++){
				if(this.cartProducts[i].name===name){
					this.cartProducts[i].num--;
					this.setStorage(this.cartProducts);
					this.rendCartList();
					if(this.cartProducts[i].num<=0){
						this.delFromCartProducts(name);
						return;
					}
					return;
				}
			}
		}
		jiaNum(name){
			this.cartProducts=this.getStorage();
			for(var i=0;i<this.cartProducts.length;i++){
				if(this.cartProducts[i].name===name){
					this.cartProducts[i].num++;
					this.setStorage(this.cartProducts);
					this.rendCartList();
					return;
				}
			}
		}
	}
	var car=new ShoppingCart("cart",products);
	car.init();
	// 鼠标移入small盒子,mask盒子和big盒子显示
	$('.small').on('mouseenter',function(){
		$(this).children('.mask').css({display:'block'});
		$(this).next('.big').css({display:'block'});
		$(this).children('.bg').css({display:'block'});
	})
	// 鼠标移出small盒子,mask盒子和big盒子隐藏
	$('.small').on('mouseleave',function(){
		$(this).children('.mask').css({display:'none'});
		$(this).next('.big').css({display:'none'});
		$(this).children('.bg').css({display:'none'});
	})
	// 鼠标在small盒子中移动,mask跟着鼠标移动,并且鼠标位于mask中间
	$('.small').on('mousemove',function(e){
		var x=e.pageX-$(this).parent().offset().left-$('.mask').width()/2;
		var y=e.pageY-$(this).parent().offset().top-$('.mask').height()/2;
		var maxX=$('.small').width()-$('.mask').width();
		var maxY=$('.small').height()-$('.mask').height();
		if(x<0){
			x = 0;
		}
		if(y<0){
			y = 0;
		}
		if(x>maxX){
			x = maxX;
		}
		if(y>maxY){
			y = maxY;
		}
		$(this).children('.mask').css({left:x+"px",top:y+"px"});
		$(this).children('.mask').children('img').css({left:-x+"px",top:-y+"px"});
		var bigImg=$(this).next('.big').children('.bigImg');
		bigImg.css({marginLeft:-x/$(this).width()*bigImg.width()+'px',marginTop:-y/$(this).height()*bigImg.height()+'px'});
		
	})
})()