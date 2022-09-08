---
date: '2018-02-16'
title: 一些知识
author: Younglina
categories:
 - 文档
tags:
 - 记录
---

## 跨域

    同源：相同协议，相同域名，相同端口。

## 闭包

    闭包在 JavaScript 中常用来实现对象数据的私有
    什么是闭包？
    简言之，闭包是由函数引用其周边状态（词法环境）绑在一起形成的（封装）组合结构。在 JavaScript 中，闭包在每个函数被创建时形成。
    闭包让我们能够从一个函数内部访问其外部函数的作用域。
    要使用闭包，只需要简单地将一个函数定义在另一个函数内部，并将它暴露出来。要暴露一个函数，可以将它返回或者传给其他函数。

## SSL 工作原理

SSL(Server socket layer) 是一种保证网络两个节点进行安全通信的协议。SSL 和 TLS 建立在 TCP/IP 协议基础上。建立在 SSL 上的 HTTP 协议称为 HTTPS，默认端口 443。SSL 使用加密技术实现会话双方信息的安全传递。

## SSL 加密类型

    有两种基本的加解密算法类型：

    1. 对称加密
    密钥只有一个，加密解密为同一个密码，且加解密速度快，典型的对称加密算法有DES、AES，RC5，3DES等；对称加密主要问题是共享秘钥，除你的计算机（客户端）知道另外一台计算机（服务器）的私钥秘钥，否则无法对通信流进行加密解密。

    2. 非对称加密
    使用两个秘钥：公共秘钥和私有秘钥。私有秘钥由一方密码保存（一般是服务器保存），另一方任何人都可以获得公共秘钥。
    获取证书（经过CA认证过的公钥）有两种方式

    1. 从权威机制购买证书。
    安全证书由国际权威的证书机构(CA)，如VeriSign和Thawte颁发，它们保证了证书的可信性。一个安全证书只对一个IP有效，多个IP必需购买多个证书。

    2. 创建自我签名的证书。
    如果通信双方只关心数据在网络上的可以安全传输，并不需要对方进行身份验证，这种情况下，可以创建自多签名证书。这证书达不到身份认证的目的，但可以用于加密通信。
    SSL握手
    SSL 连接总是由客户端启动的。在SSL 会话开始时执行 SSL 握手。此握手产生会话的密码参数。关于如何处理 SSL 握手的简单概述，如下图所示。此示例假设已在 Web 浏览器 和 Web 服务器间建立了 SSL 连接。

## html5 有哪些新特性、移除了那些元素

    新特性:
    （1）语意化更好的内容元素，比如 article、footer、header、nav、section，表单控件，calendar、date、time、email、url、search;
    （2）一些功能标签，如绘画 canvas，用于媒介播放的 video 和 audio 元素;
    （3）本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;sessionStorage 的数据在浏览器关闭后自动删除;
    （4）新的技术，如webworker, websocket, Geolocation;
    **移除的元素：**
    （1）纯表现的元素：basefont，big，center，font, s，strike，tt，u;
    （2）对可用性产生负面影响的元素：frame，frameset，noframes；
        cookies，session,sessionStroage和localStorage的区别：
    cookies，sessionStroage和localStorage是在客户端，session是在服务器端。服务器端的session机制， session 对象数据保存在服务器上。
    实现上，服务器和浏览器之间仅需传递session id即可，服务器根据session id找到对应用户的session对象。会话数据仅在一段时间内有效，这个时间就是server端设置的session有效期。服务器session存储数据安全一些，一般存放用户信息，浏览器只适合存储一般数据
    其次，是**cookies，sessionStroage和localStorage三者的区别**：
    （1）cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存（2）存储大小限制也不同，cookie数据不能超过4k，同时因为每次Http请求都会携带cookie（这里可能还会追问，cookie是在http报文什么地方，答:cookie是携带在http请求头上的），所以cookie只适合保存很小的数据，比如会话标识sessionStroage和localstroage虽然也有大小限制，但是比cookie大很多，可以达到5M；
    （3） 数据有效期也不同，cookie在设置的有效期（服务端设置）内有效，不管窗口或者浏览器是否关闭，sessionStroage仅在当前浏览器窗口关闭前有效（也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁）；localStroage始终有效，窗口或者浏览器关闭也一直保存；
    （4） Web storage 支持事件通知机制，可以将数据更新的通知发送给监听者。如下：
    	`window.addEventListener("storage", function (e) {`
    	        `alert(e.newValue);`
    	    `});`
    Web Storage带来的好处： 减少网络流量：一旦数据保存在本地后，就可以避免再向服务器请求数据，因此减少不必要的数据请求，减少数据在浏览器和服务器间不必要地来回传递。 快速显示数据：性能好，从本地读数据比通过网络从服务器获得数据快得多，本地数据可以即时获得。再加上网页本身也可以有缓存，因此整个页面和数据都在本地的话，可以立即显示。 临时存储：很多时候数据只需要在用户浏览一组页面期间使用，关闭窗口后数据就可以丢弃了，这种情况使用sessionStorage非常方便。

