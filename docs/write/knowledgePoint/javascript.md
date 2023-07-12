---
title: javascript知识点
author: Younglina
date: '2023-07-11'
categories:
 - 知识点
tags:
 - javascript
---
1
## 数据类型
### 基本类型   
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

1. **基本类型**
   
   基本类型的值存在于`栈内存`中，它们是`按值`访问的，当创建一个基本类型的变量时，内存中会分配一块空间来存储该变量的`值`，当把一个基本类型的变量赋值给另一个变量时，实际是把这个值复制了一份，所以，`基本类型的值`在存储上是`独立的`。

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

## Map、WeakMap、Set、WeakSet

1. Map、WeakMap
   - Map的键可以是任意类型，包括对象和基本类型，WeakMap的键只能是对象
   - Map是可枚举的，WeakMap不可枚举，所以没有`size,keys(),values(),entries()`，只有`has(),get(),set(),delete()`
   - Map的键是强引用，WeakMap的是弱引用。
      ```javascript
      const wm = new WeakMap();
      const element = document.getElementById('example');
      wm.set(element, 'some information');
      wm.get(element)
      ```
      上面代码中，先新建一个 WeakMap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。  
      也就是说，上面的 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。WeakMap 保存的这个键值对，也会自动消失。
   - WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

2. Set、WeakSet
   - Set的键可以是任意类型，包括对象和基本类型，WeakSet的键只能是对象
   - Set是可枚举的，WeakSet不可枚举，没有`size`，只有`has(),add(),delete()`
   - Set的键是强引用，WeakSet的是弱引用。回收机制与WeakMap类似

## typeof

typeof用于检查基本类型和函数，不能用于检查复杂数据类型的具体类型，如Date、Array等，typeof会返回"object"。如果需要检查复杂数据类型的具体类型，可以使用一些其他方法，例如 Object.prototype.toString.call()。

```javascript
typeof undefined // "undefined"
typeof null // "object"（这是一个历史遗留问题，实际上 null 是一个特殊的对象类型）
typeof true // "boolean"
typeof 42 // "number"
typeof "Hello" // "string"
typeof [] // "object"
typeof {} // "object"
typeof function() {} // "function"
typeof BigInt(10) // "bigint"
```

## instanceof

instanceof借助原型链判断复杂数据类型，用于检测构造函数的`prototype`属性是否存在于实例对象的原型链上。

```javascript
let a = [1,2]
let b = new Date()
let c = /abc/
let d = { name: '1'}

a instanceof Array 
b instanceof Date 
c instanceof RegExp 
d instanceof Object 
```

### 手写instanceof
```javascript

const myInstanceof = (val, constructor) => {
  let prot = Object.getPrototypeOf(val)
  while(prot && prot !== constructor.prototype){
    prot = Object.getPrototypeOf(prot)
  }
  return prot !== null
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = new Person('Alice', 20);

console.log(myInstanceof(person, Person)); // true
console.log(myInstanceof(person, Object)); // true
console.log(myInstanceof(person, Array)); // false

```