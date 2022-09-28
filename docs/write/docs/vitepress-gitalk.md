---
date: '2022-09-19' 
title: vitepress配置评论(gitalk)
author: Younglina
categories:
 - 文档
tags:
 - 记录
 - vitepress
---

因为VitePress没有像VuePress那样的可以直接安装配置的评论插件，所以就需要自己动手，这里使用gitalk作为插件使用。

## 创建GitHub Application
使用gitalk之前，得先创建[GitHub Application](https://github.com/settings/applications/new)，为了后续提供给gitalk的两个数据，
`Client ID`和`Client secrets`，如下图

![](https://raw.githubusercontent.com/Younglina/images/master/20220922100451.png)
本地调试的时候，修改`callback url`为本地服务的链接

## 安装
两种方式

直接引入
```
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
  <script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>

  <!-- or -->

  <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
  <script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
```

npm 安装
```
npm i --save gitalk
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
```

第一种方式在vitepress中不是太好使，使用第二种方式，在需要使用的地方导入即可，一般是自定义的首页组件里面，和所有的文章下面

## 使用
想要在所有文章下面使用，又不想每个文章里面都写一遍咋办？这里就需要我们去改一下vitepress的配置，自定义一下文章页面的主题。

在`.vitepress`下面新建一个`theme`的文件夹，创建两个文件`index.js`和`MyLayout.vue`，这个layout文件就是我们包装每个文章页面的根组件，

**导入之前安装的gitalk**

```
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
</script>
```

**生成gitalk插件**  
需要注意的是，vitepress在编译的时候无法使用`window`（不知道说的对不对），而gitalk是依赖window.document去加载节点的，
而且在setup中可能还获取不到需要挂载的节点，所以得在`onMounted`以后去处理，然后判断`window`是否可用。  

```
<script setup>
import { onMounted } from 'vue'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

onMounted(() => {
  if(typeof window !==undefined){
    var s_div = document.createElement('div');   // 创建节点
    s_div.setAttribute("id", "gitalk-page-container");   // 设置id
    document.querySelector('.content-container').appendChild(s_div);   // querySelector的节点可自己根据自己想加载的地方设置
    var gitment = new Gitalk({
      id: location.pathname, // 可选。默认为 location.href
      owner: 'Younglina', // GitHub repository 所有者
      repo: 'Younglina.github.io', // GitHub repository
      clientID: '******', // 自己的clientID
      clientSecret: '******',// 自己的clientSecret
      admin: ['Younglina'], // GitHub repository 所有者
      labels: ['Gitalk'], // GitHub issue 的标签
      createIssueManually: true, //如果当前页面没有相应的 isssue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
    })
    gitment.render('gitalk-page-container')
  }
})
</script>
```

按理说在完成上述操作以后，gitalk就能正常使用了，但是发现github获取token的接口被墙了，导致出现`network error`而无法使用  

去gitalk的git上一看，很多人都有这样的问题，随后在网上一番搜索，找到了一个亲测有效的方法  

参考[文章](https://prohibitorum.top/7cc2c97a15b4.html)，就是需要我们自己去搭一个nodejs的服务进行代理，不愿看的或者没有域名的同学们，可以直接使用我按照文章方法设置的。  

在gitalk的配置中加入下面一句即可  
```
proxy: "https://cors-server-ecru.vercel.app/github_access_token",
```

成功以后的[效果](https://younglina.top/)
![](https://raw.githubusercontent.com/Younglina/images/master/20220922104514.png)


