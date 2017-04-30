---
title: Node.js学习笔记2
date: 2017-03-04 09:49:46
category: 技术
tags: [Web, Node.js]
---

看到《Node.js实战》第三章了，这一部分讲的是Node.js的一些基础原理，挺长的，拆开慢慢看

# 模块管理
首先是为了让代码结构更加优雅的模块管理，这里书上原图比废话更能解决问题。
1. 包导出
    ![包导出](/image/nodejs_part3_package_share.png)

<!--more-->

2. 包查找
    ![包查找](/image/nodejs_part3_package_find.png)
3. 包入口
    ![包入口](/image/nodejs_part3_package_enter.png)

# 异步编程
然后知道怎么组织代码了，就来看Node.js的卖点异步编程吧。异步编程呢在Node里主要用两种方式实现。
1. 回调（一般为一次性逻辑）
2. 事件监听器（一般为重复性逻辑）

## 回调
这个其实很好理解，就是说我告诉程序这个异步操作你先做着，我也不管你做多久（当然，太久的话有时候还是该管的……），我也暂时不管你得到什么结果，总之你做完这件事儿就去给我执行另一个函数就好了。

## 事件发射器
这个其实做过点GUI编程的多少都该理解点意思，就是说平时没事儿干，就等事件（或者干点别的常规事务），然后来了事件，就响应它。

然后书中一开始实现了《UNIX网络编程》里的echo服务器……展示了一下Node的简洁性。

再然后，就出问题了……它基于net包实现了一个命令行上的聊天室。然而抄完代码，运行……嗯哼？每个客户自己发消息挺嗨，然而其它客户端就是不显示……忧伤。

用输出查了一下，是这里出的问题
``` js
var server = net.createServer(function(client)){
    /* Some code here */
    client.on('connect', function(){
        //这个回调函数从来没触发过……
        channel.emit('join', id, client);
    });
    /* Some code here */
}
```

几个意思……明明连接都是成功的呀。

顺手stackoverflow一下，找到了两个解答
1. [Node js net event : connect vs connection](http://stackoverflow.com/questions/19342910/when-is-the-connect-event-in-nodejs-net-module-emitted)
2. [when is the 'connect' event in nodejs net module emitted?](http://stackoverflow.com/questions/19342910/when-is-the-connect-event-in-nodejs-net-module-emitted)

其实这俩说了一个意思，就是net.createServer这个函数的回调响应的时候，其实已经完成了connection的事件了，其实这就相当于是在写

``` js
var server.on('connection', function(client)){
    /* Some code here */
    client.on('connect', function(){
        //这个回调函数从来没触发过……
        channel.emit('join', id, client);
    });
    /* Some code here */
}
```
能等到这个事件才怪orz……
所以把代码改成
``` js
var server = net.createServer(function(client)){
    /* Some code here */
    //直接emit就好，这时候已经完成connect了
    channel.emit('join', id, client);
    /* Some code here */
}
```
然后自己还犯了个错误，把退出的时候触发的leave事件写到了join事件中
``` js
channel.on('join', function(id, client)){
    /* Some code here */
    channel.on('leave', function(id)){
        channel.removeListener('broadcast', this.subscriptions[id]);
        channel.emit('broadcast', id, id + " has left the chat\n");
    }
}
```
结果……一个客户端断开连接，每个客户都会触发一次退出消息的emit……场面一度很混乱orz……

# 异步编程中的坑
前面我们说了，异步编程很好很快很方便。然而事情总是有两面性的，异步是方便了，然而需要同步协调的时序任务就有点麻烦了。
当然面对时序任务的话，完全可以不用Node平台（本来就不是它的强项）。但是人总是爱偷懒得，与其换个平台再配置一堆环境，还不如强行让Node支持时序处理，所以就有了以下解决方案。

## 串行任务
对于串行任务，把需要串行的异步函数放进一个数组里，然后每个异步任务结束前（即回调函数触发时），调用一个调度函数进行调度。
``` js
function func0(arg){
    /* Some code here */
    async0(arg0, function(err, res){
        if(err) next(err);
        next(null, res)
    });
}
function func1(arg){
    /* Some code here */
    async1(arg0, function(err, res){
        if(err) next(err);
        next(null, res)
    });
}
/* Many tasks ... */
tasks = [
    func0,
    func1,
    /* Many tasks ... */
];

function next(err, arg){
    if(err){
        /* Handle error */
    }
    var task = tasks.shift();
    if(task){
        task(arg);
    }
}

next(arg);
```
其实非要连着嵌套回调函数也可以，但是上面这种管理方法，更容易扩展和修改。

## 并行任务
对于并行任务，把需要并行的异步函数放进一个数组里，然后每个异步任务结束前（即回调函数触发时），调用一个计数任务完成情况的函数。
``` js
function func0(){
    /* Some code here */
    async0(arg0, function(err, res){
        if(err) { /* Handle err */ }
        checkFinished()
    });
}
function func1(){
    /* Some code here */
    async1(arg0, function(err, res){
        if(err) { /* Handle err */ }
        checkFinished()
    });
}
/* Many tasks ... */
tasks = [
    func0,
    func1,
    /* Many tasks ... */
];

var tasksFinished = 0;

function checkFinished(){
    ++tasksFinished;
    if(tasksFinished == tasks.length){
        //并行任务全部完成
    }
}

function run(){
    for(var task in tasks){
        task();
    }
}

run();
```
