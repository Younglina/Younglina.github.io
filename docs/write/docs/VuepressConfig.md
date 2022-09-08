---
title: vuepress配置自动部署
author: Younglina
date: '2021-12-28'
categories:
 - 文档
tags:
 - 记录
 - vuepress
---

## 搭建一个简单的 VuePress 文档
### 1.创建并进入一个新目录

```javascript
mkdir vuepress-starter
cd vuepress-starter
```
### 2.初始化

```javascript
yarn init
```
### 3.VuePress 安装为本地依赖

```javascript
yarn add -D vuepress
```
### 4.创建一篇文档

```javascript
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

### 5.在 package.json 中添加一些 scripts

```javascript
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 6.在本地启动服务器

```javascript
yarn docs:dev
```
## 基本目录结构
::: tip
├── docs  
│   ├── .vuepress  
│   │   ├── public (放静态文件)  
│   │   ├── config.js (配置)  
│   ├── README.md（首页）  
│   └── somemd.md（自己的md）  
:::

## 配置live2d
```javascript
yarn add @vuepress-reco/vuepress-plugin-kan-ban-niang
// .vuepress/config.js
plugins: [
    [
        "@vuepress-reco/vuepress-plugin-kan-ban-niang", //live2d
        {
        theme: ["blackCat", "whiteCat"],
        clean: true,
        },
    ],
],
```
## 自动发布gh-pages
### 1.在github新建一个仓库 younglinaBlog(自定义)
### 2.在vuepress项目根目录新建deploy.sh
```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 拷贝目录和文件
cp -r ../../../.github ./

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Younglina/younglinaBlog.git master:gh-pages

cd -
```
### 3.发布
```javascript
//mac环境直接运行，window环境使用gitbash
sh deploy.sh
```

## 同步提交gitee
### 1.在gitee中导入github仓库
<img src="https://gitee.com/Younglina/younglinaBlog/raw/master/assets/giteeImport.png" />

### 2.在git中新增三个secrets
<img src="https://gitee.com/Younglina/younglinaBlog/raw/master/assets/secrit.png" />

(1) GITEE_PASSWORD => gitee的登录密码  

(2) GITEE_PRIVATE_KEY => 本地的 .ssh/id_rsa  

(3) GITEE_TOKEN => gitee的<a href="https://gitee.com/profile/personal_access_tokens" target="_blank">私人令牌</a>

### 3.同步脚本
根目录新增.github/workflows/syncToGitee.yml
```
name: syncToGitee
on:
  push:
    branches:
      - gh-pages
jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
    - name: Mirror the Github organization repos to Gitee.
      uses: Yikun/hub-mirror-action@master
      with:
        src: github/Younglina
        dst: gitee/Younglina
        dst_key: ${{ secrets.GITEE_PRIVATE_KEY }}
        dst_token: ${{ secrets.GITEE_TOKEN }}
        account_type: user
        static_list: "younglinaBlog"
        force_update: true
        debug: true

    - name: Build Gitee Pages
      uses: yanglbme/gitee-pages-action@main
      with:
        # 注意替换为你的 Gitee 用户名
        gitee-username: Younglina
        # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
        gitee-password: ${{ secrets.GITEE_PASSWORD }}
        # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
        gitee-repo: Younglina/younglinaBlog
        # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
        branch: gh-pages
```