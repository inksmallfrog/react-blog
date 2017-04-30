---
title: Web移动端适配之映射关系与视口
date: 2017-04-17 09:45:11
category: 技术
tags: [前端, 移动端, 响应式]
---

上一篇讨论移动端适配的时候列出了一些结论，在这里回顾一下其中最重要的几个也就是今天要讨论的几项内容：
1. 在移动端下，设备厂商&浏览器厂商会为网页选定一个default_html_width作为默认html.width，并以此为基础建立“初始缩放”映射关系:default_html_width => device_width
2. html元素宽度的改变的根本原因在于html宽度的改变
3. 移动端用户缩放时不会改变html.width，只会修改映射关系。

不过在我们谈“初始缩放”之前，我们还是要回顾一下Web中涉及的所有映射关系。

<!--more-->

# 映射关系
我们这篇文章还是只讨论横向方向的映射。
> 记映射关系 a => b = 1 : x 代表a上每1个像素在b上显示为x个像素

## PC端
1. 程序员为在CSS(绝对的或相对的)编写宽度信息
2. 浏览器加载html，设置html.width=browser.width，设置映射关系html.width=>browser.width = 1:1，并计算html下的所有元素CSS属性
3. 当浏览器窗口大小改变时，重新设置html.width为browser.width，并计算html下的所有元素CSS属性
4. 当用户进行缩放时，重新设置html.width=browser.width / scaleRatio，设置映射关系html.width=>browser.width=1:scaleRatio，并计算html下的所有元素CSS属性

涉及到的映射关系：
1. 未缩放时html => browser = 1 : 1
2. 缩放时html => browser = 1 : scaleRatio

## 移动端
browser.width === device.width 恒成立
1. 程序员为html中的各元素编写CSS(绝对的或相对的)
2. 浏览器加载html，设置html.width为default_html_width，设置映射关系html.width=>browser.width = 1 : device.width / default_html_width，并计算html下的所有元素CSS属性
3. 当用户进行缩放时，设置映射关系(html.width / scaleRatio) => browser.width = 1 : device.width * scaleRatio / default_html_width

涉及到的映射关系：
1. 未缩放时html => browser = html.width=>browser.width = 1 : device.width / default_html_width
2. 缩放时html => browser = 1 : device.width \* scaleRatio / default_html_width

总结映射关系：
> PC端：
> 未缩放时html => browser = 1 : 1
> 缩放时html => browser = 1 : scaleRatio
> 移动端：
> 未缩放时html => browser = 1 : device.width / default_html_width
> 缩放时html => browser = 1 : device.width * scaleRatio / default_html_width

上面的结论里，device.width是一个固定值，你的设备宽度不太可能忽大忽小，而default_html_width默认情况下，是由设备厂商&浏览器厂商给定的某个固定值。

所以默认情况下device.width / default_html_width就是一个常数，我们先把它称作default-initial-scale。

那这么看来，default-initial-scale = 1的情况不就和PC端一样了么？是的，映射关系是一样的。但是如果我们改一下，把所有变量都列出来，就有区别了
> PC端：
> 未缩放时html => browser = html.width : html.width
> 缩放时html => browser = html.width : scaleRatio \* html.width
> 移动端：
> 未缩放时html => browser = 1 : default-initial-scale
> 缩放时html => browser = 1 : scaleRatio \* default-initial-scale

PC端改变html大小的方法很多，但在移动端，缩放不会改变html大小，甚至大部分移动设备旋转屏幕也不会，（凡事都有例外，当屏幕旋转后超出default_html_width的时候会改变html的大小，因为这时候就相当于是PC端了（比如iPad））所以可以把它当做常量看。

不过当default-initial-scale=1的时候，确实会有很多帮助，但之前也说了，大部分设备中浏览器的default-initial-scale都不是1，所以设置这个“初始缩放”值就是整个移动端适配的核心。

