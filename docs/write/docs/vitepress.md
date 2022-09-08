---
date: '2022-08-22'
title: 自定义一个vitepress的blog
author: Younglina
categories:
 - 文档
tags:
 - 记录
 - vitepress
---

## 前言
之前跟着[冴羽老师](https://juejin.cn/user/712139234359182)的[vuepress系列](https://juejin.cn/post/7041134607869149215)搭建了一版[博客](https://younglina.top/)，可以说现在vuepress的环境已经非常完善，有很多与之配套的主题、插件等。但是对于前端来说，不仅要功能多，还要快，所以在有了vuepress的经验之后，最近开始着手使用[vitepress](https://vitepress.vuejs.org/)来迁移，[源码](https://github.com/Younglina/littlear/tree/master)和[网页](https://younglina.top/littlear)可直接看。  

## 已完成
- 自定义首页
- leetcode本年打卡记录
- 获取所有文档列表
- 点击列表调整文档
- 获取所有文档分类
- 获取所有文档标签
- 点击分类跳转
- 点击标签跳转

## 待完善
- 评论
- 看伴娘(本地可以用，打包的时候不行，有无大佬做过：)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/219aade8abe443ad94bc3d9968a6f1cc~tplv-k3u1fbpfcp-watermark.image?)
## 1. 搭建vitepress
页面结构和样式方面也是参考了vuepress的一个非常好的主题，[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)，有用vuepress的同学，也是非常推荐去使用。  
搭建项目的步骤同[vitepress官网](https://vitepress.vuejs.org/guide/getting-started)
```
//1.创建一个空项目
mkdir vitepress-blog && cd vitepress-blog

//2.初始化，可以使用你自己喜欢的包管理器
yarn init

//3.添加vitepress和vue依赖
yarn add --dev vitepress vue

//4.创建一个文档
mkdir docs && echo '# Hello VitePress' > docs/index.md

//5.在package.json中添加脚本
{
  ...
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "serve": "vitepress serve docs"
  },
  ...
}

//6.运行
yarn dev
```

## 2.配置
在没有任何配置的情况下，这只是个非常简单的页面。  
在之前创建的`docs`目录下新建`.vitepress`目录，并新建一个`.config.js`，`.config.js`就是我们后面配置整个项目的地方，目录结构大致如下
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  └─ index.md
└─ package.json
```
我的一些配置
```
//因为导航栏和侧边栏的代码较多，所以抽离出来
const wyNav = require('./nav.js')
const wySidebar = require('./sidebar.js')

module.exports = {
  title: "littlear", //网站标题
  description: "vitepress blog", //网站描述,会生成<meta>便签
  author: "Younglina", //作者
  base: '/littlear/', //根目录 如果您计划将站点部署到https://foo.github.io/bar/，那么您应该将base设置为“/bar/”
  markdown: {
    lineNumbers: true, //显示代码行数
  },
  lastUpdated: true, //以git提交的时间为更新时间
  themeConfig: {
    nav: wyNav, //导航栏配置
    sidebar: wySidebar, //侧边栏配置
    author: 'Younglina',
    lastUpdatedText: '上次更新时间', //最后更新时间文本
    logo: "/avatar.jpeg", //导航栏左侧头像
    docFooter: { //上下篇文本
      prev: '上一篇',
      next: '下一篇'
    },
    // footer: {
    //   copyright: 'Copyright © 2021-present Younglina'
    // },
    // socialLinks: [     // 信息栏展示社交信息
    //   { icon: 'github', link: "https://github.com/Younglina" },
    // ]
  },
};
```

## 3. 自定义首页
vitepress有一套自己的[首页](https://vitepress.vuejs.org/guide/theme-home-page#home-page)配置，将之前的`docs/index.md`的`frontmatter`修改为
```
---
layout: home

hero:
  name: VitePress
  text: Vite & Vue powered static site generator.
  tagline: Lorem ipsum...
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress
features: 
  - icon: ⚡️ 
    title: Vite, The DX that can't be beat 
    details: Lorem ipsum... 
  - icon: 🖖 
    title: Power of Vue meets Markdown 
    details: Lorem ipsum... 
  - icon: 🛠️ 
    title: Simple and minimal, always 
    details: Lorem ipsum...
---
```
效果就是

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5be5527818224988ae10b42c46d7d03f~tplv-k3u1fbpfcp-watermark.image?)

vitepress也是支持直接在md中写vue的，所以可以通过vue组件的形式，完全自己自定义一套样式。 
### 1. 新建一个组件
```
// .vitepress/components/home.vue
<script setup>
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
</script>
<template>
  <div class="home-wrapper">
    <div v-for="item in list" :key="item" class="home-item">{{item}}</div>
  </div>
</template>
<style>
.home-wrapper {
  text-align: center;
}
.home-item {
  vertical-align: middle;
  margin: 4px 4px 10px;
  padding: 4px 8px;
  font-weight: bolder;
  display: inline-block;
  cursor: pointer;
  border-radius: 2px;
  line-height: 13px;
  font-size: 13px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}
</style>
```
### 2. 将`index.md`修改为
```
...
<script setup>
import home from './.vitepress/components/home.vue'
</script>

<home />
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8899e6868366442985f135d1d5c4a8f9~tplv-k3u1fbpfcp-watermark.image?)
可以看到组件和md文件的frontmatter是不冲突的，如果不想整个首页重写，只写一些简单的组件，完全可以用这种方式。

