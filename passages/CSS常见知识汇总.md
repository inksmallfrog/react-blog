---
title: CSS常见知识汇总
date: 2017-03-05 17:26:43
category: 技术
tags: [Web, CSS]
---

# 语法语义
## 盒模型(Box Model)
1. 内容(Content)
    内容，背景，颜色，图片
2. 内边距(Padding)
    背景，颜色，图片
3. 边框(Border)
4. 外边距(Margin)


## 盒类型
1. containing boxes: 一个block
2. inline boxes: block中的各个子块，分为非匿名（由行内标签产生）和匿名的（被行内标签分割或由CSS的content属性产生）
3. line boxes: 每一行的文本
4. content area: 围绕文字的盒子，高度由font-size决定

<!--more-->

## 字体
### font-size
1. px相对于显示器屏幕分辨率的固定值
2. em相对不设置font-size时的尺寸进行乘法运算，默认1em = 16px
3. rem相对于html(根元素)的font-size进行计算，<=IE8的版本无效
4. vw, 1vw = viewport.width / 100
5. vh, 1vh = viewport.height / 100
6. vmin, min(vw, vh)
7. vmax, max(vw, vh)

## 行高
![行高示意图](/image/css_lineheight_description.png)
### 行组成
1. 顶线(top line)
2. 中线(middle line)
3. 基线(base line)
4. 底线(bottom line)

### 相关名词
1. 行高(line-height)：两行文字基线之间的垂直距离
2. 行间距(line-height - font-height)：一行底线至下一行顶线的垂直距离
3. 半行间距((line-height - font-height) / 2)：顶线到上行内框或底线到下行内框的距离

### line-height属性
可取值: normal(默认，1.0-1.2), inherit, 百分比, 长度(px/em), 纯数字
写法:
``` css
/* 单独 */
div{
    line-height: normal;
}
/* 和font-size写在一起 */
div{
    font: 100%/20px /*font-size: 100% & line-height: 20px*/
}
```
继承:
1. 百分比：继承自父元素的font-size * line-height
2. 长度：继承值
3. 纯数字：自己的font-size * line-height

### line-boxes' height
height = 行内所有非替换标签产生的inline-boxes中: max(line-height)


## padding & margin
百分比值均根据包含块的**宽度**计算
### 负外边距(negative margin)
#### 作用于width可确定的static元素(行内元素，定义width的块元素)
1. margin-top, margin-left的负值会使元素向该方向平移
2. margin-bottom, margin-right的负值会使后续文本流元素被拉入

#### 作用于width不可确定的static元素(未定义width的块元素)
margin-left, margin-right的负值会使元素width增大
#### 作用于浮动元素
在“浮动流”中与文本流效果相似
### 外边距合并(margin collapsing)
1. 邻近兄弟元素
2. 父元素与第一或末尾子元素之间
3. 空元素的上下外边框

## vertical-align
应用范围：inline-level, table-cell, ::first-letter, ::first-line

## 替换元素与非替换元素
### 替换元素(replaced elements)
浏览器根据其标签的元素与属性来判断显示具体的内容
据我了解替换元素和空元素是同一类东西的不同分类方法
eg.
``` html
<img/>
<input/> 
<textarea></textarea> 
<select></select>
<object></object>
```

### 非替换元素(non-replaced elements)
元素告知浏览器内容进行渲染。
非替换行内元素设置垂直padding时不会影响行高（所以可能会和上方或下方的containing-box 重叠），但会影响内容区高度，设置垂直margin无意义。


# 浏览器
## 主流浏览器渲染引擎
1. IE - Trident
2. Safari - Webkit(WebCore + JSCore)
3. Chrome - Chromium(<Chrome 28.0.1469.0, Webkit分支)，Blink(Webkit分支)
4. Opera - Elektra(Opera4-6), Presto(<Opera12.17), Chromium, Blink
5. Firefox - Gecko

## 主流浏览器JS引擎
1. IE - Chakra
2. Safari - Webkit中的JSCore
3. Chrome - V8
4. Opera - LinearA(Opera4.0-6.1), LinearB(Opera7.0-9.2), Futhark(Opera9.5-10.2), Carakan(>Opera10.50)
5. Firefox - 很多……最新的是OdinMonkey(>Firefox22.0)

## CSS hack
利用浏览器对CSS不同的解析特性，针对对不同浏览器的CSS控制

# 参考
* [Line Height (中文版)](https://www.slideshare.net/daemao/line-height-2470819)
* [css行高line-height的一些深入理解及应用](http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)
* [深入理解CSS中的行高](http://www.cnblogs.com/rainman/archive/2011/08/05/2128068.html)
* [负margin用法权威指南 ](https://www.w3cplus.com/css/the-definitive-guide-to-using-negative-margins.html)
