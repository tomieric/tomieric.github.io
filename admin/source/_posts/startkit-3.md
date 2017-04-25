title: 配置5小时开发2分钟系列（3）—— webpack 搭配 react
date: 2016/09/05
thumbnailImage: http://oenwuky9h.bkt.clouddn.com/DSC_1275.jpg?imageView2/1/w/280/h/280/interlace/1/q/60
autoThumbnailImage: yes
coverImage: http://oenwuky9h.bkt.clouddn.com/DSC_1275.jpg?imageView2/0/interlace/1/q/60
tags:
    - gulp
    - browser-sync
    - webpack
categories: 前端构建
---

> 最近火遍朋友圈的 [在 2016 年学 JavaScript 是一种什么样的体验？](https://www.v2ex.com/t/310767)，如果有一天选择做了前端，请把我埋在，深深的配置里...

在前两年觉得前端是最容易入门上手的，而近两年感觉门槛高了，各种眼花缭乱的构建工具，各种配置。 

本篇带来的是 `webpack 搭配 react`

<!-- more -->

### webpack 介绍

`wepback` 是模块化构建工具，同类的用`browserify`,`FIS3`。`webpack`是支持`common.js`和`es6`模块化加载方式的系统，能根据模块化资源优化加载，抽取，合并等功能。非常适合单页面应用的 webapp 项目，同样的也支持多页面模块化管理，内置异步加载模块功能。主要组成部分：

* 代码分割
* loader加载
* 智能转换编译
* 插件系统

#### 安装webpack

```
npm init -yes 
npm install webpack --save-dev
```
安装完成后使用`webpack` 命令编译 js 文件

```
webpack <entry> <output>
```

或者使用默认配置文件`webpack.config.js`，编译时直接使用`webpack`即可。

`webpack`的配置大致以下几点：

* context 上下文环境，一般不怎么使用, 默认是配置文件当前目录
* entry   入口文件，字符串为单入口，数组为多入口，字面量对象声明{ 生成文件名: [入口文件]}
* output  输出文件，声明输出文件名，目录，cdn 等
* module  模块分割处理
    - loaders 加载器，根据模块的后缀名分别配置不同的加载器处理
    - preLoaders, postLoaders 预加载后或编译后处理
    - noParse 忽略模块声明
* resolve   模块路径声明，同node寻找模块方式
* devServer 搭载`webpack-dev-server`使用的配置
* plugins   声明使用插件，比如 css，js 的压缩
* etc.

```
module.exports = {
    entry: {
        bundle: './src/entry.js'
    },
    output: {
        path: './dist',
        filename: '[name][hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            // ...
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less']
        root: [path.resolve('.src')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
}
```

使用`webpack-dev-server`搭配启动项目，在配置文件中增加

```
...
    devServer: {
        hot: true,
        host: '127.0.0.1',
        port: 3000,
        proxy: {
            '/Api/*': {
                target: 'http://192.168.0.2:3000',
                rewrite: function(req) {
                    req.url = req.url.replace(/^\/Api/, '')
                }
            }
        }
    }
...
```

[http://webpack.github.io/](http://webpack.github.io/)

### react 介绍

`react` 是 facebook 开源的用户交互js 库，是单向的数据流模式，有区别于 mvvm 框架的`vue`, `angular`。 `react` 推出了自己的语法解析器 `jsx`，同样的支持 es6的写法， `react`是基于虚拟 dom（virtual Dom）因此具有良好的性能，包括最近比较火的微信小程序底层也是使用了`react`。

```
class HelloMessage extends React.Component {
  constructor(props) {
      super(props)
      this.state = {}
  }  
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(<HelloMessage name="John" />, mountNode); 
```

初学者建议在这里学习 [http://babeljs.io/repl/](http://babeljs.io/repl/)

`react` 主要涉及内容：

* require 包导入
* react 
* react-dom 
* react.component 
* react-router
* 构造函数constructor
* 生命周期
* 父子组件值传递props
* 组件状态管理 state
* jsx 语法标签
* react 事件绑定

**标准的组件写法**

```
/**
 * 组件规范
 * by tommyshao
 * 2016-08-03
 */

// 引入React
import React,{ Component } from 'react'

// 导入默认 组件类
export default class Person extends Component {
    static propTypes = {
        name: React.PropTypes.string
    }
    // 构造函数
    constructor (props) {
        // 继承react组件
        super(props)

        // 定义state
        this.state = { smilling: false }

    }

    // 生命周期
    componentWillMount() {}
    componentDidMount() {}
    componentWillUnmount(){}

    // getters and setters
    // es6
    get attr() {}

    // 事件函数
    // band(this)
    handleClick = () => {

    }

    // 渲染
    renderChild() {}
    render() {
        return (
            <div className="component">
                <button onClick={ this.handleClick }>Click</button>
            </div>
        )
    }
}
```

关于 `react-router` 的介绍，参照[https://github.com/ReactTraining/react-router](https://github.com/ReactTraining/react-router)

这里使用的是`webpack`中的`require.ensure([])` 特性做 react 程序的文件根据路由按需加载优化，并非 `all-in-one` 模式, 由于 react 本身体积不小加上其他依赖组件影响我们的首屏加载，比如你打开支付宝的[ant.design](http://ant.design/)官网会感觉好痛苦。

```
/**
 * 路由配置
 * 
 * by tommyshao
 */

import React from 'react'
import { Router, hashHistory } from 'react-router'

const routes = {
    component: require('../containers/common/layout').default,
    childRoutes: [
        {
            path: '/',
            indexRoute: {
                onEnter: (nextState, replace) => replace('Home')
            }
        },
        {
            path: 'Home',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../containers/index').default)
                })
            }
        }
    ]
}

export default <Router history={ hashHistory } routes={ routes } />
```


### ES6介绍

`ES6` 是`EMCAscript 6` 的简写，之前有介绍过[拥抱 ES6](/2016/02/21/get-stared-use-es6/)， [http://babeljs.io/repl/](http://babeljs.io/repl/)可以在线学习语法[http://babeljs.io/docs/learn-es2015/](http://babeljs.io/docs/learn-es2015/)。

通过`webpack`等工具编译后，`ES6`大部分语法转换成`ES5`, 大多数浏览器都支持`ES5`特性，个别浏览器需引入`es5-shim`等polyfill库,比如用 es6写的 jQuery 组件 [BrickPlus](http://frontui.github.io/BrickPlus/BP-JavaScriptComponents-Pagination.html)。

ES6常用语法:

* export,import
* => 箭头函数
* extends 继承
* static 常量定义
* class 类定义
* 字符串模板` `${name}` `
* default, let, const 关键字
* Promise
* fetch api

### react构建模板

react 构建模板我们需要分开 webpack 的配置文件和 react 的源文件，因此我们这样设计

```
├── README.MD
├── package.json      包信息
├── build              webpack配置
│   ├── ...
├── src               react源文件
    ├── ...
```

根据不同开发阶段将 `webpack` 的配置文件拆成3部分。

* webpack.base.config.js
* webpack.dev.config.js
* webpack.prod.config.js

#### webpack.base.config.js

主要声明入口文件，输出目录，模块别名，加载器处理， less 编译，autoprefixer，px2rem 等

[https://github.com/tomieric/react-webpack-boilerplate/blob/master/build/webpack.base.config.js](https://github.com/tomieric/react-webpack-boilerplate/blob/master/build/webpack.base.config.js)

#### webpack.dev.config.js

主要启用`webpack-dev-server`，使用热插件局部刷新，http 服务器，http 接口代理，自动浏览器预览。

[https://github.com/tomieric/react-webpack-boilerplate/blob/master/build/webpack.dev.config.js](https://github.com/tomieric/react-webpack-boilerplate/blob/master/build/webpack.dev.config.js)

#### webpack.prod.config.js

生产构建发布主要做模块优化，去除 wepback 冗余文件，按体积分块拆分文件，清空生产目录，js 压缩，添加版权信息，公共模块抽取等。

[https://github.com/tomieric/react-webpack-boilerplate/blob/master/build/webpack.prod.config.js](https://github.com/tomieric/react-webpack-boilerplate/blob/master/build/webpack.prod.config.js)

我们在`package.json`中声明命令分别使用不同的配置文件

```
...
 "scripts": {
    "start": "node node_modules/webpack-dev-server/bin/webpack-dev-server --config build/webpack.dev.config.js --inline",
    "build": "node node_modules/webpack/bin/webpack --config build/webpack.prod.config.js --progress --profile --colors"
  }
...
```

开发阶段启动命令: `npm start` 自动打开浏览器进行预览。

生成发布命令: `npm run build` 生成了`assets`目录。

### react 使用

当我们搭建好`webpack` 环境可以动手写 `react` 了， 首先看看入口文件 `entry.js`。


```JavaScript

// 导入字体
//import './public/fonts/frontui-icon/fonticon/style.css'

// 导入公共样式
import './public/less/common.less'

import React from 'react'
import { render } from 'react-dom'

// 路由配置
import routes from './routes'

// 渲染模板
render(
    routes,
    document.getElementById('app')
)
``` 



模板传送门：[https://github.com/tomieric/react-webpack-boilerplate](https://github.com/tomieric/react-webpack-boilerplate)，欢迎 star！


* [配置5小时开发2分钟系列（1）](/2016/09/01/startkit-1/)
* [配置5小时开发2分钟系列（2）](/2016/09/03/startkit-2/)
* [配置5小时开发2分钟系列（3）](/2016/09/05/startkit-3/)
* [配置5小时开发2分钟系列（4）](/2016/09/08/startkit-4/)