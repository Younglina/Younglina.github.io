---
date: '2022-08-30' 
title: 获取vitepress所有文章数据
author: Younglina
categories:
 - 文档
tags:
 - 记录
 - vitepress
---

如何获取所有的md文档，并获取它们的类型、标签、时间等

## 获取所有md文档
在写md文档时，我们的`frontmatter`里应该都包含了该文档基本信息，如分类、标签、创建时间、作者、标题等。如：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/919852b39db24569b9453128676d9941~tplv-k3u1fbpfcp-watermark.image?)  
我们可以通过读取md文件，然后解析`frontmatter`，即可获取所有的文章列表、标签、分类。

### 1. 获取所有md文件
想要获取md文件的frontmatter，我们就得解析文件，通过`nodejs`提供的`fs`模块来递归的处理所提供的文件夹。  
在根目录新建一个`readMD.js`。引入`fs`模块，并提供一个根路径。
```
const fs = require('fs') 
function readAll(parentPath) {
    const files = fs.readdirSync(parentPath)
}
readAll('./docs/write')
```
现在`files`就是`./docs/write`下所有的文件以及文件夹，我们通过遍历它，判断如果是文件则解析`frontmatter`，如果是文件夹则递归处理。

### 2. 解析文件获取frontmatter
```javascript
const fs = require('fs') 
const path = require('path')
const yaml = require('js-yaml')

const out = []
let re = /---(.*?)---/sg
function readAll(parentPath) {
    const files = fs.readdirSync(parentPath)
    files.map(item => {
      let tempPath = path.join(parentPath, item); //当前文件或文件夹的路径
      let stats = fs.statSync(tempPath); //判断是文件还是文件夹
      if (stats.isDirectory()) { //文件夹递归处理
        readAll(tempPath);
      } else {
        const content = fs.readFileSync(tempPath, 'utf8') //获取文件内容
        let s = re.exec(content) //通过正则获取frontmatter的内容
        re.lastIndex = 0 // 这里如果不操作，在后面正则判断时会有问题，当时在这里卡了很久
        if (s) {
          let docs = yaml.load(s[1]) // 通过yaml转换成对象
          docs.link = '/littlear'+tempPath.slice(4, -3) // 这里是为了文章列表的跳转
          out.push(docs);
        }
      }
    })
}
readAll('./docs/write')

```
### 3. 存储所有数据
现在`out`中就是所有的文档信息了，可以直接将它导出，在需要用的地方引入，或者直接将它输入到一个文件中，这里我选择了后者。我新建了一个`docs/.vitepress/components/docs.json`文件来存储所有的文章信息
```javascript
const filePath = 'docs/.vitepress/components/docs.json';
fs.writeFileSync(
  filePath,
  JSON.stringify(out),
  {
    encoding: 'utf8',
  }
);
```

## 格式化数据
可以在`/docs/.vitepress/componentes`下新建一个`useDocs.js`文件，对之前获取到的数据进行格式化，以便页面中更好的使用。
```javascript
import docData from './docs.json'

export function useDocs() {
  // 时间倒序显示
  docData.sort((a, b) => new Date(b.date) - new Date(a.date))

  const categories = {} //所有的文章分类
  const tags = new Set() //所有的文章标签
  let docNum = 0, tagNum = 0 //文章总数、标签总数
  docData.map(item => {
    docNum++
    if (item.categories) {
      item.categories.map(c => {
        if (!categories[c]) {
          categories[c] = 0
        }
        categories[c]++
      })
    }
    if (item.tags) {
      item.tags.map(c => {
        tags.add(c)
      })
    }
  })
  tagNum = tags.size

  return {
   /**
    * docData: 包含所有的文章信息
    * categories: 所有分类
    * tags: 所有标签
    * docNum: 文章总数
    * tagNum: 标签总数
   */
    docData, categories, tags, docNum, tagNum
  }
}
```
之后就能直接在想用的地方直接引入即可，如要按列表展示文章

```
<script setup>
import { useDocs } from './useDocs.js'

const { docData } = useDocs() //获取所有文章信息遍历即可

</script>

<template>
    <a v-for="item in docData" :key="item.title" :href="item.link" class="docs">
        <div class="docs-title">{{ item.title }}</div>
        <div class="docs-footer">
          <span class="docs-info">✍️{{ item.author }}</span>
          <span class="docs-info">🕐{{ item.date }}</span>
          <span>
            🔗
            <span class="docs-info docs-tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
          </span>
        </div>
    </a>
</template>
```