# initial-scale
## 它是计算谁的？
不过你可能还没想清楚，把initial-scale设为1到底有什么好处。当然就相当于页面不会发生映射。如果你和我刚接触这个概念时的想法一样，那你可能会想问这么做岂不是很糟糕？如果不发生映射，一个980px的html在320px的屏幕上就会被分成3份多20px……那么用户就不得不使用讨厌的横向滚动条来查看页面的特定位置。

但是，这种理解方式的前提是，你认为default_html_width是不会发生改变的。但我们在上一篇讨论中说过，这个值只是厂商们选出的一个合适的默认值。嗯，默认的意思就是，如果你希望它改变，它还是可以变化的。

所以说这个initial-scale，是在device.width固定的情况下，用来*自己定义html_width的*。

所以你把initial-scale设为1，就是说你希望你的html_width和device.width一样大，这样的话你在CSS中定义的16px的文字，不管在怎样的设备中都实实在在的是16px，再也不会像上一篇中被映射成了蚂蚁大的5px。

## 可是请等等，这里还有一个很严重的问题
可是请等等，这里还有一个很严重的问题……我们在上一篇讨论过，实际的像素是多大其实没什么意义，用户更在意物理上的距离，也就是用cm度量的那种距离……到底有多长？

我还是取来上一次说的设备A和B
> A设备：
> 物理尺寸：10cm \* 20cm
> 像素： 320cm \* 640cm
> 像素密度： 32px/cm

> B设备：
> 物理尺寸：10cm \* 20cm
> 像素： 640cm \* 1280cm
> 像素密度： 64px/cm

如果按照上面的计算规则，在我们把initial-scale都设为1的情况下，对于一个16px的文字
> A设备：
> 映射关系： 320 => 320
> 实际像素： x / 16 = 320 / 320 => x = 16px
> 实际长度： l = 16px / 32(px/cm) = 0.5cm

> B设备：
> 映射关系： 640 => 640
> 实际像素： x / 16 = 640 / 640 => x = 16px
> 实际长度： l = 16 / 64 = 0.25cm

这下问题就严重了，同样10cm宽的设备上，为了保证initial-scale为1结果产生了差异。那我们是不是应该针对B设备重设一个initial-scale，比如设为2.0？可是这样不就意味着我们必须针对每个设备不同的像素密度以及设备宽度来设置initial-scale么？这……已经可以弃疗了

# DPR
为了不让艰辛的前端程序员们弃疗，设备厂商也很早就考虑好了这种问题。以苹果公司为早起代表提出了DPR(Device pixel ratio)这个专门为CSS准备的概念。

它是什么意思呢？
> 设备像素比DPR(devicePixelRatio)是默认缩放为100%的情况下，设备像素和CSS像素的比值

这个定义读起来……反正我读着很头疼，关键是因为缩放的定义说不清。所以我理解的时候做了一些修正。

按照我们上一篇讨论的结果，缩放的实质就是映射。那100%的缩放就是不缩放也就是不映射

不映射？根据我们对移动端映射情况的总结，就是说initial-scale=1 && scaleRatio = 1。

所以我的定义就是
> DPR(devicePixelRatio)是无其它映射情况下，设备像素和CSS像素的比值

为什么要多写其它两字？因为DPR本身也是种映射……比如说在无其他映射的情况下，一个16px的文字，在DPR=2的设备上，就会被映射成2个实际的设备像素。

那有映射情况下的计算就是简单的数学比例关系的问题。

我们修改一下我们的映射关系
> 移动端：
> 未缩放时html => browser = 1 : device.width / (default_html_width \* DPR)
> 缩放时html => browser = 1 : device.width \* scaleRatio / (default_html_width \* DPR)

好了，这样子就完美了。我们再重新看这个东西，device.width是常量，DPR呢？我们说这个是由设备厂家给出的定值，比如苹果厂家为iphone5设计的DPR=2，而default_html_width也是常量。

那么我们可以重新定义default-initial-scale = device.width / (default_html_width \* DPR);
> 移动端：
> 未缩放时html => browser = 1 : default-initial-scale
> 缩放时html => browser = 1 : scaleRatio \* default-initial-scale

