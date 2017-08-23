title: Linux运维 - 用户操作篇
date: 2017/08/23
thumbnailImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG7.jpeg?imageView2/1/w/280/h/280/interlace/1/q/60
autoThumbnailImage: yes
coverImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG7.jpeg?imageView2/0/interlace/1/q/60
tags:
    - 运维
    - linux
    - docker
categories: 运维
---


> 由于不建议直接使用 `root` 用户直接登录，因此我们需要创建新的管理员用户...

<!-- more -->


```
# shell
# -----------------

# 登录服务器
> ssh root@服务器 IP

# 添加用户名
> adduser 用户名

# 添加对应用户名密码
> passwd 用户名

# 提示键入密码
> ... 输入密码

# 为用户添加管理员权限角色，centos 为 `wheel` 角色
> gpasswd -a 用户名 wheel

# 切换用户
> su 用户名

# 查看文件
> cat /etc/sudoers

# 提示没有权限，命令增加 sudo
> sudo cat /etc/sudoers

# 退出登录
exit

# 用新用户登录
> ssh 用户名@服务器 IP

# 密码
> ...
```