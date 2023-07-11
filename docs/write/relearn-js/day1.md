---
title: 7天复习js-day1
author: Younglina
date: '2023-07-11'
categories:
 - 复习
tags:
 - javascript
---

## 数据类型
### 原始类型   
  - number(数字)：整数和浮点数  
  - string(字符串)：一串字符  
  - boolean(布尔值)：true或false
  - null：一个特殊的值，表示“空”
  - undefined：一个特殊的值，表示“未定义”
  - Symbol：ECMAScript 6中新增的数据类型，表示唯一的标识符
### 引用类型 
  - object(对象)：一组数据和功能的集合
  - array(数组)：一组有序的数据集合，可以通过索引访问
  - function(函数)：一段可执行的代码，可以通过调用来实现特定的功能
  - Map、Set、WeakMap、WeakSet：ES6新增的集合类型
  
### 存储方式

1. **原始类型**
   
   原始类型的值存在于`栈内存`中，它们是`按值`访问的，当创建一个原始类型的变量时，内存中会分配一块空间来存储该变量的`值`，当把一个原始类型的变量赋值给另一个变量时，实际是把这个值复制了一份，所以，`原始类型的值`在存储上是`独立的`。

    **赋值过程**
    ```javascript
    let a = 49
    let b = a
    b = 20
    ```

    **栈内存过程**
    ![](https://raw.githubusercontent.com/Younglina/images/master/day1-1.png)

2. **引用类型**  
   
    引用类型的值存在于`堆内存`中，它们是`按引用`访问的，指向堆的`引用地址`在`栈内存`中存储，当创建一个引用类型的变量时，内存中会分配一块空间来存储该变量的`引用`，这个引用指向存储在堆内存中的实际对象。当把一个引用类型的变量赋值给另一个变量时，实际是把这个引用复制了一份，而不是整个对象。`引用类型的`值在存储上是`共享的`，它们指向同一个实际对象，所以，任何对该对象的修改都会影响多有引用它的变量。

    **赋值过程**
    ```javascript
    let a = {}
    let b = a
    a.name = 'younglina'
    ```

    **栈内存过程**
    ![](https://raw.githubusercontent.com/Younglina/images/master/day2-2.png)