这时候我们看起来又回到了原始的位置……但其实我们再次尝试设置initial-scale的时候

# 全新的initial-scale
因为device.width / (default_html_width \* DPR)中的device.width，DPR是绝对不会变的，只有html_width有商量的余地。

所以当你修改initial-scale的时候，仍然只会影响html_width的值。
> html_width = device.width / (DPR \* initial-scale)

继续来看设备A和B，这次设备厂家给我们提供了新数据
> A设备：
> 物理尺寸：10cm \* 20cm
> 像素： 320cm \* 640cm
> 像素密度： 32px/cm
> DPR：1

> B设备：
> 物理尺寸：10cm \* 20cm
> 像素： 640cm \* 1280cm
> 像素密度： 64px/cm
> DPR：2

如果按照上面的计算规则，在我们把initial-scale都设为1的情况下，对于一个16px的文字
> A设备：
> html_width = 320 / (1 \* 1) = 320
> 映射关系： 320 => 320
> 实际像素： x / 16 = 320 / 320 => x = 16px
> 实际长度： l = 16px / 32(px/cm) = 0.5cm

> B设备：
> html_width = 640 / (1 \* 2) = 320
> 映射关系： 320 => 640
> 实际像素： x / 16 = 640 / 320 => x = 32px
> 实际长度： l = 32 / 64 = 0.5cm

欢呼吧，只要设备厂家给定了合适的DPR的值，你的initial-scale=1就可以正常工作了！

# 这些思路我理解了，可是……这种技术就叫做……initial-scale技术么？
如果你学过面向对象程序设计，也知道那些设计模式，你就该知道一个合理的名字对于技术交流有多么重要。

不过一个东西有了名字也是个麻烦事，因为我们都遇到过两个人对同一个名词有着完全不同的理解的情况。

所以说无论是我上面自己扯出来的映射，还是各种大神们说的缩放，有些意义上是相同的有些则有一点点区别，不存在名字上好不好的问题，只有对你好不好理解的问题。所以……

> 你理解就好

就比如说这个“初始缩放”我一直认为它应该只是个映射而不该当成（我理解的）缩放……即便缩放本质上就是映射……

现在，我们在理解这些原理的基础上，看一看标准化，或者说一些已经成文的东西。

## <meta name="viewport">
这个标签最早是苹果提出来的，为的就是能在移动端设置html_width。
我们可以在html的head中写如下语句
``` html
    <meta name="viewport" content="width=400">
```
意思就是让html_width=400px，不过这种设置方法……不会影响到initial-scale。说的清楚一点就是……你如果这么写，你的initial-scale = default-initial-scale = device.width / (default_html_width \* DPR)，而不是你期待的device.width / (400 \* DPR)。

如果你希望修改initial-scale
```html
    <meta name="viewport" content="width=400, initial-scale=1">
```
还记得我们刚提到initial-scale时，我们（好吧，至少是我）的错误理解么？现在我们就得到了这种效果……一个html_width固定为400px的html被1:1映射到了屏幕上……所以说，对于DPR映射后320px的设备，你每次只能看见html的80%。

不过你愿意思考的话可以想想在DPR映射后320px的设备上
```html
    <meta name="viewport" content="width=200, initial-scale=1">
```
会发生什么？留白吗？也有可能是黑边？还是说？……留个悬念自己用Chrome测试一下吧

当然你也可以只写initial-scale
``` html
    <meta name="viewport" content="initial-scale=1">
```
哈，这就是我们正确理解的initial-scale，这种设置会计算出html_width=device.width，我们也可以把它设置成其它数字检验一下我们的理解是否正确。

不过你可能最喜欢的写法是这样
``` html
    <meta name="viewport" content="width=device-width, initial-scale=1">
```
因为这是兼容性最好的方案（兼容了IE10转为横屏时按照initial-scale=1不能铺满屏的问题orz）

# 三类Viewport
[viewports剖析](http://www.w3cplus.com/css/viewports.html)
