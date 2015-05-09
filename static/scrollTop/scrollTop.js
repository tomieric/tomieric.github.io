/*
* 火箭升空 回到顶部
* 随便写写
* 借鉴 极客公园 http://www.geekpark.net/
*/
function initScrollTop(obj){
	var main = $(obj), body = $(document.body), scrolling = false, animTimer = null;
	var win = main.selector === 'html,body' ? $(window) : main;
	
	var addCss = function(){
		var cssText = "#scrollTop{ position: fixed; right: 0; top: 80%; width: 72px; height: 180px; background: url('static/scrollTop/rocket_up.png') no-repeat -40px 0; cursor: pointer; z-index: 8; }#scrollTop div{ display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }#scrollTop .level-2{ background: url('static/scrollTop/rocket_up.png') no-repeat -189px 0; opacity: 1; filter: alpha(opacity=100); }";
		var oHead = document.getElementsByTagName('head')[0];
		var oStyle = document.createElement('style');
		if(document.all){ //ie
			oStyle = document.createStyleSheet();
			oStyle.cssText = cssText;
		}else{
			oStyle.textContent = cssText;
		}
		try{
			oHead.appendChild(oStyle)
		}catch(e){}
	};
	
	addCss();
	var top = $('<div id="scrollTop" title="回到顶部"><div class="level-2"></div><div class="level-3"></div></div>').hide();
	top.appendTo(body);

	var rokect = top.find(".level-2");
		
	win.on("scroll", function(){
		if($(this).scrollTop() > 100 && !scrolling){
			top.fadeIn();
		}else{
			top.fadeOut();
		}
	});
	
	top.on("click", function(){
		scrolling = true;
		main.animate({scrollTop: 0}, 1000, function(){
			scrolling = false;
			clearInterval(animTimer);
			rokect.css("background-position", "-189px 0");
		});
		var i = 1;
		animTimer = setInterval(function(){
			i++;
			if(i > 5) i = 2;
			rokect.css("background-position", "-"+(149 * i + 40)+"px 0");
		}, 150);
		
		$(this).animate({ top: "-180px"}, 1000, function(){
			$(this).hide().css("top" , "80%");
			rokect.hide();
		});
	});
	
	top.hover(function(){
		rokect.show().fadeTo(600, 1);
	}, function(){
		if(!scrolling){
			rokect.fadeTo(600, 0, function(){
				$(this).hide();
			});
		}
	});
	
	addCss = null;
}

$(function(){
	initScrollTop($('html,body'));
});