---
title: 242.有效的字母异位词
author: Younglina
date: '2022-02-19'
showAccessNumber: true
categories:
 - 算法
tags:
 - 计数
 - 简单
---

## 题目描述
[242.有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)  
给定两个字符串 `s` 和 `t` ，编写一个函数来判断 `t` 是否是 `s` 的字母异位词。  
注意：若 `s` 和 `t` 中每个字符出现的次数都相同，则称 `s` 和 `t` 互为字母异位词。  

### 示例 1：
```
输入: s = "anagram", t = "nagaram"  
输出: true  
```

### 示例 2：
```
输入: s = "rat", t = "car"  
输出: false  
```

:::tip 提示
1 <= s.length, t.length <= 5 * 104  
s 和 t 仅包含小写字母  
:::

## 思路
1. 利用一个数组存储`s`中出现的字符次数
2. 遍历`t`，如果数组中存在对应字符，则次数减一，当碰到不存在的字符时，直接返回false

## 题解
```javascript
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false
    let arr = new Array(26).fill(0)
    for(const i of s){
        arr[i.charCodeAt()-97]++
    }
    for(const i of t){
        if(!arr[i.charCodeAt()-97]--) return false
    }
    return true
};
```