## 前端页面优化

    1.http请求优化
    	(1)减少HTTP请求
    		* 压缩合并js、css文件，可配置webpack使其合并成一个唯一出口文件

_ 延迟加载
_ 雪碧图 CSS Sprite 一种 CSS 图像合并技术，该方法是将小图标和背景图像合并到一张图片上，然后利用 css 的背景定位
来显示需要显示的图片部分。
(2)预加载 预先判断需要加载的数据，达到指定条件以后直接从浏览器缓存中获取 2.页面/性能优化
(1)引用优化
*css 放在 head 标签内，js 文件放在 body 标签的最下面
*css 文件是异步加载的，浏览器在构建 dom 树的同时如果有对应的样式就直接显示出来，这样会让样式更早的出现
\*js 文件在下载时会阻塞 dom 树构建，只有 js 下载完成后才回继续构建下面的 dom 树，将 js 文件的引用放在最下面可在视觉上
减少白屏的出现
(2)将 js 动画替换成 css 动画

## js 继承

    1.原型链继承:直接让子类的prototype属性指向父类的实例,这样在子类的原型上拥有了父类的私有和公有属性.
    2.借用构造函数(经典继承):在子类的构造函数中使用父类.call(this)方法,在构造新的子类实例的时候其实也执行了父类的初始化代码,并且改变了this指向,这样子类就可以使用父类的私有属性了
    3.原型式继承Object.create():create函数内部创建了一个临时的中间类,让这个类的原型等于传进来的原型对象,最后返回了这个中间类的实例,让子类的prototype属性等于返回的实例,这样就拿到了父类的公有方法.

## 水平垂直居中

    1、定位 盒子宽高已知， position: absolute; left: 50%; top: 50%; margin-left:-自身一半宽度; margin-top: -自身一半高度;

    2、table-cell布局 父级 display: table-cell; vertical-align: middle;  子级 margin: 0 auto;

    3、定位 + transform ; 适用于 子盒子 宽高不定时；

        position: relative / absolute;
        /*top和left偏移各为50%*/
           top: 50%;
           left: 50%;
        /*translate(-50%,-50%) 偏移自身的宽和高的-50%*/
        transform: translate(-50%, -50%);

    4、flex 布局
        父级：
            /*flex 布局*/
            display: flex;
            /*实现垂直居中*/
            align-items: center;
            /*实现水平居中*/
            justify-content: center;

## 跨域解决方案

    1.jsonp 动态创建script标签，请求一个带参网址并指定回调函数
    缺点：只能实现get一种请求。
    	原生实现：
    		<script>
    			var script = doucment.createElement('script');
    			script.src="http://www.asdf.com/?callback=abackfunction";
    			function abackfunction(data){
    				数据处理；
    			}
                                document.getElementsByTagName('head')[0].appendChild(script);
    		</script>
    发起端定义jsonp的回调处理。
    发起端做jsonp跨域请求
    响应端使用发起端的同名函数处理跨域请求

    2.CORS
    浏览器对跨域请求区分为“简单请求”与“非简单请求”
    “简单请求”满足以下特征：
    （1) 请求方法是以下三种方法之一：
    	     HEAD
    	     GET
    	     POST
    （2）HTTP的头信息不超出以下几种字段：
    	     Accept
    	     Accept-Language
    	     Content-Language
    	     Last-Event-ID
    	     Content-Type： application/x-www-form-urlencoded、 multipart/form-data、text/plain

    简单请求 只需要CORS服务端在接受到携带Origin字段的跨域请求后，在response header中添加Access-Control-Allow-Origin等字段给浏览器做同源判断。
    非简单请求 需要CORS服务端对OPTIONS类型的请求做处理，其他与简单请求一致

    3.nginx代理跨域
