---
title: 1221.分割平衡字符串
author: Younglina
date: '2022-02-18'
showAccessNumber: true
categories:
 - 算法
tags:
 - 计数
 - 简单
---

## 题目描述
[1221.分割平衡字符串](https://leetcode-cn.com/problems/split-a-string-in-balanced-strings/)  
在一个 平衡字符串 中，'L' 和 'R' 字符的数量是相同的。  
给你一个平衡字符串 s，请你将它分割成尽可能多的平衡字符串。  
注意：分割得到的每个字符串都必须是平衡字符串，且分割得到的平衡字符串是原平衡字符串的连续子串。  
返回可以通过分割得到的平衡字符串的 最大数量 。

### 示例 1：
```
输入：s = "RLRRLLRLRL"  
输出：4  
解释：s 可以分割为 "RL"、"RRLL"、"RL"、"RL" ，每个子字符串中都包含相同数量的 'L' 和 'R' 。  
```

### 示例 2：
```
输入：s = "RLLLLRRRLR"  
输出：3  
解释：s 可以分割为 "RL"、"LLLRRR"、"LR" ，每个子字符串中都包含相同数量的 'L' 和 'R' 。  
```

### 示例 3：
```
输入：s = "RLRRRLLRLL"  
输出：2  
解释：s 可以分割为 "RL"、"RRRLLRLL" ，每个子字符串中都包含相同数量的 'L' 和 'R' 。  
```

:::tip 提示
1 <= s.length <= 1000  
s[i] = 'L' 或 'R'  
s 是一个 平衡 字符串  
:::

## 思路
类似于符合条件的`()`数量，使用计数方式`c`，出现`R`，`c++`，出现`L`，`c--`

## 题解
```javascript
var balancedStringSplit = function(s) {
    let c=0,r=0
    for(let i of s){
        i==='R'?c++:c--
        if(c===0) r++
    }
    return r
}
```