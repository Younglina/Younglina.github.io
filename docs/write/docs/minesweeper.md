---
date: '2022-03-17'
title: 看antfu直播中，一些开发小技巧
author: Younglina
categories:
 - 文档
tags:
 - 记录
---

## vscode配置和插件
[GitHub](https://github.com/antfu/vscode-settings)
## degit
`degit`类似于`git clone`，当你运行`degit User/repo`时，它会在`https://github.com/User/repo`上`clone`最新的提交，
与`git clone`不同的地方在于，它不会下载整个`repo`的历史记录，所以会比`git clone`快很多

### 安装
```
npm i -g degit
```

### 使用
```
degit antfu/vitesse-lite vue-minesweeper
//下载下来的是一个没有.git的包，所以如果你要关联到自己的git，就git init去关联
```

## ni
[ni](https://github.com/antfu/ni) - use the right package manager，它是antfu写的一个包管理器，
运行它之前，会检测你的项目中是否存在锁文件，如`pnpm-lock.yaml、yarn.lock`，如果存在则运行对应的安装命令  

### 安装
```
npm i -g @antfu/ni
```

### 使用
```
ni
//发现项目中有 `pnpm-lock.yaml`，那么它就会执行`pnpm i`
//发现项目中有 `yarn.lock`，那么它就会执行`yarn install`
//所以，使用`ni`以后就不用考虑从`git`上面clone下来的项目使用的那个包管理器，直接`ni`，就像`Vue3`从`yarn`变到`pnpm only`一样

ni axios
# npm i axios
# yarn add axios
# pnpm add axios

nr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```

## 基于on my zsh和ni的快捷指令
前提是安装了`oh my zsh`和`ni`，通过修改`.zshrc`文件，增加`alias`

### alias
```
//nr 对应上面 ni 的用法
alias d="nr dev"
alias s="nr start"
alias b="nr build"
```

### 使用
```
//直接在控制台输入
d //就是运行如 npm run dev
s //就是运行如 npm run start
```

