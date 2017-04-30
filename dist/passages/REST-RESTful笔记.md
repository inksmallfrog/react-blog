---
title: REST&RESTful笔记
date: 2017-02-26 11:58:59
category: 技术
tags: [Web, REST]
---
# REST
REST(Representational State Transfer)，由Roy Thomas Fielding在2000年的博士论文中提出，是一种互联网软件的**架构原则**。

## Resources
Representational的主语为资源，资源是网络上的一个实体。每一个网络上的资源都有一个URI(Uniform Resource Identify)标识。获取资源的过程就是调用其URI。

<!--more-->

## Representation
资源的载体，即其具体呈现的形式。
URI只代表资源实体，不代表其形式。
资源表现形式应在HTTP请求中用Accept和Content-Type字段指定。

## State Transfer
客户端想操作服务器，必须通过某种方式，让服务器在表现层上进行“状态转化”。
客户端的手端只能是HTTP协议：
* GET
* POST
* PUT
* DELETE

# RESTful
架构符合REST原则的**架构风格**
1. 每一个URI代表一种资源
2. 客户端和服务器之间，传递这种资源的某种表现层
3. 客户端通过四个HTTP动词，实现服务器上的“表现层状态转化”
