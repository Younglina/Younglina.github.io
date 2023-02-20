---
title: 通过gitbash配置快捷指令
author: Younglina
date: '2022-09-07'
categories:
 - 文档
tags:
 - 小技巧
---

windows配置vscode gitbash  
在设置中添加
```
"terminal.integrated.profiles.windows": {
    "PowerShell": {
        "source": "PowerShell",
        "icon": "terminal-powershell"
    },
    "Command Prompt": {
        "path": [
            "${env:windir}\\Sysnative\\cmd.exe",
            "${env:windir}\\System32\\cmd.exe"
        ],
        "args": [],
        "icon": "terminal-cmd"
    },
    "gitbash": {
        "path": "D:\\Git\\bin\\bash.exe", //git的安装路径
    }
},
"terminal.integrated.defaultProfile.windows": "gitbash",
```

配置`gitbash`快捷键，别名    

1. 打开git的安装目录下面的`Git\etc\profile.d\aliases.sh`新增
```
alias gaa='git add .'
alias gcm='git commit -m'
alias gl='git pull'
alias gp='git push'

alias d='npm run dev'
alias b='npm run build'
```
如果上面没起作用，就用下面这种方式  
2. 在`D:\Git\etc\profile.d\bash_profile.sh`增加
```
alias ls='ls -F --color=auto --show-control-chars'
alias ll='ls -l'
alias gaa='git add .'
alias gcm='git commit -m'
alias gl='git pull'
alias gp='git push'

alias d='npm run dev'
alias b='npm run build'
alias dp='npm run deploy'
```
在`D:\Git\etc\bash.bashrc`增加
```
source /etc/profile.d/bash_profile.sh
```

