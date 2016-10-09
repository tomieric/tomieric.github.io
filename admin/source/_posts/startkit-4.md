title: 配置5小时开发2分钟系列（4）—— react ie8 开发环境
date: 2016/09/08
thumbnailImage: http://oenwuky9h.bkt.clouddn.com/DSC_0049.jpg?imageView2/1/w/280/h/280/interlace/1/q/60
autoThumbnailImage: yes
coverImage: http://oenwuky9h.bkt.clouddn.com/DSC_0049.jpg?imageView2/0/interlace/1/q/60
tags:
    - gulp
    - browser-sync
    - webpack
categories: 前端构建
---

> 最近火遍朋友圈的 [在 2016 年学 JavaScript 是一种什么样的体验？](https://www.v2ex.com/t/310767)，如果有一天选择做了前端，请把我埋在，深深的配置里...

在前两年觉得前端是最容易入门上手的，而近两年感觉门槛高了，各种眼花缭乱的构建工具，各种配置。 

本篇带来的是 `react ie8 开发环境`

<!-- more -->

上一篇已经介绍了[webpack 搭配 react](/2016/09/05/startkit-3/)，这篇我将以它为基础进行修改。

### 关于 ES5

`ES5` 是 ECMAScript 5.1的简写，现大多数主流浏览器已经支持。[http://caniuse.com/#search=es5](http://caniuse.com/#search=es5),
对于不支持`ES5`语法的浏览器我们将引入`es5-shim`,`es5-shame`等 polyfill 库。

可以将 polyfill 的库合并成独立一个文件， 在模板中引入

```
 <!--[if lt IE 9]>
   <script src="es-polyfill.min.js"></script>
<![endif]-->
```

### 关于 react 0.14.x

`react 0.14.x` 是还支持 `IE8`的版本，在 IE8下还是需要注意一些问题的，可以关注项目：[https://github.com/xcatliu/react-ie8](https://github.com/xcatliu/react-ie8) 

### 关于 react-router 1.x.x 

在使用`react-router`搭配`react 0.14.x` 时需要注意一点是，必须把版本将到`1.0.3`,低版本的`react-router`在 ie8下需要安装`history`的npm 包支持

### webpack 配置

由于关键字`default`一些问题，我们需要将编译后es5的 js 文件再转回成 `es3`,因此在 `webpack.base.config.js` 中增加

```
...
    postLoaders: [
        {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
        }
    ]
...
```

### react开发 

`polyfill.js` 补丁文件

```
require('es6-promise').polyfill();
require('console-polyfill');

if(!Object.assign){
	Object.assign = require('object-assign');
}
```

`entry.js` 入口文件

```
/**
 * 入口文件
 * 
 * by tommyshao
 */
 
// 语法补丁
require('./polyfill')

// 导入字体
//import './public/fonts/frontui-icon/fonticon/style.css'
// 导入公共样式
import './public/less/common.less'



import React from 'react'
import { render } from 'react-dom'

// 路由配置
// import routes from './routes'
import AppRouter from './routes'

// 渲染模板
render(
    // routes,
    <AppRouter />,
    document.getElementById('app')
)
```

`route.js`路由的配置也需要做相应修改

```
/**
 * 路由配置
 * 
 * by tommyshao
 */

import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

const routes = {
    component: require('../containers/common/layout').default,
    childRoutes: [
        {
            path: '/',
            indexRoute: {
                // react-router 1.x api 差异
                onEnter: (nextState, replace) => replace('','Home')
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

// ie8 
export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={ hashHistory } routes={ routes } />
        )
    }
}

```


完整的模板地址：[https://github.com/tomieric/react-ie8-boilerplate](https://github.com/tomieric/react-ie8-boilerplate)，欢迎 star！


* [配置5小时开发2分钟系列（1）](/2016/09/01/startkit-1/)
* [配置5小时开发2分钟系列（2）](/2016/09/03/startkit-2/)
* [配置5小时开发2分钟系列（3）](/2016/09/05/startkit-3/)
* [配置5小时开发2分钟系列（4）](/2016/09/08/startkit-4/)