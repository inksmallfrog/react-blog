---
title: Node.js学习笔记1
date: 2017-03-03 12:33:06
category: 技术
tags: [Web, Node.js]
---

《Node.js实战》的第二章给出了一个Node.js实现的ChatRoom的例子。但是……就像其他很多书上的各种例子，在我的电脑上……跑不通。

这就比较尴尬，明明有着npm的Node相对C/Java来说不太应该出现依赖缺失包缺失等问题……但是作为一个更新着的脚本语言，版本不兼容永远是个大坑。

<!--more-->

# 初始的问题
抄好原书给出的服务器端的代码，然后开始运行
``` shell
node server.js
```
得到结果
``` shell
Store.prototype.__proto__ = EventEmitter.prototype;
                                        ^
TypeError: Cannot read property 'prototype' of undefined
    at Object.<anonymous> (/home/inksmallfrog/Code/js/nodeTest/nodePro/0/node_modules/socket.io/lib/store.js:35:41)
    at Module._compile (module.js:571:32)
    at Object.Module._extensions..js (module.js:580:10)
    at Module.load (module.js:488:32)
    at tryModuleLoad (module.js:447:12)
    at Function.Module._load (module.js:439:3)
    at Module.require (module.js:498:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/home/inksmallfrog/Code/js/nodeTest/nodePro/0/node_modules/socket.io/lib/manager.js:16:13)
    at Module._compile (module.js:571:32)
```
嗯？什么鬼，Google之，得到解释是书上例子用的Socket.IO的版本是~0.9.6，这个版本不能在node 7.x的版本上运行……

好吧，那既然这样不行，我就试试最新版本的Socket.IO吧。
于是在packat.json中做如下修改
``` js
"socket.io": "~0.9.6", => "socket.io": "latest",
```
然后
``` shell
npm install
```
OK, 获得了1.7.3的Socket.io版本。

# 新版本的灾难

运行服务器正常，然后打开网页的时候
``` shell
if (fn) process.nextTick(fn.bind(null, null, sids));
                              ^
TypeError: fn.bind is not a function
    at Adapter.clients (/home/inksmallfrog/Code/js/nodeTest/nodePro/0/node_modules/socket.io-adapter/index.js:196:31)
    at Namespace.clients (/home/inksmallfrog/Code/js/nodeTest/nodePro/0/node_modules/socket.io/lib/namespace.js:256:16)
    at joinRoom (/home/inksmallfrog/Code/js/nodeTest/nodePro/0/lib/chat_server.js:61:34)
    at Namespace.<anonymous> (/home/inksmallfrog/Code/js/nodeTest/nodePro/0/lib/chat_server.js:21:9)
    at emitOne (events.js:96:13)
    at Namespace.emit (events.js:189:7)
    at Namespace.emit (/home/inksmallfrog/Code/js/nodeTest/nodePro/0/node_modules/socket.io/lib/namespace.js:209:10)
    at /home/inksmallfrog/Code/js/nodeTest/nodePro/0/node_modules/socket.io/lib/namespace.js:177:14
    at _combinedTickCallback (internal/process/next_tick.js:67:7)
    at process._tickCallback (internal/process/next_tick.js:98:9)

```
哈?这又是什么鬼？再次Google之。得到的答案是Socket.IO新版本的调用方式改变了。心累。
怎么办呢，去官网查一下文档凑合着改改吧……[Socket.IO](https://socket.io/)

然而，这个官网的服务器好像是……挂了？我服……

幸好我们还有StackOverflow和Github Issue这种东西

参考这个[Socket.IO issue#2428](https://github.com/socketio/socket.io/issues/2428)改掉代码。
``` js
socket.emit('rooms', io.sockets.manager.rooms); => socket.emit('rooms', io.of('/').adapter.rooms);

var usersInRoom = io.sockets.clients(room); => var usersInRoom = io.of('/').in(room).clients;
```
OK，可以正常运行了。

# 房间列表中的随机字符串
然而运行是没问题了，可是房间列表和房间用户根本就不显示啊！
那就让它输出一下看看这个io.of('/').adapter.rooms看看到底是获得了什么东西。
``` shell
{ 
    oInACthwnqMzY7KBAAAA: Room { 
       sockets: { oInACthwnqMzY7KBAAAA: true }, 
        length: 1 
    },
    Lobby: Room { 
        sockets: { oInACthwnqMzY7KBAAAA: true }, 
        length: 1 
    } 
}
```
我们看到了默认的房间名Lobby,这个没问题。可上面那个随机字符串是什么鬼？不想动脑子了，直接[stackoverflow](http://stackoverflow.com/questions/6631501/how-to-list-rooms-on-socket-io-nodejs-server)找到了一个不错的解决方法。正准备直接搬运过来。

嗯？等等，sockets，这里的内容应该放的是房间里的用户的socket吧？那这么说来Socket.IO的新版本会给每个用户的SocketId也创建一个独立的房间咯？噗……可怕的随机字符串。

那想到这里，房间列表和房间里面的用户都可以解决了。
将对应代码做如下替换
``` js
//服务器端 chat_server.js
socket.on('rooms', function(){
            var rooms = [];
            var rooms_and_sockets = io.sockets.adapter.rooms;
            if(rs){
                for(var room_or_socket in rooms_and_sockets){
                    if(!rooms_and_sockets[room_or_socket].sockets.hasOwnProperty(room_or_socket)){
                        rooms.push(room_or_socket);
                    }
                }
            }
            socket.emit('rooms',  rooms);
        });

var usersInRoom = io.sockets.adapter.rooms[room];
    if (usersInRoom.length > 1){
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        var i = 0;
        for(var socketId in usersInRoom.sockets){
            if(socketId != socket.id){
                if(i > 0){
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[socketId];
                ++i;
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
```
由于房间列表原来的Json对象格式替换为了数组格式
客户端做如下修改
``` js
//chat_ui.js
socket.on('rooms', function(rooms){
        $('#room-list').empty();
        for(var i in rooms){
            if(rooms[i] != ''){
                $('#room-list').append(divEscapedContentElement(rooms[i]));
            }
        }
        $('#room-list div').click(function(){
            chatApp.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        });
    })
```
OK,just run it.
