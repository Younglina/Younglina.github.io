---
title: Vue3 一些插件配置
author: Younglina
date: '2021-12-10'
showAccessNumber: true
categories:
 - 文档
tags:
 - 记录
 - Vue3
---

## VueRouter
### 安装
`npm i vue-router@4`
### 配置​
1、新建 src/router/index.js


```javascript
import { createRouter, createWebHashHistory } from'vue-router'
import Home from'@/views/home.vue'
const routes = [ 
  { path: '/', name: 'Home', component: Home }
] 
const router = createRouter({ 
  history: createWebHashHistory(), 
  routes 
}) 
export default router
```
​

2、main.js挂载
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
createApp(App).use(router).mount('#app')
```
### 使用
```javascript
<script setup>
import { useRoute, useRouter } from '@/router'
const route = useRoute()
const router = useRouter()

router.push({ name:'home', params:route.params })
</script>
```
## Vuex
### 安装
`npm i vuex@next`
### 配置
1、新建 src/store/index.js
```javascript
import { createStore } from 'vuex'

export const store = createStore({
    state: {
      userinfo: null
    },
    mutations: {
    SET_USERINFO(state,data){
      state.userInfo=data
    },
  },
  getters: {
    userInfo(state){
      return state.userInfo
    },
  }
})

export function useStore(){
  return store
}
```


2、main.js挂载
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { store } from './router/index'
createApp(App).use(store).mount('#app')
```


### 使用
```javascript
<script setup>
import { useStore } from '@/store'
const store = useStore()
const setinfo = 'asdf'
store.commit('SET_USERINFO', setinfo)
const userinfo=computed(()=>{
  return store.state.userinfo
})
</script>
```


## Element Plus
### 安装
`npm i element-plus`
### 配置
1、完整引入
```javascript
import { createApp } from 'vue' 

import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css' 

import App from './App.vue' 

const app = createApp(App) 
app.use(ElementPlus) app.mount('#app')
```


​ 

2、按需引入
安装
`npm install -D unplugin-vue-components`
配置
```javascript
//vite.config.js
import Components from 'unplugin-vue-components/vite' 
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' 
export default defineConfig({
plugins: [     // ...
Components({      
resolvers: [ElementPlusResolver()], 
}),   
], 
})
```


## axios、scss
axiso使用不变
scss直接安装`npm i sass`就能用
## SVG
### 安装
`npm i vite-plugin-svg-icons`
### 配置
```javascript
//vite.config.js
import viteSvgIcon from 'vite-plugin-svg-icons' 
import { resolve } from 'path'
export default defineConfig({
plugins: [     // ...
viteSvgIcons({
// 指定需要缓存的图标文件夹
iconDirs:[resolve(process.cwd(),'src/assets/icons')],
// 指定symbolId格式
symbolId:'icon-[dir]-[name]',
}),
], 
})
```


**新建src/components/SvgIcon.vue**
```javascript
<template>
<svg :class="svgClass" :width="size" :height="size" aria-hidden="true">
<use:xlink :href="iconName" :fill="color"/>
</svg>
</template>
<script setup>
import { computed } from'vue'
const props=defineProps({
  name:{
    type:String,
    required:true,
  },
className:{
type:String,
default:'',
},
size:{
type:String,
default:'22',
},
color:{
type:String,
default:'#000000',
},
})
const iconName=computed(()=>{
return`#icon-${props.name}`
})
const svgClass=computed(()=>{
if(props.className){
return`svg-icon ${props.className}`
}
return'svg-icon'
})
</script>
```




**main.js**
```javascript
import svgIcon from './components/SvgIcon.vue'
const app=createApp(App)
app.component('svg-icon',svgIcon)
```


### 使用
在所指定的src/assets/icons路径下添加svg文件
`<svg-icon name="所要使用的svg文件名"/>`
