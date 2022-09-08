---
title: 155.最小栈
author: Younglina
date: '2022-07-14'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述
**[155.最小栈](https://leetcode.cn/problems/min-stack/)**  
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。  
实现 MinStack 类:  
- MinStack() 初始化堆栈对象。
- void push(int val) 将元素val推入堆栈。
- void pop() 删除堆栈顶部的元素。
- int top() 获取堆栈顶部的元素。
- int getMin() 获取堆栈中的最小元素。


### 示例 1：

```
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

:::tip 提示
-231 <= val <= 231 - 1  
pop、top 和 getMin 操作总是在 非空栈 上调用  
push, pop, top, and getMin最多被调用 3 * 104 次  
:::

## 思路
由于需要在常数时间内检索到最小元素，所以要在push的时候，就能得到最小的元素，因为`push`是一次一次的，所以每次都和栈顶的最小元素比较就能获取当前最小的元素，且栈中存储的是[当前栈顶元素,当前最小元素]。  
当前最小元素是通过在`push`时，比较Math.min(当前元素，栈顶最小元素)  

## 题解
```javascript
var MinStack = function() {
    this.stack = []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    if(!this.stack.length){
        this.stack.push([val,val])
    }else{
        this.stack.push([val,Math.min(val,this.stack.at(-1)[1])])
    }

};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack.at(-1)[0]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.stack.at(-1)[1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```