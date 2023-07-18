---
title: javascript知识点
author: Younglina
date: '2023-07-11'
categories:
 - 知识点
tags:
 - javascript
---
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

## 原型

JavaScript中所有的对象都有一个内置属性，称为它的`prototype（原型）`。它本身是一个对象，故原型对象也会有它自己的原型，逐渐构成了`原型链`。

::: tip
 指向对象原型的属性并不是 prototype。它的名字不是标准的，但实际上所有浏览器都使用 `__proto__`。访问对象原型的标准方法是 Object.getPrototypeOf()。
:::

```javascript
function Foo(name){
  this.name = name
}

console.log(Foo.prototype)

{
  constructor: ƒ Foo(name)
  [[Prototype]]: Object: { // 其实是__proto__
    constructor: ƒ Object()
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
  }
}
```


## 原型链

可以看出`Foo`的原型对象也有自己的原型，可以通过`__proto__`访问
```javascript
console.log(Foo.prototype.__proto__)

{
  constructor: ƒ Object()
  hasOwnProperty: ƒ hasOwnProperty()
  isPrototypeOf: ƒ isPrototypeOf()
  propertyIsEnumerable: ƒ propertyIsEnumerable()
  toLocaleString: ƒ toLocaleString()
  toString: ƒ toString()
  valueOf: ƒ valueOf()
}
```

`__proto__`属性就是实例对象和它的构造函数`prototype`之间的一个链接，通过它一层一层的构建出`原型链`

```javascript
function Foo(name){
  this.name = name
}
const bar = new Foo('younglina')

console.log(bar.__proto__ === Foo.prototype) //true
```

**总结一下**：

- 构造函数`Foo`有一个`prototype`属性，即原型对象`Foo.prototype`
- 实例对象`bar`的`__proto__`指向构造函数`Foo`的原型对象`Foo.prototype`
- `Foo.prototype.__proto`指向内置对象`Object`

![](https://raw.githubusercontent.com/Younglina/images/master/proto.png)

## 作用域

作用域就是变量与函数的可访问范围，即作用域控制变量与函数的可见性和生命周期。

```javascript
function foo(){
  var a = 1
  let b = 2
  {
    let b = 3
    var c = 4
    let d = 5
    console.log(a)
    console.log(b)
  }
  console.log(b)
  console.log(c)
  console.log(d)
}

foo()
```

**第一步：javascript引擎会编译并创建执行上下文，此时的`foo`执行上下文：**

![](https://raw.githubusercontent.com/Younglina/images/master/zyy1.png)

**由图可知**：  

- 函数内部通过`var`创建的变量，在编译阶段存放在变量环境
- 通过`let`创建的变量，在编译阶段存放在词法环境
- 在函数内部的作用域块，`let`声明的变量不会放到词法环境中

**第二步：执行foo内部代码块**

![](https://raw.githubusercontent.com/Younglina/images/master/zyy2.png)

**由图可知**：  

当进入函数内部的作用域块时，作用域块中通过`let`声明的变量，会被存放到词法环境的一个单独区域中，这个区域中的变量并不影响作用域块外部的变量，比如上面的两个b变量，它们都是独立存在的。

其实在词法环境内部，维护了一个栈型结构，栈底是函数最外层的变量，当进入函数内部作用域块时，就把这块的作用域块内部的变量入栈。如上图词法环境中两个单独的作用域块。

当执行到`console.log(a)`时，就需要在词法环境和变量环境中查找`变量a`的值了，查找方式为：从词法环境的栈顶向下查询，如果找到则返回给js引擎，如果没有，就在变量环境中继续查找。

![](https://raw.githubusercontent.com/Younglina/images/master/zyy3.png)

当作用域块执行结束之后，其内部定义的变量就会从词法环境的栈中弹出。

![](https://raw.githubusercontent.com/Younglina/images/master/zyy4.png)

## 作用域链

通过下面代码来分析作用域链

```javascript
function bar() {
  console.log(name)
}
function foo() {
  var name = "foo name"
  bar()
  console.log(name)
}
var name = "global name"
foo()
```

当执行到`bar`时，此时调用栈为

![](https://raw.githubusercontent.com/Younglina/images/master/zyy3.png)

在每个执行上下文变量环境中，都包含一个外部应用，用来指向外部的执行上下文，称为`outer`。  
通过上面的调用栈可以看出，`foo`和`bar`的`outer`都是指向全局执行上下文的，所以当两个函数内部有使用外部变量时，应该去全局上下文中查找。这个查找的过程链就称为`作用域链`。  

::: tip  
Q: 为什么`foo`函数内调用`bar`，`bar`的外部引用是全局执行上下文，而不是`foo`的执行上下文？  
A: 因为在js中，作用域链是由`词法作用域`决定的  
:::

## 词法作用域

词法作用域是指函数作用域是由代码中声明的位置决定的，是在编译时就决定了的，与函数在哪里调用无关

## 块级作用域中变量的查找

通过一个相对复杂的执行过程总结一下作用域。

```javascript
function bar() {
  var name = "bar name"
  let value1 = 100
  if (1) {
    let name = "bar block name"
    console.log(value)
  }
}

function foo() {
  var name = "foo name"
  let value = 2

  {
    let value = 3
    bar()
  }

}
var name = "global name"
let agg = 10
let value = 1
foo()
```

调用栈图解：
![](https://raw.githubusercontent.com/Younglina/images/master/zyy4.png)

分析：当执行到`console`时，先在其作用域的词法环境中，从上往下查找，没找到再去变量环境中找，因为`bar`执行上下文的外部引用指向全局作用域，所以最后到全局作用域的词法环境中找。