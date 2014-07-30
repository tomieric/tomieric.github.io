/*一周看点滚动*/
(function(){
	$.fn.slide=function(options){
		var defaults={
			effectObj:"ul",
			subTag:"li",
			num:3,
			prevBtn:"#prevlink",
			nextBtn:"#nextlink",
			auto:true,
			autoTime: 3000,
			effectTime: 1000
		};
		var o=$.extend(defaults,options);
		var _this=$(this);
		var thisw=_this.width();
		var efcObj=_this.find("ul");
		var sub=efcObj.children(o.subTag);
		var w=parseInt(sub.css("width"));
		var len=sub.length;
		var width=len*w;
		var prevBtn=$(o.prevBtn);
		var nextBtn=$(o.nextBtn);
		var left;
		var auto;
		
		prevBtn.click(function(e){
			left=parseInt(efcObj.css("left"));
			if(width+left>thisw){
				if(!efcObj.is(":animated")) efcObj.animate({"left":left-w+"px"},o.effectTime);
			}
			e.preventDefault();
			return false;
		});
		
		nextBtn.click(function(e){
			left=parseInt(efcObj.css("left"));
			if(left<0){
				if(!efcObj.is(":animated")) efcObj.animate({"left":left+w+"px"},o.effectTime);	
			}
			e.preventDefault();
			return false;
		});
		
		if(o.auto){
			auto=setInterval(autoSlide,o.autoTime);
		}
		
		efcObj.hover(function(){
			clearInterval(auto);
		},function(){
			auto=setInterval(autoSlide,o.autoTime);
		});
		
		var i=0;
		function autoSlide(){
			left=parseInt(efcObj.css("left"));
			var n=len-o.num;
			if(i<=n){
				if(width+left>thisw){
					if(!efcObj.is(":animated")) efcObj.animate({"left":left-w+"px"},o.effectTime);
					}
				i++;
			}else{
				if(left<0){
					if(!efcObj.is(":animated")) efcObj.animate({"left":left+w+"px"},o.effectTime);	
				}else{
					i=0;
				}
			}
		}
	}
	
	$.fn.screen=function(){
		var screen1=$("#screen1");
		var screen2=$("#screen2");
		var screen3=$("#screen3");
		var nextBtn=$("#nextBtn");
		var prevBtn=$("#prevBtn");
		
		var img1=screen1.find("img");
		var img2=screen2.find("img");
		var img3=screen3.find("img");
		
		var w1=parseInt(img1.css("width"));
		var w2=parseInt(img2.css("width"));
		var w3=parseInt(img3.css("width"));
		
		var len1=img1.length;
		var len2=img2.length;
		var len3=img3.length;
		
		var width1=w1*len1;
		var width2=w2*len2;
		var width3=w3*len3;
		
		var left1,left2,left3;
		
		var auto;
		
		prevBtn.bind("click",function(e){
			//clearInterval(auto);
			left1=parseInt(screen1.css("left"));
			left2=parseInt(screen2.css("left"));
			left3=parseInt(screen3.css("left"));
		    if(width1+left1>=w1*2){
				//if(screen1.not(":animated")) screen1.animate({"left":left1-w1+"px"},2000);
				if(!screen1.is(":animated")) screen1.animate({"left":left1-w1+"px"},2000);
			}
			if(width2+left2>=w2*2){
				if(!screen2.is(":animated")) screen2.animate({"left":left2-w2+"px"},2000);
			}
			if(width3+left3>=w3*2){
				if(!screen3.is(":animated")) screen3.animate({"left":left3-w3+"px"},2000);
			}
			//auto=setInterval(autoSlide,3000);
			e.preventDefault();
			return false;
		});
		
		nextBtn.bind("click",function(e){
			//clearInterval(auto);
			left1=parseInt(screen1.css("left"));
			left2=parseInt(screen2.css("left"));
			left3=parseInt(screen3.css("left"));
		    if(left1<0){
				if(!screen1.is(":animated")) screen1.animate({"left":left1+w1+"px"},2000);
			}
			if(left2<0){
				if(!screen2.is(":animated")) screen2.animate({"left":left2+w2+"px"},2000);
			}
			if(left3<0){
				if(!screen3.is(":animated")) screen3.animate({"left":left3+w3+"px"},2000);
			}
			//auto=setInterval(autoSlide,3000);
			//console.log(w1+":"+w2+":"+w3);
			e.preventDefault();
			return false;
		});
		
		auto=setInterval(autoSlide,3000);
		
		screen1.hover(function(){
			clearInterval(auto);
		},function(){
			auto=setInterval(autoSlide,3000);
		});
		screen2.hover(function(){
			clearInterval(auto);
		},function(){
			auto=setInterval(autoSlide,3000);
		});
		screen3.hover(function(){
			clearInterval(auto);
		},function(){
			auto=setInterval(autoSlide,3000);
		});
		
		var i=0;
		function autoSlide(){
			//暂时屏蔽
			//prevBtn.unbind("click");
			//nextBtn.unbind("click");
			
			left1=parseInt(screen1.css("left"));
			left2=parseInt(screen2.css("left"));
			left3=parseInt(screen3.css("left"));
			var n=len1-1;
			if(i<=n){
				if(width1+left1>=w1*2){
					if(!screen1.is(":animated")) screen1.animate({"left":left1-w1+"px"},2000);
				}
				if(width2+left2>=w2*2){
					if(!screen2.is(":animated")) screen2.animate({"left":left2-w2+"px"},2000);
				}
				if(width3+left3>=w3*2){
					if(!screen3.is(":animated")) screen3.animate({"left":left3-w3+"px"},2000);
				}
				i++;
			}else{
				if(left1<0){
					if(left1<0){
						if(!screen1.is(":animated")) screen1.animate({"left":left1+w1+"px"},2000);
					}
					if(left2<0){
						if(!screen2.is(":animated")) screen2.animate({"left":left2+w2+"px"},2000);
					}
					if(left3<0){
						if(!screen3.is(":animated")) screen3.animate({"left":left3+w3+"px"},2000);	
					}
				}else{
					i=0;
				}
			}
			
			//prevBtn.bind("click");
			//nextBtn.bind("click");
		}
	}
})(jQuery);