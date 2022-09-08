---
title: 通过gitbash配置快捷指令
author: Younglina
date: '2022-09-07'
categories:
 - 文档
tags:
 - 小技巧
---

打开git的安装目录下面的`Git\etc\profile.d\aliases.sh`新增
```
alias gaa='git add .'
alias gcm='git commit -m'
alias gl='git pull'
alias gp='git push'

alias d='npm run dev'
alias b='npm run build'
```
