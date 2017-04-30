---
title: JS模块化规范
date: 2017-04-16 19:54:06
category: 技术
tags: [Javascript, 前端, 模块化]
---
# CommonJS
## CommonJS是什么？
JS模块化的规范之一，主要用于非浏览器环境

## 诞生背景
在非浏览器环境下编程需要良好的模块管理，而且能让每个模块在其自身作用域中执行。

## 代表应用
Nodejs

## 核心思路
通过文件组织模块，文件内的定义对模块私有
每个模块通过module.exports导出，通过require()导入

<!--more-->

## 核心对象
### require——引用
``` js
//默认情况相当于，请注意引用关系及覆盖写值的问题
var require = module.require;
```
require() 读入并执行js文件(后缀默认为'.js')，返回该模块的module.exports
require.resolve() 获取上次加载的文件名
require.cache[module] 缓存
require.main 是否无调用者
require.extensions 根据文件的后缀名，调用不同的执行函数

定位方式
1. require('/path') 绝对定位
2. require('./path') 相对定位
3. require('module') 从node_modules中加载或从核心模块中加载
4. require('module/path') 从module处寻找路径
5. Not found 尝试.js,.json,.node

加载过程
1. 检查Module._cache中是否缓存，若缓存则直接返回
2. 创建新的Module实例并加入缓存
3. 找到模块目录
4. 寻找package.json中的main字段对应文件
5. 2失败，加载目录下的index.js/index.node
6. 执行文件
7. 过程出错则从缓存中删除文件
8. 返回模块的module.exports拷贝

发生循环依赖时：部分加载

### exports——导出
``` js
//默认情况相当于，请注意引用关系及覆盖写值的问题
var exports = module.exports;
```
### module——自身定义
module.id 标识符，通常是带有绝对路径的模块文件名
module.filename 绝对路径文件名
module.loaded 是否已加载完
module.parent 调用该模块的模块
module.children 该模块调用的模块数组
module.exports 导出内容

## 执行过程
同步执行，顺序执行
每个模块只在第一次加载时运行并缓存结果，后续加载则读取缓存

# AMD
## AMD是什么？
Asynchronous Module Definition
## 诞生背景
服务器端的Nodejs依照CommonJS规范开创了JS模块化编程的新局面，我们希望在客户端也能进行模块化编程。
问题在于服务器端的模块都存储在本地，加载延迟很小。而客户端则需要从服务器端加载模块延迟很大，不能使用CommonJS的同步加载。
## 代表应用
require.js
curl.js
## 核心对象
define(id?, dependencies?, factory);
## 执行过程
异步执行
