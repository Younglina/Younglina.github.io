---
title: 633.平方数之和
author: Younglina
date: '2022-01-19'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 简单
---

## 题目描述
[633.平方数之和](https://leetcode-cn.com/problems/sum-of-square-numbers/)  
给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a2 + b2 = c 。

### 示例 1：
```
输入：c = 5  
输出：true  
解释：1 * 1 + 2 * 2 = 5  
```

### 示例 2：
```
输入：c = 3  
输出：false  
```

### 示例 3：
```
输入：c = 4  
输出：true  
```

:::tip 提示
0 <= c <= 231 - 1
:::

## 思路
定义双指针`i`,`j`分别为`0`,`Math.ceil(Math.sqrt(c))`，`r=i*i+j*j`
* r===c return true
* r<c i++
* r>c j--

## 题解
```javascript
var judgeSquareSum = function(c) {
    let [i,j] = [0,Math.ceil(Math.sqrt(c))]
    while(i<=j){
        let r = i*i+j*j
        if(r === c){
            return true
        }else if(r>c){
            j--
        }else{
            i++
        }
    }
    return false
};
```
