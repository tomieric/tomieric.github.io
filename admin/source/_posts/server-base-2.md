title: Linux运维 - Mac用户免密码登录
date: 2017/08/25
thumbnailImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG7.jpeg?imageView2/1/w/280/h/280/interlace/1/q/60
autoThumbnailImage: yes
coverImage: http://oenwuky9h.bkt.clouddn.com/WechatIMG7.jpeg?imageView2/0/interlace/1/q/60
tags:
    - 运维
    - linux
    - docker
categories: 运维
---


> 使用无密码登录服务器

<!-- more -->

```
# 生成新密钥
> ssh-keygen

# 一路回车

# 查看生成密钥
> ls ~/.ssh

# id_rsa.pub id_rsa

# 将id_rsa.pub 复制到服务器主目录
# 使用ssh-copy-id工具代劳
> brew install ssh-copy-id

# 安装后使用工具
> ssh-copy-id 用户名@服务器 IP
# 输入密码
> ...

# 成功后直接 ssh 登录不需要输入密码
> ssh 用户名@服务器 IP
```
