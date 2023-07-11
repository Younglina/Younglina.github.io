---
title: 7天复习js-day1
author: Younglina
date: '2023-07-11'
categories:
 - 复习
tags:
 - javascript
---

## js数据类型

### `原始类型` 和 `引用类型`

1. 原始类型  
  - number(数字)：整数和浮点数  
  - string(字符串)：一串字符  
  - boolean(布尔值)：true或false
  - null：一个特殊的值，表示“空”
  - undefined：一个特殊的值，表示“未定义”
  - Symbol：ECMAScript 6中新增的数据类型，表示唯一的标识符

2. 引用类型
  - object(对象)：一组数据和功能的集合
  - array(数组)：一组有序的数据集合，可以通过索引访问
  - function(函数)：一段可执行的代码，可以通过调用来实现特定的功能
  - Map、Set、WeakMap、WeakSet：ES6新增的集合类型
  
### 存储方式

1. 原始类型
   原始类型的值存在于栈内存中，它们是按值访问的，当