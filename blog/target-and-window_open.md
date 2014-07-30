链接跳转到指定窗口
---
有时候我们需要节省带宽，减少站内多开窗口加载内容。

比如公司的产品“在线教室”，用户在点击多个教室链接时，原方法按照产品部要求是全部新开窗口。

由于在线教室需要flash媒体流长连接，还有就是基于node+sokect.io的在线聊天，会造成服务器过大的压力。

****
**相似案例分析**

优酷网的视频播放，比如我们在优酷的首页，你随便点视频播放，可以看到浏览器只开了一个窗口，并且在我们点击第二个视频的时候，会将第一个视频的页面给覆盖掉。我们想多开播放页面只能通过右键打开链接， 这样可以节省大部分带宽和连接数，大大减轻服务器的压力。



****


通过案例分析可以得到我们想要的。

下面说说实现的两种方法：

**1.JavaScript window.open**

window.open是我们最开始使用的方法，也是现在还保留的方法。参考[w3cschool](http://www.w3school.com.cn/htmldom/met_win_open.asp)

	window.open(URL,name,features,replace)

我们通过传入连接的url，和name（类似ID标识）， 定义一个全局变量获取window.open的句柄，然后我们可以对变量的opened属性进行判断。

	var ROOMWIN;
	function intoRoom(url){
			if(!ROOMWIN || ROOMWIN.closed){
				ROOMWIN=window.open(a,"ROOMWIN")
			}else{
				ROOMWIN.location=url;
				ROOMWIN.focus();  // 优点
			}
	}

*优点：* 是我们通过句柄得到新开窗口的window对象，通过focus让其自动聚焦，减少用户自己切换窗口，提高用户体验性。

**2.html a标签的target属性**

**特殊的目标**

有 4 个保留的目标名称用作特殊的文档重定向操作：

**"_blank"**

浏览器总在一个新打开、未命名的窗口中载入目标文档。

**"_self"**

这个目标的值对所有没有指定目标的 `<a>` 标签是默认目标，它使得目标文档载入并显示在相同的框架或者窗口中作为源文档。这个目标是多余且不必要的，除非和文档标题 <base> 标签中的 target 属性一起使用。

**"_parent"**

这个目标使得文档载入父窗口或者包含来超链接引用的框架的框架集。如果这个引用是在窗口或者在顶级框架中，那么它与目标 _self 等效。

**"_top"**

这个目标使得文档载入包含这个超链接的窗口，用 _top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。

**提示：**这些 target 的所有 4 个值都以下划线开始。任何其他用一个下划线作为开头的窗口或者目标都会被浏览器忽略，因此，不要将下划线作为文档中定义的任何框架 name 或 id 的第一个字符。


下面介绍我们的重点
================
***framename***

	在指定的框架中打开被链接文档。


优势是不需要引入Javascript,做到`即插即用`。

	<ul id="link">
		<li>
			<a href="http://www.yiihuu.com/" target="classroom">翼虎网</a>
		</li>
		<li>
			<a href="http://baidu.com" target="classroom">百度</a>
		</li>
		<li>
			<a href="http://qq.com" target="classroom">qq</a>
		</li>
	</ul>
	
我们给target赋值`“classroom”`，在浏览器上面我们可以看到一样可以新开窗口，而且对于所有设置了`target="classroom"` 属性都是跳到同一窗口下。youku正是用了这种方法，在首页所有视频连接设置了`target="video"`属性。

 




----------
The MIT License (MIT)  
&copy; Copyright (c) 2013 [tomieric](http://tomieric.github.io)