---
title: CSS居中方案
date: 2017-03-06 05:57:51
category: 技术
tags: [Web, CSS]
---

# 垂直居中
## 单行小元素、文本、图片
设置line-height
``` html
<div class="vertical">content</div>
```
``` css
.vertical{
    line-height: 20px;
}
```
原理：上下半行间距相等

## 高度固定时
利用绝对定位和负值margin

<!--more-->

1. 自身负margin
``` html
<div class="container">
    <div class="vertical">content</div>
</div>
```
``` css
.container{
    position: relative;
}
.vertical{
    height: 100px;
    position: absolute;
    top: 50%;
    margin-top: -50px; /* height / 2 */
}
```
原理：利用绝对定位将元素移至中心，然后利用负margin平移元素

2. 兄弟元素负margin
``` html
<div class="container">
    <div class="before_vertical"></div>
    <div class="vertical">content</div>
</div>
```
``` css
.container{
    height: 100%;
}
.before_vertical{
    height: 50%;
    margin-bottom: -50px /*(/vertical).height / 2 */
}
.vertical{
    height: 100px;
}
```
原理：利用兄弟节点占据一半高度，再利用负margin修改文本流

## 对于现代浏览器自适应内容高度时
1. 利用display:table
``` html
<div class="container">
    <div class="vertical">content</div>
</div>
```
``` css
.container{
    height: 300px;
    display: table;
}
.vertical{
    display: table-cell;
    vertical-align: middle;
}
```
原理：vertical-align在table-cell中有效

2. 利用兄弟节点
``` html 
<div class="container">
    <div class="vertical"><p>test</p></div>
    <div class="extra"></div>
</div>
```
``` css
.container{
    height: 600px;
}
.vertical,
.extra{
    display: inline-block;
    vertical-align: middle;
}
.extra{
    height: 100%;
}
```
原理：在inline-block的情况下，让vertical元素与占满容器高度的兄弟元素中部对齐

## 容器高度不确定
利用上下padding
``` html
<div class="container">
    <div class="vertical"></div>
</div>
```
``` css
.vertical{
    padding-top: 30px;
    padding-bottom: 30px;
}
```
原理：用相等的上下padding占据容器上下边（PS：对于块级元素用margin应该也可以）

## 其它情况
用js……

# 水平居中
## 居中元素宽度确定时
1. 利用margin的auto属性
``` html
<div class="horizontal">content</div>
```
``` css
.horizontal{
    width: 200px;
    margin: 0 auto;
}
```
原理：当水平margin为auto时，浏览器在计算位置时会自动将元素居中处理

2. 利用负margin
``` html
<div class="container">
    <div class="horizontal">content</div>
</div>
```
``` css
.container{
    position: relative;
}
.horizontal{
    width: 200px;
    position: absolute;
    left: 50%;
    margin-left: -100px; /* width / 2 */
}
```
原理：同垂直居中

## 宽度自适应居中
对行内元素设置text-align
``` html
<div class="container">
    <div class="horizontal">test0</div>
    <div class="horizontal">test1</div>
</div>
```
``` css
.container{
    text-align: center;
}
.horizontal{
    display: inline-block;
}
```
原理：利用text-align的行内对齐功能

## 对float元素居中
利用嵌套的相对位移
``` html
<div class="float_container">
    <div class="container">
        <div class="horizontal">test0</div>
        <div class="horizontal">test1</div>
    </div>
</div>
```
``` css
.float_container{
    float: left;
    position: relative;
    width: 100%;
}
.container{
    clear: left;
    float: left;
    position: relative;
    left: 50%; /* 相对100%的总宽度 */
}
.horizontal{
    float: left;
    position: relative;
    right: 50%; /* 相对container的宽度 */
}
```
原理：container相对总宽度移动50%，其左边线位于中心。居中元素相对container反向移动50%,其中间元素的中心将与container左边线对齐。

## 利用CSS3
1. flex布局
``` html
<div class="container">
    <div class="horizontal">test0</div>
    <div class="horizontal">test1</div>
</div>
```
``` css
.container{
    display: flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: -moz-flex;
    justify-content: center;
    -webkit-justify-content: center;
    -ms-justify-content: center;
    -moz-justify-content: center;
}
```
原理：[深入了解 Flexbox 伸缩盒模型 ](http://www.w3cplus.com/blog/666.html)

2. fit-content
``` html
<div class="container">
    <div class="horizontal">test0</div>
    <div class="horizontal">test1</div>
</div>
```
``` css
.container{
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin: 10px auto;
}
```
原理：[理解CSS3 max/min-content及fit-content等width值](http://www.zhangxinxu.com/wordpress/2016/05/css3-width-max-contnet-min-content-fit-content/)

# 参考
* [CSS制作水平垂直居中对齐 ](https://www.w3cplus.com/css/vertically-center-content-with-css)
* [六种实现元素水平居中](http://www.w3cplus.com/css/elements-horizontally-center-with-css.html)
* [Horizontally Centered Menus with no CSS hacks](http://matthewjamestaylor.com/blog/beautiful-css-centered-menus-no-hacks-full-cross-browser-support)
