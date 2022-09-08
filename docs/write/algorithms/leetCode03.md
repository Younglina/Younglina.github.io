---
title: 03.无重复字符的最长子串
author: Younglina
date: '2022-01-04'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 滑动窗口
 - 中等
---

## 题目描述
[3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)  
给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。

### 示例 1：
```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

### 示例 2:
```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

### 示例 3:
```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

### 示例 4:
```
输入: s = ""
输出: 0
```

:::tip 提示
0 <= s.length <= 5 * 104  
s 由英文字母、数字、符号和空格组成
:::
## 思路1
直接套用滑动窗口模板
## 题解1
```javascript
var lengthOfLongestSubstring = function(s) {
    let len = s.length,l=0,r=0,c=0,ca={},res=0
    while(r<len){
      ca[s[r]] = (ca[s[r]] || 0) + 1
      if(ca[s[r]]===1) c++
      while(r-l+1 > c){
        if(--ca[s[l++]]===0) c--
      }
      r++
      res = Math.max(res, c)
    }
};
```
## 思路2
1. 定义双指针`l,r`，`r`遍历`s`
2. 定义哈希表`map`存储当前字符所对应下标
3. 如果当前字符已存在于`map`，则移动`l`至`Math.max(map.get(s[r])+1, l)`
## 题解2
```javascript
var lengthOfLongestSubstring = function(s) {
    let map = new Map(),max = 0;
    for(let i = 0,j=0;i<s.length;i++){
        if(map.has(s[i])){
            j = Math.max(map.get(s[i])+1,j) ;
        }
        max = Math.max(max,i-j+1)
        map.set(s[i],i)
    }
    return max
};
```