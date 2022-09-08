---
title: 66.加一
author: Younglina
date: '2022-06-15'
showAccessNumber: true
categories:
 - 算法
tags:
 - 字符串
 - 简单
---

## 题目描述
[66.加一](https://leetcode.cn/problems/plus-one/)  
 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。  
最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。  
你可以假设除了整数 0 之外，这个整数不会以零开头。  

### 示例 1：
```
输入：digits = [1,2,3]  
输出：[1,2,4]  
解释：输入数组表示数字 123。  
```

### 示例 2：
```
输入：digits = [4,3,2,1]  
输出：[4,3,2,2]  
解释：输入数组表示数字 4321。  
```

### 示例 3：
```
输入：digits = [0]  
输出：[1]  
```

:::tip 提示
1 <= digits.length <= 100  
0 <= digits[i] <= 9  
:::

## 思路
直接倒叙遍历数组，如果当前数字是9，则设置为0，否则加1即可。  
再加个判断，如果是一个9，则需要在数组头部添加一个1。  

## 题解
```javascript
var plusOne = function(digits) {
    for(let i =digits.length-1;i>=0;i--){
        if(digits[i]!==9){
            digits[i]++
            return digits
        }else{
            digits[i]=0
        }
    }
    return [1,...digits]
};
```
