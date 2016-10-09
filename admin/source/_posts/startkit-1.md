title: 配置5小时开发2分钟系列（1）—— 即时刷新的browser-sync
date: 2016/09/01
thumbnailImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG7.jpeg?imageView2/1/w/280/h/280/interlace/1/q/60
autoThumbnailImage: yes
coverImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG7.jpeg?imageView2/0/interlace/1/q/60
tags:
    - gulp
    - browser-sync
    - webpack
categories: 前端构建
---


> 最近火遍朋友圈的 [在 2016 年学 JavaScript 是一种什么样的体验？](https://www.v2ex.com/t/310767)，如果有一天选择做了前端，请把我埋在，深深的配置里...

在前两年觉得前端是最容易入门上手的，而近两年感觉门槛高了，各种眼花缭乱的构建工具，各种配置。 

在这里不用怕，本人带你一步步实现自己的配置模板。

本篇带来的是 `即时刷新的browser-sync`

<!-- more -->


## 即时刷新的browser-sync

在很久以前我们可能用过曾经很火的工作 F5，F5顾名思义就是不停的按下 F5键刷新页面，F5工具则替代了人工手动刷新。

为什么需要不停的刷新页面呢，在前端开发中，我们修改了文件的源码或者静态资源比如 javascript，image，css 文件，都是需要通过刷新页面才能更新预览。

在开发中，通常直接用浏览器打开 html 文件进行预览，但如何才能让在手机端能够预览，或者局域网的另一台机器可以实时访问到页面。这是需要引入 http 服务，比如基于 php ,.net, jsp或者 node的环境。

在本篇文章将介绍更能提供的 http 环境的强大工具 `browser-sync`，开始我们的 `配置5小时开发两分钟` 介绍。

> `browser-sync` 是一款 `省时的浏览器同步测试工具`

[browser-sync官网](https://browsersync.io/)
[中文网站](http://www.browsersync.cn/)

## 快速入门

### 安装browser-sync 

`browser-sync` 是基于 `Node` 环境，因此我们首先安装了 node。

我们使用 `npm` 来安装  `browser-sync`，打开终端或者命令提示符


```
npm install -g browser-sync
```

全局安装完毕，可以在然后目录的终端或者命令是提示符下直接使用 `browser-sync` 命令

### 使用

即时监听文件刷新页面

```
browser-sync start --server --files "css/*.css, **/*.html"
```

命令行（[http://www.browsersync.cn/docs/command-line/](http://www.browsersync.cn/docs/command-line/)）太多怎么办？我们可以使用配置文件 `bs-config.js`

在终端（命令提示符）中输入

```
browser-sync init
```

当前目录下自动生成了`bs-config.js`文件，可以参考[配置文档](http://www.browsersync.cn/docs/options/)进行设置

怎样启动自定义的配置，在终端输入

```
browser-sync start --config bs-config.js
```

我们可不想每次都输入这个命令，而且太长不好记，有没有简单的好的办法~

答案是：有！！！

只需要在当前目录初始化 npm 包

```
npm init -yes 
```

Ok!当前目录下又多了一个 `package.json` 文件，如果你接触到 node 就不会陌生了 

我们修改`package.json` 中的  `scripts` 字段，增加 `start`字段

```
{
    ...
    "scripts": {
        "start": "browser-sync start --config bs-config.js"
    }
    ...
}
```

好了我们每次启动项目使用

```
npm start
```

或者

```
npm run start
```

渐渐的项目配置文件越来越多了，怎么办下次新项目又要重新配置？因此才有了 `配置5小时开发两分钟系列`，^_^

这里作者整理一个完整的 `browser-sync` 环境的构建项目模板 [https://github.com/tomieric/browsersync-pure-boilerplate](https://github.com/tomieric/browsersync-pure-boilerplate)，欢迎 star，实现剧情反转，配置只需2分钟！

## 进阶

关于 `browser-sync` 还有很多可以挖掘的，比如它的 UI界面 ，这个在调试移动端很是强大。

本人之前一直在用的是 `livereload`，但相比 `browser-sync` 功能还是差一大截。

`browser-sync` 还可以搭载其他构建工具，比如 `gulp`, `grunt`等，将在系列的下一篇详细介绍。


* [配置5小时开发2分钟系列（1）](/2016/09/01/startkit-1/)
* [配置5小时开发2分钟系列（2）](/2016/09/03/startkit-2/)
* [配置5小时开发2分钟系列（3）](/2016/09/05/startkit-3/)
* [配置5小时开发2分钟系列（4）](/2016/09/08/startkit-4/)