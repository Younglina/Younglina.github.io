---
title: 524.通过删除字母匹配到字典里最长单词
author: Younglina
date: '2022-01-13'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述
[524.通过删除字母匹配到字典里最长单词](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/)  
给你一个字符串 s 和一个字符串数组 dictionary ，找出并返回 dictionary 中最长的字符串，该字符串可以通过删除 s 中的某些字符得到。

如果答案不止一个，返回长度最长且字母序最小的字符串。如果答案不存在，则返回空字符串。

### 示例 1：
```
输入：s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]  
输出："apple"  
```

### 示例 2：
```
输入：s = "abpcplea", dictionary = ["a","b","c"]  
输出："a"  
```

:::tip 提示
1 <= s.length <= 1000  
1 <= dictionary.length <= 1000  
1 <= dictionary[i].length <= 1000  
s 和 dictionary[i] 仅由小写英文字母组成  
:::

## 思路
通过循环`dictionary`，定义双指针`k,t`,分别为`s`,`dictionary[x]`中的字符，如果`s[x] === d[x]`，
则说明`d`中字符存在于`s`中，两个指针都往后移动，否则只移动`k`。
对比结束后，如果`t===d.length`，说明`t`移到了`d`的最后，`t`可以通过删除`s`中的某些字符得到，

## 题解
```javascript
var findLongestWord = function(s, d) {
    let ss = s.length
    let res = ""
    for(const dd of d){
        let [k,t] = [0,0]
        while(k<ss && t<dd.length){
            if(s[k]===dd[t]) t++
            k++
        }
        if(t===dd.length){
            if(dd.length>res.length || (dd.length===res.length && dd<res)){
                res = dd
            }
        }
    }
    return res
};
```
## 题解
```javascript
var findLongestWord = function(s, d) {
    let ss = s.length
    d.sort((a,b)=>{
        if(a.length!==b.length){
            return b.length-a.length
        }else{
            return a.localeCompare(b)
        }
    })
    for(const dd of d){
        let [k,t] = [0,0]
        while(k<ss && t<dd.length){
            if(s[k]===dd[t]) t++
            k++
        }
        if(t===dd.length){
           return dd
        }
    }
    return ""
};
```