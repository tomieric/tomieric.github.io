title: 基于jQuery的（m）VC 库
date: 2016/03/14
thumbnailImage: http://7xp5hh.com1.z0.glb.clouddn.com/vintage-140.jpg
autoThumbnailImage: yes
tags:
    - jquery
    - mvc
    - Backbone
    - spine
categories: javascript
---

> 此处文章只针对比如 jquery 无其他相关框架的页面进行改造，至于其他框架暂时不说

以往我们做数据填充时经常搭配`jquery.tmpl.js`或则`arttemplate.js`模板等，在数据填充后往往需要重新绑定里面的元素的交互事件。对此重复去写这样的代码效率且显得不那么高。

在视图-模型-控制器（mvc）里面提供给我们很方便的语法结构，更简便的编写这类相关的业务，但在小的功能页面上如果使用`Backbone`这类的框架显得页面静态资源稍微臃肿。

<!-- more -->

请先阅读 [javascript组件化](http://purplebamboo.github.io/2015/03/16/javascript-component/) 这篇文章，本文中的 `Spine`是基于该文章的源码进行改进

`Spine`提供我们 `oo` 编程语法糖，组件于组件之间通过继承扩展来开发富应用组件，同时事件通过订阅-发布的模式实现，内置了 `underscore` 的 `template` 功能。完整的实现了 `Mini` 版的 `Backbone`功能，相比之下少了 `router`功能（可以参照使用[director.js](https://github.com/flatiron/director))

## 语法

首先我们来看看 `Spine` 的使用语法，跟 `Backbone` 的用法相似我们使用 `Spine.extend` 函数来扩展一个组件类。

```
var AppView = Spine.extend({
    // 初始化
    initiliaze: function() {
        //...
    }
})
```

### 初始化

我们定义了 `initiliaze` 函数，类似于 `AppView` 的构造函数，在函数内部我们可以直接用 `this` 去获取对象的方法或配置参数

```
var AppView = Spine.extend({
    // 初始化
    initiliaze: function() {
        var msg = this.get('greeting')
        this.sayHi(msg)
    },
    sayHi: function(msg) {
        console.log(msg)
    }
})
```

当我们没有去实例化 `AppView`时，并不会执行初始化里面的语句。那我们如何去调用呢？

```
var app = new AppView({
    greeting: 'Hello World'
})
```

这时候我们在浏览器的控制台可以看到打印出来 `Hello World`

### 事件绑定

既然是组件必少不了用户点击交互等事件，在 `Spine` 里面如何去绑定事件呢？ 

通过 `EVENTS` 配置对象去声明，先声明 `选择器：{ event1:fn, event2: fn }`,这点有区别于 `Backbone` 中的写法 `选择器 event1: fn,选择器 event2: fn`

```
var AppView = Spine.extend({
    initiliaze: function() {
        // ...
    },
    EVENTS: {
        '.btn': {
            click: function(self, e) {
                e.preventDefault()

                // self 指向实例对象
                self.sayHi()
            }
        }
    },
    ...
})
```

实例化 `AppView`

```
var app = new AppView({
    parentNode: '#demo'
})
```

注意，声明绑定事件时最好在实例化传入配置参数 `parentNode` 表示 dom 的作用域，忽略不传默认为 `document.body` 用于作为事件代理的主容器，同于 `Backbone` 当中的 `el` 参数

`Spine` 的事件绑定同于 `jQuery` 的绑定方法，比如第三方插件的事件

```
var AppView = Spine.extend({
    ...
    EVENTS: {
        '.datetime' : {
            // self - 实例化对象
            // e - jquery 中事件默认参数 event
            // date 第三方插件提供的event data 
            'choose.ui.datetimepicker': function(self, e, date) {
                self.fetch({ date: date })
            }
        }
    }
    ...
})
```

### 模板视图

既然是 （m）vc 库自然少不了 `view` 模板引擎，`Spine` 使用的是 `underscore` 的 `template`，语法相同

```
...
<div id="app">
    ...
    <div id="listView"></div>
</div>

<!-- list 模板 -->
<script type="text/html" id="listView-tmpl">
    <ul>
    <% for(var i = 0; i < list.length; i++) { %>
        <li>{%= list[i].value %}</li>
    <% } %>
    </ul>
</script>
```

js 中声明

```
var AppView = Spine.extend({
    initiliaze: function() {
        this.$view = this.get('view')
        this.template = this.get('template')

        var listData = [
            {text: 1, value: 1}
            {text: 2, value: 2}
            {text: 3, value: 3}
            ...
        ]
        this.render(listData) 
    },
    render(data) {
        this.$view.empty().html(this._parseTemplate(this.template, data))
    }
})
```

### 扩展视图纯填充组件

```
// 通用视图对象
// 依赖Spine.js
// 扩展SpineJS
// by tommyshao
// ---------
var PartialView = Spine.extend({
    // 初始化
    initialize: function() {
        // 实例化获取配置
        this.$el = this.get('parentNode');
        this.template = this.get('template').html();

        
        // 外部定义事件
        this.EVENTS = this.get('EVENTS');
        this._delegateEvent();

    },
    // 惰性渲染
    // data接收数据
    render: function(data) {
        data = data || {};
        // 利用内置模板引擎编译模板获取编译后的内容
        var template = this._parseTemplate(this.template, data);
        // 重新渲染数据
        this.$el.empty().append(template);
    }
});

/* 
Spine.min = function(config) {
    return new PartialView(config)
} 
*/
```

使用方式

```
var listView = new PartialView({
    parentNode: $('#listView'),
    template: $('#listView-tmpl'),
    EVENTS: {
        // 自定义事件
    }
})
```