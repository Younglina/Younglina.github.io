---
title: 开发本地vuepress 复制代码插件
author: Younglina
date: '2022-02-12'
categories:
 - 文档
tags:
 - 记录
 - vuepress
---
## 初始化插件
在`.vuepress`下新建如下文档结构
- `vuepress-plugin-code-copy` 插件名，自定义
- `package.json` 组件依赖
- `CodeCopy` 组件，写相关逻辑及展示
- `index` 组件相关信息
- `clientRootMixin` 控制根组件生命周期，在其中编写组件的挂载方式
```
.vuepress
├─ vuepress-plugin-code-copy 
│  └─ package.json
│  └─ clientRootMixin.js
│  └─ CodeCopy.vue
│  └─ index.js
└─ config.js  
```      

## 引入插件
```javascript
//.vuepress
{
    ...
    plugins:[
        [
            require('./vuepress-plugin-code-copy'),
            //配置项，可在插件的index.js中的options中获取
            {
                'copybuttonText': '复制',
                'copiedButtonText': '已复制！'
            }
        ],
    ]
}
```

## index.js
1. 参照[官方文档插件实例](https://vuepress.vuejs.org/zh/plugin/writing-a-plugin.html)，了解插件编写方式
2. VuePress 官方文档的 [Option API](https://vuepress.vuejs.org/zh/plugin/option-api.html#clientrootmixin)，提供了一个 clientRootMixin 方法：
:::tip
指向 mixin 文件的路径，它让你可以控制根组件的生命周期
:::

示例代码：
```javascript
const path = require('path')

module.exports = {
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
}
```

```javascript
// mixin.js
export default {
  created () {},
  mounted () {}
}
```

修改`index.js`

```javascript
const path = require('path');

module.exports = (options, ctx) => {
    return {
        name: 'vuepress-plugin-code-copy',
        clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
        //定义组件全局变量，需在vuepress/config.js中配置，对应就在options中获取
        //定义好以后可直接在组件中使用
        define: {
            copybuttonText: options.copybuttonText || 'copy',
            copiedButtonText: options.copiedButtonText || "copied!"
        },
    }
}
```

## CodeCopy.vue
开发复制代码的组件
```vue
<template>
    <span class="code-copy-btn" @click="copyToClipboard">{{ buttonText }}</span>
</template>
<script>
export default {
    data() {
        return {
            buttonText: copybuttonText //对应index.js中define的参数
        }
    },
    methods: {
        copyToClipboard() {
            //this.code对应在clientRootMixin中，挂载在instance上
            this.setClipboard(this.code, this.setText)
        },
        setClipboard(code, cb) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(
                    cb,
                    () => { }
                )
            } else {
                let copyelement = document.createElement('textarea')
                document.body.appendChild(copyelement)
                copyelement.value = code
                copyelement.select()
                document.execCommand('Copy')
                copyelement.remove()
                cb()
            }
        },
        setText() {
            this.buttonText = copiedButtonText

            setTimeout(() => {
                this.buttonText = copybuttonText
            }, 1000)
        }
    }
}
</script>
<style scoped>
.code-copy-btn {
    position: absolute;
    bottom: 10px;
    right: 7px;
    opacity: 0.7;
    cursor: pointer;
    font-size: 14px;
}

.code-copy-btn:hover {
    opacity: 1;
}
</style>
```

## clientRootMixin

```javascript
import CodeCopy from './CodeCopy.vue'
import Vue from 'vue'

export default {
    updated() {
        // 防止阻塞
        setTimeout(() => {
            document.querySelectorAll('div[class*="language-"] pre').forEach(el => {
              	// 防止重复写入
                if (el.classList.contains('code-copy-added')) return
                let ComponentClass = Vue.extend(CodeCopy)
                let instance = new ComponentClass()
                instance.code = el.innerText
                instance.$mount()
                el.classList.add('code-copy-added')
                el.appendChild(instance.$el)
            })
        }, 100)
    }
}
```