### 3.重写首页
如果想完全重写首页，那么`index.md`只要如下即可
```
---
layout: home
---

<script setup>
import home from './.vitepress/components/home.vue'
</script>

<home />
```
组件中可能会有用到本地资源的时候，资源文件都放在`docs/public`下面，引用时直接`/资源`即可

## 4. 自定义文档页面

正常的文档页面是这样的
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/970f2cec9a144bfba3b7da597e95ea26~tplv-k3u1fbpfcp-watermark.image?)
vitepress也提供我们[自定义页面](https://vitepress.vuejs.org/guide/theme-introduction#using-a-custom-theme)的方法  

### 1. 修改配置文件

新建`./vitepress/theme/`目录，并创建`MyLayout.vue`和`index.js`文件。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4b23d397e1a4a228b8e8d74ec42b34d~tplv-k3u1fbpfcp-watermark.image?)
```
// .vitepress/theme/index.js
import MyLayout from './MyLayout.vue'
import DefaultTheme from 'vitepress/theme' //viteperss的主题

export default {
  ...DefaultTheme,
  Layout: MyLayout,
    
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
  }

  setup() {
    // this function will be executed inside VitePressApp's
    // setup hook. all composition APIs are available here.
  }
}
```

### 2. 新建Layout
VitePress提供了一些[API](https://vitepress.vuejs.org/guide/api#api-reference)给我们去获取应用的数据。  
如`useData`，返回的就是页面的数据，它的数据格式
```
interface VitePressData {
  site: Ref<SiteData>
  page: Ref<PageData>
  theme: Ref<any> // themeConfig from .vitepress/config.js
  frontmatter: Ref<PageData['frontmatter']>
  lang: Ref<string>
  title: Ref<string>
  description: Ref<string>
  localePath: Ref<string>
}
```
我们可以获取其中的`frontmatter`来设置如下效果，这里会使用到`vitepress`提供的插槽

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f421d69e5072494e84e334f04787996b~tplv-k3u1fbpfcp-watermark.image?)
```
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme

const { frontmatter } = useData() //这里的frontmatter就是各个md文件中自己写在最上面的东西
</script>

<template>
  <Layout>
    <template #doc-before>
      <span class="page-info">✍️{{ frontmatter.author }}</span>
      <span class="page-info">🕐{{ frontmatter.date }}</span>
      <span>
        🔗
        <span class="page-info" v-for="item in frontmatter.tags" :key="item">{{ item }}</span>
      </span>
    </template>
  </Layout>
</template>

<style>
  .page-info{
    font-size: 13px;
    color: #7f7f7f;
    margin-right: 10px;
  }
</style>
```

### 3. 插槽
vitepress提供了很多页面上的[插槽](https://vitepress.vuejs.org/guide/theme-introduction#layout-slots)，能够很方便的去自定义，就如上面用到的`#doc-before`对应的就是文档的开头位置，一些插槽对应的位置和效果，可以自己配置自己想要的

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03781d67469c48dca5fa23be54828e57~tplv-k3u1fbpfcp-watermark.image?)

## 交流
文章细节方面讲的不多，是一个大概的流程，blog也会慢慢完善，有想进一步交流、指正的同学，欢迎评论沟通。