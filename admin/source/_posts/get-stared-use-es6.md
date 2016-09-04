title: 拥抱ES6(一) - 认识babel
date: 2016/02/21
tags:
  - es6
  - babel
  - javascript
  - js
categories: javascript
---

{% wide_image /assets/images/post/20160107202032_470.jpg  "Lost ES6" %}

> Babel 是一个 JavaScript 编译器。
> 今天就来用下一代 JavaScript 语法写代码吧！

EMAscript已经发布了`es2015`也就是`ES6`, 提供了丰富的API和函数编程语法，但由于各浏览器的支持性还是有限，我们需要折衷的办法——编译器。

早在`ES6`发布前，`babel`已经活跃在前端开发社区中，比如facebooke的开源框架`react`就很早使用了`babel`

<!-- more -->

## 安装babel

```
[sudo] npm install -g babel
```

安装完成后可以在终端中使用`babel`命令


### 常用命令
* `-o` 编译输出文件
* `-s [inline]` 生成`sourcemap`文件

**example**

```
babel script.es -o script.js
```

用`*.es`命名文件是更好的区分es6语法源文件和编译文件

babel有许多优秀的插件，利用插件我们可以将`es6`语法转化成相应的对应`javascript`版本文件

**插件集合**

[http://babeljs.io/docs/plugins/](http://babeljs.io/docs/plugins/)

我们需要通过使用插件来支持最新的`es`语法，现在我们使用最新的`ES6`语法，将使用`ES2015 preset`这个插件

[http://babeljs.io/docs/plugins/preset-es2015/](http://babeljs.io/docs/plugins/preset-es2015/)

### 安装 `babel-preset-es2015`

```
npm install babel-preset-es2015
```

### 配置`.babelrc`

babel的编译可以通过读取`.babelrc`文件配置中的`presets`插件集进行编译。

为项目创建一个`.babelrc` 文件

```
touch .babelrc
```

我们可以看到当前目录下增加了这个文件，然后编辑声明使用`es2015`

```
// .babelrc
{
	"presets" : ["es2015"]
}
```

重新编译`script.es`文件

```
babel script.es -o script.js
```

源文件：

```
// script.es
let a = 1;
```

编译完成文件：

```
// script.js
"use strict";

var a = 1;

//# sourceMappingURL=script.js.map
```


## 相关资料

[http://babeljs.io/](http://babeljs.io/)

[http://babeljs.cn/ 中文](http://babeljs.cn/)

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)
