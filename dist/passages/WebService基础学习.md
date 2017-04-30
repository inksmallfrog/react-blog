---
title: WebService基础学习
date: 2017-02-26 11:56:36
category: 技术
tags: [Web, WebService]
---
鉴于这次的软件体系结构要交一份WebService的作业，所以顺路记一些学习笔记。
 
# 从WebService说起
很久很久很久以前，世界上是没有电脑的。
很久很久以前，两台电脑之间是不能通讯的。
很久以前，出现了Web，它连接起了不同硬件，不同平台的计算机。
于是，人们就开始希望**两台计算机之间的应用程序**，能够互相通讯，就有了[WebService](https://zh.wikipedia.org/wiki/Web%E6%9C%8D%E5%8A%A1)

<!--more-->

<br /> 
WebService,最简单的就是理解成一个互联网上的API接口。
类比互联网上常规的浏览网页的方式：你发来一个http规定的文档，我返回一种http规定的文档。最后浏览器根据http协定，将获得的内容解析并呈现。
而WebService则于此相似：你发来一个带有**协定好**的参数的**一定格式**的消息，我返回去一个带有**协定好**的返回值的**一定格式**的消息。最后你根据文档的格式，把返回值解析出来就好。
<br />
那么这里的问题是：
1. 消息的格式是什么，怎么跨平台传输？
2. 怎么协定参数和返回值？
 <br />
解决方案：
1. 因为这个请求是基于Web，所以首先想到了http。
    但是http只是两个设备间的一个交通工具，它不能负责识别各类复杂的数据。
所以呢，我们就需要约定一套新的数据访问协议，专门用来识别数据并且将它们包装或拆包。这样子就能把数据格式从设备平台上独立出来了。
而最为常用的数据访问协议，就是[SOAP](https://zh.wikipedia.org/wiki/SOAP)（简单对象访问协议），它是基于XML实现的数据访问。<br />
2. 共同约定一个文档格式呗。
    为了同时便于机器解析和人类阅读，比较常用的格式就是[WSDL](https://zh.wikipedia.org/wiki/WSDL)文档了。
这是一个基于XML的文档，至于里面标记的含义老师讲过一点但我没听，用的时候自行理解或者百歌就好。
 
# WebService服务流程
1. 用户发现了这个WebService服务
2. 用户阅读（或用工具解析后理解）它的WSDL文档
3. 用户将准备好的SOAP消息（带有需要参数的XML文档）发到服务器
4. 服务器解析SOAP消息后进行处理
5. 服务器产生SOAP消息（带有需求返回值的XML文档）并返回给用户
6. 用户收到SOAP消息并解析获取返回结果
 
# 测试WebService的服务
测试WebService的方法应该挺多的，但我这里偷下懒，就只用我们老师要求使用的[SOAPUI](https://www.soapui.org/)了。
1. 打开SOAPUI
2. 点击工具栏中的SOAP，添加SOAP工程Initial。
    WSDL一栏，填写本地的或Web上的WSDL地址。
这里我用了一个免费的中英互译WebService测试：地址为[http://www.webxml.com.cn/WebServices/TranslatorWebService.asmx?WSDL](http://www.webxml.com.cn/WebServices/TranslatorWebService.asmx?WSDL)
3. 找到我们要测试的服务( 那个HelloWebXml,只是个用来做测试的东西，无视掉就好)
4. SOAPUI已经帮忙生成好了SOAP消息框架，只需要自己填参数
5. 点击运行按钮进行测
基础的功能就是这些，我暂时用到这里就足够了，至于其它的应用，若有需要自行谷歌……

# 几个免费的WebService服务
1. [中国股票行情分时走势预览缩略图 WEB 服务](http://www.webxml.com.cn/webservices/ChinaStockSmallImageWS.asmx?WSDL)
2. [中国股票行情数据 WEB 服务](http://www.webxml.com.cn/WebServices/ChinaStockWebService.asmx?WSDL)
3. [中文<->英文双向翻译 WEB 服务](http://www.webxml.com.cn/WebServices/TranslatorWebService.asmx?WSDL)
4. [中文简体字<->繁体字转换 WEB 服务](http://www.webxml.com.cn/WebServices/TraditionalSimplifiedWebService.asmx?WSDL)
5. [Email地址验证 WEB 服务](http://www.webxml.com.cn/WebServices/ValidateEmailWebService.asmx?WSDL)
6. [验证码图片 WEB 服务](http://www.webxml.com.cn/WebServices/ValidateCodeWebService.asmx)
7. [天气预报 Web 服务](http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?WSDL)
