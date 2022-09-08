---
title: 代码规范格式化配置
author: Younglina
date: '2021-12-30'
categories:
 - 文档
tags:
 - 记录
 - 代码规范
---

## EsLint
1. vscode下载eslint和Vetur插件
2. 项目安装eslint插件
```
npm i eslint eslint-plugin-vue -D
npx eslit --init
```
3. 根目录新增.eslintrc.js
```javascript
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: ["vue"],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  rules: {
    "no-param-reassign": 0,
    "max-len": [
      2,
      {
        code: 140,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: "data:image",
      },
    ],
    "no-plusplus": 0,
    "vue/html-self-closing": 0,
    "comma-dangle": 0,
    "vue/require-default-prop": 0,
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "array-callback-return": 0,
    "global-require": 0,
    radix: 0,
    "no-console": 0,
    "consistent-return": 1,
    "class-methods-use-this": 0,
    "no-buffer-constructor": 1,
    "no-continue": 0,
    camelcase: 0,
    "vue/attributes-order": 0,
    "no-use-before-define": ["error", { functions: false, classes: false }],
    "no-debugger": 0,
    "vue/attribute-hyphenation": 0,
    "vue/no-use-v-if-with-v-for": 0,
    "no-multiple-empty-lines": 0,
    strict: 0,
    "lines-between-class-members": 0,
    "operator-linebreak": 0,
    "no-else-return": 0,
    "vue/no-mutating-props": 0,
    "vue/require-prop-type-constructor": 0,
    "vue/return-in-computed-property": 0,
    "object-curly-newline": 0,
    "operator-assignment": 0,
    "vue/no-unused-components": 0,
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
        multiline: {
          max: 3,
          allowFirstLine: true,
        },
      },
    ],
  },
};
```
## prettier
1. vscode下载prettier插件
2. 项目安装prettier插件
```
npm i prettier eslint-plugin-prettier -D
# 解决eslint和prettier冲突
npm i eslint-config-prettier -D
```
3. 根目录新增prettier.config.js
```javascript
//prettier.config.js

module.exports = { 
  "printWidth": 80, // 每行代码长度（默认80）
  "tabWidth": 2, // 每个tab相当于多少个空格（默认2）
  "useTabs": false, // 是否使用tab进行缩进（默认false）
  "singleQuote": true, // 使用单引号（默认false）
  "semi": false, // 声明结尾使用分号(默认true)
  "trailingComma": "all", // 多行使用拖尾逗号（默认none）
  "bracketSpacing": true, // 对象字面量的大括号间使用空格（默认true）
  "jsxBracketSameLine": false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  "arrowParens": "avoid" // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
}; 
```
4. 可配置package.json，手工执行格式化  
缺点是对所有文件进行格式化，可配置husky+lint-staged对单次提交的文件格式化
```javascript
"scripts": {
  "format": "prettier --write \"src/**/*.js\" \"src/**/*.vue\"",
}
```
## 配置 husky + lint-staged
1. 安装mrm, mrm 安装 lint-staged 会自动把 husky 一起安装下来
```
npm i mrm -D --registry=https://registry.npm.taobao.org
```
2. 安装lint-staged
```
npx mrm lint-staged
``` 
3. 结合 prettier 代码格式化,修改package.json
```
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,css,vue,ts,tsx}": [
    "prettier --write"
  ]
}
```
配置完成以后会在每次提交代码前对代码进行格式化