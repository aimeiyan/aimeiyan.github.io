---
layout: post
title:  http-watcher——自动刷新页面工具
---



http-wathcer 是朋友写的一个小工具，主要是修改css保存后，页面会自动刷新，能立刻看到样式修改后的页面效果，同时也充当一个简单的http-server。

### 一、下载

[http://shenfeng.me/introduce-http-watcher.html](http://shenfeng.me/introduce-http-watcher.html)

或

[https://github.com/http-kit/http-kit](https://github.com/http-kit/http-kit)


### 二、安装

将http-watcher加入到PATH下。

### 三、启动命令

```
http-watcher -port=8000 －root={代码目录} -proxy={动态程序端口}
```

例如：

```
http-watcher -port 8000  打开浏览器，访问http://127.0.0.1:8000。同事们也可通过你的IP，实时查看
```


### 四、相关指令

http-watcher –h  （详细帮助）

http-watcher -monitor=none

http-watcher -monitor=false -port 9092

http-watcher -port 9092 -ignores='.git’



