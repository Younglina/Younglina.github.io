---
date: '2018-08-31'
title: 体验mpvue仿网易云音乐手机版
author: Younglina
categories:
 - 项目
tags:
 - 学习
 - mpvue
 - 小程序
---

# my-project

在尝试开发了一个微信小程序之，后发现有 mpvue 这么个东西可以来开发小程序以后就忍不住了，所以把小程序和我用 vue 开发过的版本结合修改以后，再尝试用 mpvue+iview-weapp 开发一个版本。  
后台接口用的是[NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/),感谢大佬的分享

[git 地址](https://github.com/lucaswww/my-project)，demo 项目代码质量不是很好，哈哈哈哈多多见谅 😁

## 更新记录(前几次更新忘记写记录...)

18/9/25 修改账号页

![](https://user-gold-cdn.xitu.io/2018/9/25/1660fd9094120d99?w=631&h=419&f=jpeg&s=62891)

## 预览（不动点大图看）

![](https://user-gold-cdn.xitu.io/2018/8/31/1658e1511bcb13fe?w=250&h=450&f=gif&s=4675839)

## 目前完成

- 推荐歌单
- 排行榜
- 歌单详情
- 播放页
- 歌单评论
- 搜索
- 扫一扫(基础功能)
- 周边(百度地图 api)

## 项目搭建

- 最开始还是要把[微信小程序开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)下载一下
- mpvue 项目建立，跟着官网走一遍是最快的 [快速上手](http://mpvue.com/mpvue/quickstart/)
- 支持 iview-weapp，还是跟着官网[快速上手](https://weapp.iviewui.com/docs/guide/start)，这里就一个地方要注意，把下载下来的**iview-weapp 项目的 dist 文件夹**（可以改名字）是放到**你项目编译后的**dist 目录下，iview-weapp 官网没有效果的展示，所以建议扫它上面的二维码查看效果以后对照它的代码进行开发
- 最后就是用微信小程序开发工具打开项目(不是 dist 目录)，用你常用的编译器编写代码（src 目录下）

## 请求方面

微信小程序有自带的 wx.request()可以使用，还可以用[Flyio](https://wendux.github.io/dist/#/doc/flyio/readme)，我是用的 Flyio  
具体使用的话可以再每个模块中

```
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly
fly.get(url).then(res=>{})
```

还有就是在 main.js 中

```
const Fly = require('flyio/dist/npm/wx');
let fly = new Fly();
Vue.prototype.$fly = fly;
//模块中使用
this.$fiy.get(url).then(res=>{})
```

## 路由跳转传参

wx.navigateTo({url:'../test/main?id='+id})  
第一种：

```
onShow (options) {

let id = options.id

}
```

第二种：在所有页面组件内可以通过 this.$root.$mp.query 获取,要注意就是：写在 mounted 函数里，写到 created 报错。

第三种：在所有的组件内可以通过 this.$root.$mp.appOptions 获取。  
正常情况下三种应该都是可以的，某一种没用的时候就尝试另外两种

## vuex 方面

还是和 vue 里面的使用一样，简单的  
/src/store/store.js

```
import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
   oneState:'one'
    }
  },
  mutations: {
    setItem: (state,data) => {
      state.oneState = data
    },
  },
  getters : {
    getItem (state) {
        return state.oneState
    },
});

```

/src/main.js

```
import store from './store/store'
Vue.prototype.$store = store;
```

/src/page/text.vue

```
import {mapGetters} from 'vuex'
  export default {
     computed:{
       ...mapGetters([
         'oneState'
        ])
     },
     },
     methods:{
         test(){
             this.$store.commit('setItem', 'two')
         }
     }
```

## 总结

好了，基本的开发流程就是这样，具体的开发大部分还是像 vue 开发那样，自己在开发的时候，遇到的坑还是有的，但网上基本都能找到解决方案，具体遇到的时候就查一查都能查到，收获很多。
最后这里还有一个用 vue 开发的版本可[在线预览](http://lucaswww.coding.me/my-music/dist/#/index/Music),建议用 chrome 的手机模式预览
