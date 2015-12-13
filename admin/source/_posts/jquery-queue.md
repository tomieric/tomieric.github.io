title: jQuery核心函数队列
date: 2015/04/10
thumbnailImage: http://7xp5hh.com1.z0.glb.clouddn.com/vintage-140.jpg
autoThumbnailImage: yes
coverImage: assets/images/cover-v1.2.0.jpg
tags:
    -jquery
    -javascript
    -插件
categories: JavaScript
---

首先先说个例子

之前在做一个多个进度条动画时写了个东西

[http://sandbox.runjs.cn/show/ytyxhtib](http://sandbox.runjs.cn/show/ytyxhtib)

<!-- more -->

```

	/**
	* progress bar
	* by tomieric
	* http://getf2e.com
	*/
	$.fn.extend({
		'progressbar': function(config){
			var opt = $.extend({
				parent: null,
				callback: $.noop,
				duration: 200
			}, config ||{});


			return $(this).each(function(){
				var $self = $(this), data = $self.data();

						var per = data.per;
						(per = per  || 0) && (per = per > 100 ? 100 : per);
						$self.animate({ width: per+'%'}, opt.duration, function(){
							opt.callback();
							fnDequeue();
						})

			});
		}
	});


	$('.percent-bar').progressbar();

```

我们可以看到所有进度条是一个同步的动画，那如果我们想有一个队列的效果，第一个动画执行完后再执行第二个有什么方法呢？

* css3动画transition-delay
* js队列

这里不讨论css3的写法，因为老板们想兼容更多的浏览器



## 队列

> 队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。

这是百度百科上的解释。

我的理解是一个同步的动作，必需上一个任务者完成任务后再到当前动作，比如800米接力赛跑。

之前也写过队列的对象，在[圣诞倒计时](http://project.tomieric.com/christmas/)中。

```

	var AnimQueque = {
		list: [],
		add: function(obj, cls, fn){
			this.list.push({ obj: obj, cls: cls, fn: fn});
		},
		resolve: function(){
			var cache = this.list.shift();
			if(!cache) return;
			this.to(cache.obj, cache.cls, function(){
				typeof cache.fn === "function" && cache.fn();
				AnimQueque.resolve();
			});
		},
		to: function(obj,cls, fn) {
			$(obj).addClass(cls).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', fn);
		}
	};

```

利用队列数组将要改变的css变量存放起来，然后每次从数组顶部拿出一个css变量，监听每个css3动画结束回调函数，每次动画完成再执行第二个步骤形成一个递归。

## jQuery队列

* queue(element, [queueName])
	* `element` 检测附加队列的DOM元素
	* `queueName` 字符串值，包含序列的名称。默认是 fx, 标准的效果序列。
	* `newQueue`:替换当前函数列队内容的数组
	* `callback()`:要添加进队列的函数
* dequeue([queueName])
	* `queueName` 队列名，默认为fx
* clearQueue([queueName])
	* `queueName` 含有队列名的字符串。默认是"Fx"，动画队列。


好，现在我们来改造进度条那个例子。

```

	/**
	* progress bar
	* by tomieric
	* http://getf2e.com
	*/


	$.fn.extend({
		'progressbar': function(config){
			var opt = $.extend({
				parent: null,
				callback: $.noop,
				duration: 200
			}, config ||{});

			var $body = $(document.body),
					_queue = [],
					fnDequeue = function(){ $body.dequeue('jq.progressbar') };

			$(this).each(function(){
				var $self = $(this), data = $self.data();
				if(data.queque) return;
				_queue.push(
					function(){
						var per = data.per;
						(per = per  || 0) && (per = per > 100 ? 100 : per);
						$self.animate({ width: per+'%'}, opt.duration, function(){
							opt.callback();
							fnDequeue();
						})
					}
				);

				$self.data('queque', true);
			});

			/*
			* 用body唯一dom元素存放，$(this)是一个元素集合
			*/
			$body.queue('jq.progressbar', _queue);

			// 触发堆栈
			fnDequeue();

			return this;
		}
	});


	$('.percent-bar').progressbar({duration: 500});

```

然后我们再来看看效果[http://sandbox.runjs.cn/show/o3lknjcj](http://sandbox.runjs.cn/show/o3lknjcj)

fork [http://runjs.cn/detail/o3lknjcj](http://runjs.cn/detail/o3lknjcj)
