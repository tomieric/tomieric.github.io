title: 配置5小时开发2分钟系列（2）—— gulp搭配browser-sync
date: 2016/09/03
thumbnailImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG9.jpeg?imageView2/1/w/280/h/280/interlace/1/q/60
autoThumbnailImage: yes
coverImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG9.jpeg?imageView2/0/interlace/1/q/60
tags:
    - gulp
    - browser-sync
    - webpack
categories: 前端构建
---

> 最近火遍朋友圈的 [在 2016 年学 JavaScript 是一种什么样的体验？](https://www.v2ex.com/t/310767)，如果有一天选择做了前端，请把我埋在，深深的配置里...

在前两年觉得前端是最容易入门上手的，而近两年感觉门槛高了，各种眼花缭乱的构建工具，各种配置。 

本篇带来的是 `gulp搭配browser-sync`

<!-- more -->


## gulp搭配browser-sync

在[上一篇](/2016/09/01/startkit-1/) 介绍了 `browser-sync`，本篇将介绍 `browser-sync` 搭载 `gulp` 实现构建环境。

grunt 在很久以前用过，配置方式不太喜欢，所以一直使用 gulp，gulp的入门介绍就不详细介绍，可以看两年前的介绍,[Gulp.js构建工具入门](http://tomieric.com/2014/08/20/gulp/)

### gulp 配置开发

在根目录下新建`gulpfile.js` 文件，此文件为 `gulp` 的入口文件，在终端直接输入 `gulp`命令即可以执行配置。

```
touch gulpfile.js
```

使用 gulp 为我们管理 `less编译`, `图片压缩`, `js压缩`, `模板编译`, `http 服务` 等，此时 gulpfile.js 文件将越来越臃肿。我们将 gulpfile.js 逐渐按业务逻辑拆分不同的文件。

模板项目整体结构如下

```
.
├── README.MD
├── config.json      配置文件
├── gulp             gulp 任务配置
│   ├── lib          工具函数
│   └── task         gulp task 配置
│        ├── defaultTask         默认任务，包括 ejs，less，编译及 server
│        ├── spriteTask          sprite 合并任务，单独运行
│        └── buildTask         构建
├── gulpfile.js
├── static
│   ├── css
│   ├── fonts
│   ├── images
│   ├── js
│   └── less
├── template           ejs模板
│   ├── _common
│   ├── upgrade.html
│   └── 首页.html
```

从结构中可以看到，将于 gulp相关的文件都放在 `gulp` 文件夹下，而且按业务逻辑分成 `defaultTask`默认的开发环境，`buildTask` 构建发布的生产环境。

此外static主要存放静态文件，template 存放 js 模板（使用 ejs 模板引擎管理静态页面，推荐更好的模板[Nunjucks](https://mozilla.github.io/nunjucks/cn/api.html)）


### 1. 入口文件

入口文件为 gulp 构建工具默认的 `gulpfile.js`文件，只需将拆分的 task 任务导入

```
/*-------------
*  默认任务
-------------*/
require('./gulp/task/defaultTask')()

// code
...
```

因此我们需要在`./gulp/task/`目录下新建`defaultTask.js`文件，里面声明各自 task 执行的任务。

```
// defaultTask.js 
var gulp   = require('gulp')
// 配置文件
var config = require('../../config.json')
// 项目信息
var pkg    = require('../../package.json')
// node 内置模块
var path   = require('path')
var fs     = require('fs')
// gulp 加载插件
var $      = require('gulp-load-plugins')()

module.exports = function defaultTask() {
    //...
}
```

这里使用的是`gulp-load-plugins`, 减少声明太多变量

插件：

* [https://github.com/jackfranklin/gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins)

### 2. 模板编译

模板使用的是 `ejs`([http://ejs.co/](http://ejs.co/))，比较简单上手（前公司用的是nujucks,感觉更好用), `ejs` 支持变量的定义，js 语法，及`include`标签，方便我们对静态页面进行公共部分拆分,仿佛回到3，4年前写smarty，tp 模板的赶脚~

```
<%- include('_common/header.html', config) %>
    <div class="container">
        <ul>
            <% users.forEach(function(user){ %>
                <li><%= user.name %></li>
            <% } %>
        </ul>

        <%- include('_common/list.html', [{name: 'tommyshao'}, {name: 'ray'}]) %>
    </div>
<%- include('_common/footer.html') %>
```

在 gulp 使用只需要 `$.ejs({ config: config})`,其中 config 传入的是配置文件中的变量。模板中的公共模板(定义`_`开头的文件或者文件夹)不需要编译因此需要过滤。完整的代码：

```
// 模板编译
gulp.task('template', function() {
    return gulp.src([config.template+'/**/**.html', '!'+config.template+'/**/_**.html', '!'+config.template+'/_**/**.html'])
                .pipe($.ejs({ config: config}))
                .pipe($.prettify({ indent_size: 2}))
                .pipe($.plumber({ errorHandler: $.notify.onError('错误: <%= error.message%>')}))
                .pipe(gulp.dest(config.destPath))
                .pipe(reload({ stream: true }))
})

```

* `config.template` 配置文件中模板的目录
* `config.destPath` 配置文件中模板编译后的目录，也是 http server 的根目录
* `$.prettify({ indent_size: 2})` 输出 html 以2个空格格式化


插件：

* [https://github.com/rogeriopvl/gulp-ejs](https://github.com/rogeriopvl/gulp-ejs)
* [https://github.com/jonschlinkert/gulp-prettify](https://github.com/jonschlinkert/gulp-prettify)
* [https://github.com/floatdrop/gulp-plumber](https://github.com/floatdrop/gulp-plumber)

### 3. less 样式编译

less([http://lesscss.org/](http://lesscss.org/))是 css 的预编译器，可以定义变量，mixin，函数等，功能比较齐全和轻便。

为了减少写更多的 mixin，这里推荐一个比较好用的插件`autoprefixer`,它是属于现在比较火的预编译器`postcss`内置组件。

less 最终编译成 css，在调试的时候如何快速定位到 less 源文件的语句呢，需要使用到 `sourcemaps`

```
// less 编译
gulp.task('less', function() {
    return gulp.src([config.staticPath+'/less/**/**.less', '!'+ config.staticPath+'/less/**/_**.less', '!'+ config.staticPath+'/less/_**/**.less'])
            .pipe($.sourcemaps.init())
            .pipe($.plumber({ errorHandler: $.notify.onError('错误: <%= error.message %>')}))
            .pipe($.less())
            .pipe($.autoprefixer('last 2 version', 'not ie <= 8'))
            .pipe($.sourcemaps.write('./maps'))
            .pipe(gulp.dest(config.staticPath+'/css'))
            .pipe(reload({ stream: true }))
})
```

* `$.sourcemaps.init()`, `$.sourcemaps.write('./maps')` sourcemaps声明
* `$.less()` less 文件编译
* `$.autoprefixer('last 2 version', 'not ie <= 8')` 浏览器css 语法自动增加前缀（-webkit，-moz），最新两款浏览器，IE8以上

插件：

* [https://github.com/floridoo/gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
* [https://github.com/plus3network/gulp-less](https://github.com/plus3network/gulp-less)
* [https://github.com/sindresorhus/gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)


### 4. 即时刷新 watch

即时刷新主要是监听静态资源和 html 页面文件的内容变更，浏览器第一时间刷新页面。 使用 `gulp.watch`搭配`browser-sync` 的 `reload` 函数

```
// 监听及时刷新
gulp.task('watch', function() {
    gulp.watch(config.template + '/**/**.html', ['template'])
    gulp.watch(config.staticPath + '/less/**/**', ['less'])
    gulp.watch(config.staticPath + '/js/**/**').on('change', reload)
    gulp.watch(config.staticPath + '/images/**/**').on('change', reload)
})
```



`reload`在文件头部的声明使用

```
// http server
var browserSync = require('browser-sync').create()
var reload      = browserSync.reload


...
    .pipe(reload({ stream: true }))
```

插件：

* [https://browsersync.io/](https://browsersync.io/)

### 5. sprite 雪碧图合并

sprite雪碧图合并可以将多张图片生成一张图片并生成 css 样式文件

```
var spritesmith = require('gulp.spritesmith')

spritesmith({
    imgPath: '../images/sprite/icon-home.png?v='+ config.version,
    imgName: folder+'.png',
    cssName: '_'+ folder+'.css',
    padding: config.sprite_padding
})
```

因此可以设计出多张 sprite 并发处理。详看：[https://github.com/tomieric/gulp-browsersync-boilerplate/blob/master/gulp/task/spriteTask.js](https://github.com/tomieric/gulp-browsersync-boilerplate/blob/master/gulp/task/spriteTask.js) 

### 6. browser-sync 配置

在上一篇就介绍了`browser-sync` 作为 http server 服务的优点。这里我们就使用 `browser-sync`的 api 搭载 gulp 来使用。

```
// http server
var browserSync = require('browser-sync').create()

// 启动服务
gulp.task('server', function() {

    browserSync.init({
        // 界面管理工具
        ui: {
            port: 8080,
            weinre: { // weinre工具移动设备代理端口
                port: 9090
            }
        },
        server: {
            // 目录都作为根目录访问
            baseDir: ['./'+ config.destPath, './static'],
            directory: true,
            routes: {
                '/bower_components': './bower_components'
            }
        },
        host: Lib.getIPAddress(),
        port: config.port,
        // 使用浏览器打开
        // 可以自定义配置
        //   browser: ['chrome', 'firefox', 'Internet Explore']
        // 只启动 chrome 开发
        browser: ['google chrome','chrome'],
        // 管理代理
        // middleware: [jsonProxy]
    })
})
```

具体的`browser-sync` 配置和介绍请看系列一的介绍。传送门： [即时刷新的browser-sync](/2016/09/01/startkit-1/)

### 7. 接口代理

在前端开发中比如需要ajax请求数据，做 js 模板的渲染等，我们如何请求另一台服务器的数据呢？很明显存在着跨域问题，很多同学说还不简单使用 jsonp 啊。

但是不是还有比 jsonp 更简单的呢，就是将另一台服务器的接口代理到本地服务器，这样就作为同域处理了，比如我们代理了测试服务器上的数据，前后端的开发彼此不受影响，前端发布到测试服务器后可以上线对接。

这里使用http 代理中间件`http-proxy-middleware`, 支持 `connect`,`express`,`browser-sync`

导入`http-proxy-middleware`

```
// http proxy
var httpProxy = require('http-proxy-middleware')

// 代理本地 http 请求以`/api/`开头的
// 统一返回 代理到测试服务器上接口数据
// 比如本地请求 /api/getUserInfo 返回的是测试服务器上的/getUserInfo接口数据
var jsonProxy = httpProxy('/api/', {
    target: 'http://xxx.xxx.xxx.xxx:2016',
    changeOrigin: true,
    pathRewrite: {
        '/api': ''
    },
    logLevel: 'debug'
})
```

在`browser-sync`中启用代理

```
browserSync.init({
    ...
    // http proxy 
    middleware: [jsonProxy]
})
```

插件：

* [https://github.com/chimurai/http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

### 8. 默认任务

`gulp` 命令默认执行 `gulp.task('default', fn)` 定义的任务。 如何将我们以上的任务组合在一起，使用`gulp.start([task1, task2])`, 由于`gulp.start`是并发式执行任务，这里推荐更好的队列方式插件来组合执行任务，按照声明的先后执行 task。

```
gulp.task('default', function(cb){
    $.sequence('template:clean', ['template', 'less'], 'server', 'watch')(cb)
})
```

插件：

* [https://github.com/teambition/gulp-sequence](https://github.com/teambition/gulp-sequence)

## 构建发布生产及配置文件

构建发布生产环境主要做静态文件压缩，增加版权信息，拷贝。这里不详细阐述，具体查看 github。

配置文件 `config.json`，自定义分离出弹性可配置项，只有开发者自行修改 json 的字段，比如开发环境端口，生产环境预览端口等。生成发布的目录，在前公司直接生成到 svn 的目录上，再同步到公司项目。



Git项目地址：
[https://github.com/tomieric/gulp-browsersync-boilerplate](https://github.com/tomieric/gulp-browsersync-boilerplate)， 欢迎 star！

* [配置5小时开发2分钟系列（1）](/2016/09/01/startkit-1/)
* [配置5小时开发2分钟系列（2）](/2016/09/03/startkit-2/)
* [配置5小时开发2分钟系列（3）](/2016/09/05/startkit-3/)
* [配置5小时开发2分钟系列（4）](/2016/09/08/startkit-4/)·