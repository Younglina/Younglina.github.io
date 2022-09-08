---
date: '2022-06-07'
title: vue3-nuxt
author: Younglina
categories:
 - 文档
tags:
 - 记录
---

## scss配置

```bash
npm install sass -D
```

在assets目录下创建scss目录，scss中新建variables.scss文件，在文件中写入如下内容：

```scss
@mixin line-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

全局导入variables.scss文件，配置vite.cofig.ts，[官网配置](https://vitejs.cn/config/#css-preprocessoroptions)  

```js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`
      }
    }
  }
})
```

即可随处引用scss中的变量，如：

```scss

.text {
  @include line-overflow;
  width: 50px;
}

```

## element-plus 国际化配置

[官网说明](https://element-plus.gitee.io/zh-CN/guide/i18n.html)
### 全局配置
Element Plus 组件 默认 使用英语，Element Plus 提供了全局配置国际化的配置。

```js

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, {
  locale: zhCn,
})

```

### ConfigProvider
Element Plus 还提供了一个 Vue 组件 ConfigProvider 用于全局配置国际化的设置，可直接在App.vue中作为根组件

```vue

<el-config-provider :locale="local">
  <button @click="changeLang(zhCn)">中文</button>
  <button @click="changeLang(en)">英文</button>
  <router-view />
</el-config-provider>
<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { ref } from 'vue'

const local = ref()
const changeLang = (lang) => {
  local.value = lang
}

</script>

```

## vue-i18n

### 安装

```bash
npm install vue-i18n
```

### 配置
src下新建language目录，分别新建i18n.ts、en.ts、zh.ts文件，en和zh是自定义语言包，在文件中写入如下内容：

i18n.ts
```js
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
  locale: 'zh',
  legacy: false,
  messages: {
    zh,
    en,
  },
})

export default i18n
```

en.ts
```js
export default {
  message: {
    home: 'home',
    mine: 'mine',
  },
}

```

zh.ts
```js
export default {
  message: {
    home: '首页',
    mine: '个人中心',
  },
}

```

### 挂载main.ts

```js
import i18n from './language/i18n'
...
app.use(i18n)
```

### 使用
可直接使用 `$t('message.home')` 来获取自定义语言包中的文字
```vue
{{ $t('message.home') }}
```