title: nodeList-forEach
thumbnailImage: http://7xp5hh.com1.z0.glb.clouddn.com/vintage-140.jpg
autoThumbnailImage: yes
date: 2014/10/11
tags:
    -ES5
    -javascript
categories: JavaScript
---

### nodeList-forEach

```
array.forEach(callback[, thisArg])
```


**描述**

forEach 方法按升序为数组中的每个有值的元素执行一次给定的 callback
 函数，只有在那些有值的索引上才会调用 callback 函数，那些被删除掉的索引或者从未赋值过的索引将会被跳过。

callback 函数会被依次传入三个参数：

* 元素值
* 元素索引
* 被遍历的数组对象本身

<!-- more -->


详细介绍

 [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

1.nodeList能直接使用forEach函数么？

比如我们有下面这样的代码

```
document.querySelectorAll( 'ul.grid > li > figure' ).forEach(function(el, i){
    console.log(el);
});
```

结果是出错了：

```
TypeError: Object #<NodeList> has no method 'forEach'
```

nodeList对象是没有forEach方法的，forEach方法是数组的一个内置方法。

那我们直接输出

```
document.querySelectorAll( 'ul.grid > li > figure' )
```

会得到什么，在控制台上可以看到一个数组对象。

我们知道nodeList是类似数组的对象，那可以通过Array.prototype.slice将nodeList转换成数组。

```
[].slice.call( document.querySelectorAll( 'ul.grid > li > figure' ) ).forEach( function( el, i ) {
    console.log(el);
});
```
