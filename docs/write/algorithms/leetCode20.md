---
title: 20.有效的括号
author: Younglina
date: '2022-02-19'
showAccessNumber: true
categories:
 - 算法
tags:
 - 栈
 - 简单
---

## 题目描述
[20.有效的括号](https://leetcode-cn.com/problems/valid-parentheses/submissions/)  
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。  
有效字符串需满足：  
左括号必须用相同类型的右括号闭合。  
左括号必须以正确的顺序闭合。  

### 示例 1：
```
输入：s = "()"  
输出：true  
```

### 示例 2：
```
输入：s = "()[]{}"  
输出：true  
```

### 示例 3：
```
输入：s = "(]"  
输出：false  
```

### 示例 4：
```
输入：s = "([)]"  
输出：false  
```

### 示例 5：
```
输入：s = "{[]}"
输出：true
```

:::tip 提示
1 <= s.length <= 104  
s 仅由括号 '()[]{}' 组成  
:::

## 思路
一开始想的是计数，但是发现实例4的情况，计数是不正确的，所以转变思想使用栈的方式。
1. 设置一个对象存储：左括号和右括号的对应结构`map = {'(':')','{':'}','[':']'}`
2. 当遍历字符串遇到左括号时进栈`arr.push()`
3. 当在循环中碰到右括号但是栈时空的时，此时为右括号开头，是不符合条件的，直接返回false
4. 否则判断此时的栈顶括号与当前括号是否一致
5. 最后判断栈是否为空

## 题解
```javascript
var isValid = function(s) {
    let map = {'(':')','{':'}','[':']'},arr=[]
    for(let i=0,len=s.length;i<len;i++){
        if(map[s[i]]){
            arr.push(map[s[i]])
        }else{
            if(!arr.length || arr.pop()!==s[i]) return false
        }
    }
    return arr.length === 0
};
```