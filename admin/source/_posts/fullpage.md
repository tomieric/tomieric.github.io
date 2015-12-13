title: FullPage.js尝试
date: 2014/09/25
thumbnailImage: http://7xp5hh.com1.z0.glb.clouddn.com/vintage-140.jpg
autoThumbnailImage: yes
tags:
    -jquery
    -javascript
    -插件
categories: JavaScript
---

# FullPage.js尝试

我们经常会经常看到这样的产品页

[http://www.mi.com/shouhuan](http://www.mi.com/shouhuan)

是不是觉得很高端大气上档次

那我们这样实现呢？

首先我们来做一个没有插件版的Fullscreen，使用原始的javascript,css3来实现。

<!-- more -->

1. 布局
我们把每页都绝对定位在body上 宽高为100%就可以满足全屏的布局

``` html
<!-- 屏幕 -->
<div class="stage stage1" id="slide1">
    <!-- 内容 -->
</div>
<div class="stage stage2" id="slide2">
    <!-- 内容 -->
</div>
<div class="stage stage3" id="slide3">
    <!-- 内容 -->
</div>
<!-- 导航 -->
<div class="slide-nav">
    <a href="#slide1" rel="0" class="on"></a>
    <a href="#slide2" rel="1"></a>
    <a href="#slide3" rel="2"></a>
</div>
```

添加每屏内容和样式动画之后

http://ginosin.esy.es/fullscreen/example-1.html

2. js实现滚屏交互
1.实现导航tab切换

我们定义两个变量分别存放导航索引项和每页屏幕的dom集合。

``` javascript
// 存放所有屏nodelist
var screens = null;
// 导航项nodeList
var navs = null;

```
在页面dom就绪时候分别获取页面的集合对象。

``` javascript
// dom就绪
document.addEventListener('DOMContentLoaded', function(){
    // 获取屏幕nodelist
    screens = document.querySelectorAll('.stage');
    // 获取导航nodelist
    navs = document.querySelectorAll('.slide-nav a');
});
```

这是我们需要通过鼠标点击页面右侧的导航小圆点来进行屏幕切换。由于我们已经写好css3动画和样式，只需给当前页（屏幕）添加类名active而其他页需要去掉active这个类。

那我们来简单的实现一个addClass和removeClass的函数（被jquery毒害的很深）

``` bash
/* 工具类 */
var util = {
    /* 添加类名 */
    addClass: function(obj, cls){
        obj.className = obj.className.indexOf(cls) > -1 ? obj.className : obj.className+' '+cls;
    },
    /* 删除类名 */
    removeClass: function(obj, cls){
        obj.className = obj.className.replace(cls, "");
    }
};
现在通过循环导航项nodeList来绑定点击事件，通过我们在html中给定的rel值作为当前页的索引

/* 导航点击切换 */
for(var i = 0; i < navs.length; i++){
    navs[i].onclick = function(event){
        if(this.className.indexOf('on') === -1){
            pn = parseInt(this.getAttribute('rel') || pn);
            //changeNav();
        }

        event.preventDefault();
        return false;
    }
}
```

具体查看源码

http://ginosin.esy.es/fullscreen/example-2.html

2. 实现鼠标滚动轮滑切换

鼠标轮滑事件的监听

``` bash
// FF13- 鼠标轮滑事件监听
document.addEventListener('DOMMouseScroll', scrollFn, false);
// 轮滑事件监听
window.onmousewheel = document.onmousewheel = scrollFn;


// 滚动函数，鼠标轮滑滑动
    var scrollFn = function(event){
        var event = event || window.event;
        if(!playing){ // 不在动画过度
            if(event.wheelDelta < 0){  // 向下滑动，负值
                // 向下
                motion(true)
            }else{
                //向上
                motion(false)
            }                
        }
    };
```

每次滚动我们需要等待动画完成后才能进行下一屏。

``` bash
// 设置锁屏
function playingdelay(){
    playing = true;
    // 间隔playingduration秒后才能执行下一个动作
    setTimeout(function(){ playing = false; }, playingduration)
}
```

最后我们要添加键盘上的上下左右和空格键也能实现屏幕的切换

``` bash
// 键盘上下左右，空格键控制
document.onkeydown = function(event){
    var event = event || window.event;
    var c = event.keyCode;
    if(c == 40 || c == 32 || c == 39){
        motion(true)
    }else if(c == 38 || c == 37){
        motion(false)
    }
}
```

最终实现了我们要的效果：

http://ginosin.esy.es/fullscreen/

其中鼠标轮滑代码借鉴了

http://browser.qq.com/

关于Fullpage.js插件
想要更强大的功能，我们必须上开源的插件fullpage.js

具体查看插件的案例.

[http://alvarotrigo.com/fullPage/examples/apple.html)(http://alvarotrigo.com/fullPage/examples/apple.html)

以前公司最近弄的一个专题，也是我现在想尝试做一个的念头。

[http://www.yiihuu.com/event/3year/](http://www.yiihuu.com/event/3year/)

好了回到正题。我们用fullpage.js怎么实现上面那个例子呢。

先看html结构

``` bash
<div id="fullpage">
    <div class="section" id="section1">
        <p class="pc"></p>
        <p class="phone"></p>
        <p class="pad"></p>
        <p class="text1">麦克普肉 </p>
        <p class="text2">艾凤五爱斯  </p>
        <p class="text3">牛    艾派得 </p>
    </div>
    <div class="section" id="section2">
        <div class="pao"></div>
        <p class="book"></p>
        <p class="p1"></p>
        <p class="p2"></p>
        <p class="nav"></p>
        <p class="text4">欲练神功<br/>无需自X</p>
    </div>
    <div class="section" id="section3">
        <div class="mac">
            <div class="triangle"></div>
            <div class="circle"></div>
        </div>
        <p class="text5">热吗？</p>
    </div>
</div>
```

无非是给每一屏dom元素加上section类，而且是不需要导航

还是原来的样式只需要稍稍改动一下。

那么JS是怎样写的呢？登登灯~

``` bash
$(document).ready(function(){
    $('.section').eq(0).removeClass('active').addClass('active');
    $('#fullpage').fullpage({
        sectionsColor: ['#2F65C0', '#9253B2', '#0C86D3'],
        navigation: true,
        navigationTooltips: ['移动生活', '传统书籍', '电脑改变生活'],
        loopBottom: true,
        loopTop: true,
        css3: true
    });
});
```

是不是简单爆了！

别忘了要引入多个js文件

``` bash
<script src="http://cdn.staticfile.org/jquery/1.11.1/jquery.min.js"></script>
<script src="fullpage/jquery.easings.min.js"></script>
<script src="fullpage/jquery.fullPage.min.js"></script>
```

好了我们看一下效果，看看有什么区别

[http://ginosin.esy.es/fullscreen/fullpage.html](http://ginosin.esy.es/fullscreen/fullpage.html)

关于fullpage.js的配置，详看

[https://github.com/alvarotrigo/fullPage.js#options](https://github.com/alvarotrigo/fullPage.js#options)
