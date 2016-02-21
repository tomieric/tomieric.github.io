title: Hello World
date: 2016/02/20
tags:
  - 杂谈
categories: 杂谈
---

{% wide_image /assets/images/background.jpg  "A beautiful sunrise" %}

由于旧博客用`airpub.io`，多说的账号被`CSRF`攻击造成大部分博文被注入删除

说多了都是泪~~~~(>_<)~~~~

已经决定了新博客用`hexo`

### 博客历程
* 大学时期用免费asp主机，html模板
* 上班后用博客园
* 为了更多酷炫皮肤，用wordpress
* 打破限制，用免费php主机跑wordpress，买过域名`www.fenxiangyuan.com`
* 累了，用gitpage，静态html，域名过期续不了，换成`http://www.get2e.com`
* 启用`airpub`,在gitpage上直接动态写文章，不用经常git操作
* 发简历给猎头，猎头说博客东西好少，看了一下原来被攻击，好多文章丢失了，也找不回了，在多说上没有备份
* 决定还是以静态方式，选择hexo因为模板够漂酿。实在没钱买VPS，掏捣nodejs去搭建个博客。

### 关于博客发布

文档看的一头雾水，发布目录只能在hexo项目目录里

只能把项目弄到`admin`目录，`hexo deploy`生成的`public`目录，通过`gulpfile`（工作用这个比较熟）拷贝到根目录并清空`public`目录。

终于搞定了，在一个周末的下午。
