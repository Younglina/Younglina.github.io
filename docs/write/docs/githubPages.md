---
title: vuepress配置github pages域名访问
author: Younglina
date: '2022-03-11'
categories:
 - 文档
tags:
 - 记录
 - github pages
---

## 创建仓库
github新建一个名为 `你的用户名.github.io` 的仓库
- master分支 是存所有代码的
- gh-pages分支 是存build之后的静态文件的

## 域名
### 选择域名
在[万网](https://wanwang.aliyun.com/)上选择你需要的域名,需要实名认证,购买完成并审核通过后

![](https://raw.githubusercontent.com/Younglina/images/master/wanwang.png)  

### 域名解析
1. 先获取刚刚创建的仓库所对应的ip地址，`ping 你的用户名.github.io`  
![](https://raw.githubusercontent.com/Younglina/images/master/pingGit.png)  

2. 添加解析，[域名列表](https://dc.console.aliyun.com/next/index#/domain-list/all)设置解析
![](https://raw.githubusercontent.com/Younglina/images/master/cnameList.png)  

1. 添加记录，一个记录类型为`CNAME`的，记录值就是仓库名，一个记录类型为默认的，记录值为刚刚ping出来的ip
![](https://raw.githubusercontent.com/Younglina/images/master/cnameDns.png)  

### 设置域名
选择gh-pages分支，输入你的域名
![](https://raw.githubusercontent.com/Younglina/images/master/setCname.png)  

## 域名被清空
在每次提交gh-pages分支后，设置的域名都会被清空，需要在gh-pages分支提交的时候新增一个名为`CNAME`的文件，
没有后缀，文件内容为你的域名即可

### 使用脚本运行上面操作
1. 项目根目录新建`deploy.sh`文件
```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 拷贝目录和文件
cp -r ../../../.github ./
cp -r ../../../CNAME ./

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Younglina/Younglina.github.io.git master:gh-pages

cd -

```

2. package.json 新增运行命令
``` 
"scripts": {
  "deploy": "sh deploy.sh"
},
```

