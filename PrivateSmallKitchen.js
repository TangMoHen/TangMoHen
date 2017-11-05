window.onload=function(){
	document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px';
   	window.onresize=function(){
      document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px'
   	};
   	//以上是rem布局代码
   	Vue.config.productionTip = false; //关闭Vue提示
	var mIddd = sessionStorage.getItem("mIddd");
	var app=new Vue({
		el:"#app",
		data:{
			Mlei:["凉菜","家常菜","川菜","鲁菜","粤菜","海鲜菜","湘菜"]
		},
		mounted:function(){				//等页面渲染完成之后,去调用这里面的方法
			this.$nextTick(function(){	//保证app.$el已经插入文档
				var oNav=document.getElementById("kitchen");
				var aLi=oNav.getElementsByTagName('li');
				var oLi=oNav.getElementsByTagName('li')[mIddd];
				oLi.className='red';
				for( var i=0;i<aLi.length;i++){
					aLi[i].index=i;
					aLi[i].onclick=function(){
						for( var i=0;i<aLi.length;i++){
							aLi[i].className='';
						}
						this.className='red';
					};
				}
				//分类点击转换样式
				$.ajax({
			        url:"https://www.kpmaolv.com/maolv/cookbook/queryByCategory",
			        data:{
			        	"cookbook_category":mIddd,
			        	"cookbook_hidden":"1"
			        },
			        dataType:'json',
			        cache:false,
			        type:'post',
			        success:function(r){
			            if(r.result=='0000'){
			                for(var i=0;i<r.data.length;i++){
			                	if(r.data[i].cookbook_hidden==1){
			                    	$(
									"<li>"+
										"<a href='LearningSteps.html?cookbook_id="+r.data[i].cookbook_id+"' class='clearFix'>"+
											"<img src='"+r.data[i].cookbook_coverimg+"' class='fl'>"+
											"<p class='fl'>"+r.data[i].cookbook_name+"</p>"+
											"<span class='fr'>点击学习</span>"+
										"</a>"+
									"</li>").appendTo('.vegetarian-dishes');
			                	}
			                }
			            }
			            $(window).scroll(function(){
							if($(document).scrollTop()!=0){
								sessionStorage.setItem("offsetTop", $(window).scrollTop());
								//保存滚动位置
							}
						});
						var offset = sessionStorage.getItem("offsetTop");
						if(offset!=0){
							$(window).scrollTop(offset)+"px";
						}
						//取出并滚动到上次保存位置
			        },
			        error:function(){
			            alert('错了404');
			        }
			    });		//渲染完成之后直接调用这个方法
			})
		},
		methods:{
			Majax:function(mSu){
				sessionStorage.setItem("offsetTop", 0);
				sessionStorage.setItem("mIddd", mSu);
			    $(".dishes .vegetarian-dishes").children('li').remove();  // 删除ul下的子元素li
			    $.ajax({
			        url:"https://www.kpmaolv.com/maolv/cookbook/queryByCategory",
			        data:{
			        	"cookbook_category":mSu,
			        	"cookbook_hidden":"1"
			        },
			        dataType:'json',
			        cache:false,
			        type:'post',
			        success:function(r){
			            if(r.result=='0000'){
			                for(var i=0;i<r.data.length;i++){
			                	if(r.data[i].cookbook_hidden==1){
				                	$(
									"<li>"+
										"<a href='LearningSteps.html?cookbook_id="+r.data[i].cookbook_id+"' class='clearFix'>"+
											"<img src='"+r.data[i].cookbook_coverimg+"' class='fl'>"+
											"<p class='fl'>"+r.data[i].cookbook_name+"</p>"+
											"<span class='fr'>点击学习</span>"+
										"</a>"+
									"</li>").appendTo('.vegetarian-dishes');
								}
			                }
			            }
					    $(window).scroll(function(){
							if($(document).scrollTop()!=0){
								sessionStorage.setItem("offsetTop", $(window).scrollTop());
								//保存滚动位置
							}
						});
						var offset = sessionStorage.getItem("offsetTop");
						if(offset!=0){
							$(window).scrollTop(offset)+"px";
						}
						//取出并滚动到上次保存位置
			        },
			        error:function(){
			            alert('错了404');
			        }
			    });
			},
		}
	})
};
