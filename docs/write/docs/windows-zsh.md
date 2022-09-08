---
date: '2022-03-21'
title: win10配置oh my zsh到vscode
author: Younglina
categories:
 - 文档
tags:
 - 记录
---
给`win10`配置`oh my zsh`，配置`zsh-syntax-highlighting`、`zsh-autosuggestions`、`git`等插件，配置好以后就可以像`mac`一样直接在`vscode`中使用，
最后配合[ni](https://github.com/antfu/ni)，配置一些快捷方式，稍微提高一些开发效率

## ubuntu

在win10的`Microsoft Store`中，搜索`ubuntu`，并安装
![](https://raw.githubusercontent.com/Younglina/images/master/ubuntu.png)

同样再搜索`windows terminal`，并安装
![](https://raw.githubusercontent.com/Younglina/images/master/wint.png)

## zsh git
进入刚刚下载的`windows terminal`，输入`wsl`进入wsl的ubuntu环境  
然后安装`zsh`和`git`
```
sudo apt install zsh git
```
![](https://raw.githubusercontent.com/Younglina/images/master/zsh.png)

## oh my zsh
用`git`把`oh my zsh`的源码拷下来
```
git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh'
```
然后安装
```
~/.oh-my-zsh/tools/install.sh
```

这一步如果一直有问题的话，可以直接上[ohmyzsh](https://github.com/ohmyzsh/ohmyzsh.git),把它的`install.sh`弄到`~/.oh-my-zsh`下面去执行

## 配置ohmyzsh的插件

### 高亮 zsh-syntax-highlighting
```
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 自动提示 zsh-autosuggestions
```
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 配置
拷下来以后记得在`./zshrc`中写上，并启用,`source ~/.zshrc`  
先安装一个`vim`，方便直接在控制台编辑
```
sudo apt-get install vim
vim ~/.zshrc
```
写入
```
plugins=( git zsh-syntax-highlighting zsh-autosuggestions ) 
```

### git
git是oh my zsh自带的插件，它包含了几乎所有的git命令的缩写，直接在`./zshrc`中配置即可
```
plugins=( git ) 
```
配置好以后可直接在控制台输入别名，如一些常用的
```
ga // git add
gaa // git add -all
gcmsg // git commit -m
gf // git fetch
gl // git pull
gp // git push
gm // git merge
```
完整的可以去[git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)上看看

### 结合vscode
直接在新建终端的时候，选择默认配置文件，就是上面安装的`ubuntu`  
![](https://raw.githubusercontent.com/Younglina/images/master/vscode.png)  
最终在vscode的效果就是这样  
![](https://raw.githubusercontent.com/Younglina/images/master/ohmyzsh.png)  


## 懒人小技巧
在看了antfu的直播以后，他分享了一些懒人的小技巧。  

[ni](https://github.com/antfu/ni) - use the right package manager  
这是他写的一个包管理器，运行它之后，会检测你的项目中是否存在锁文件，如`pnpm-lock.yaml、yarn.lock`，如果存在则运行对应的安装命令  

### 安装
```
npm i -g @antfu/ni
```

### 使用
```
ni
//发现项目中有 `pnpm-lock.yaml`，那么它就会执行`pnpm i`
//发现项目中有 `yarn.lock`，那么它就会执行`yarn install`
//存在多个的话 yarn.lock / pnpm-lock.yaml / package-lock.json
//优先级pnpm、npm、yarn
//所以，使用`ni`以后就不用考虑从`git`上面clone下来的项目使用的哪个包管理器，直接`ni`，它会帮你判断，就像`Vue3`从`yarn`变到`pnpm only`的情况

ni axios
# npm i axios
# yarn add axios
# pnpm add axios

nr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```

### 结合ohmyzsh
修改`.zshrc`文件，配置别名
```
vim ~/.zshrc
```

写入
```
//nr 对应上面 ni 的用法
alias d="nr dev"
alias s="nr start"
alias b="nr build"
//如果不想装ni,可以用常规的写法
alias d="npm run dev"
```
然后就可以直接在控制台中，输入配置的别名，如`d`，就会运行`nr dev`  
![](https://raw.githubusercontent.com/Younglina/images/master/nid.png)  
所以之后就可以配置很多常用的命令别名，来提高开发效率  
