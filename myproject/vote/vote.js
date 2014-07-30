/**
 * 对联
 * by tomieric
 */

$(function(){
		var newImage = new Image();
		newImage.onload = function(){
			var vote = $('<div class="vote"><a href="http://www.yiihuu.com/event/vote" class="vote-left" target="_blank" title="为翼虎投票"><span class="left-fish"></span><span class="left-star"></span><span class="left-sqaure"></span></a><a href="http://www.yiihuu.com/event/vote" class="vote-right"  target="_blank" title="为翼虎投票"><span class="right-fish"></span><span class="right-star"></span><span class="right-plane"></span></a></div>');
		
			//var pos = document.getElementsByTagName('body')[0].getBoundingClientRect();
			var pos = { left: 200, top: 0 };
			vote.appendTo($(document.body));
			
			var _left = vote.find('.vote-left'), _right = vote.find('.vote-right'), animate = false;
			var viewW = $(window).width();

			//_left.css('left', (pos.left - 195)+'px');
			//_right.css({'left': (pos.left+ 990 -60)+'px', 'right': 'auto'});

			_left.css('left', '20px');
			_right.css({'left': (viewW - _right.width() - 20)+'px', 'right': 'auto'});
			
			$(window).on('scroll.vote', function(){
				if(!animate){
					animate = true;
					_left.animate({ top: '300px'}, 400, function(){
						$(this).animate({ top: '200px'}, 200);
					});
					_right.animate({ top: '400px'}, 400, function(){
						$(this).animate({ top: '300px'}, 200, function(){
							animate = false;
						});
					});
				}
			});
		};
		newImage.src='vote/vote.png?t=20131107';
	});