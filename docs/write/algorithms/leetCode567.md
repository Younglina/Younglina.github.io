---
title: 567.字符串的排列
author: Younglina
date: '2022-02-23'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 中等
---

## 题目描述
[567.字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)  
给你两个字符串 `s1` 和 `s2` ，写一个函数来判断 `s2` 是否包含 `s1` 的排列。如果是，返回 `true` ；否则，返回 `false` 。

换句话说，`s1` 的排列之一是 `s2` 的 子串 。
### 示例 1：
```
输入：s1 = "ab" s2 = "eidbaooo"  
输出：true  
解释：s2 包含 s1 的排列之一 ("ba").  
```

### 示例 2：
```
输入：s1= "ab" s2 = "eidboaoo"  
输出：false  
```

:::tip 提示
1 <= s1.length, s2.length <= 104  
s1 和 s2 仅包含小写字母  
:::
## 思路
于
[438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)基本一样，只是返回条件不同，套用找字符的滑动窗口模板

## 题解

```javascript
var findAnagrams = function(s, p) {
    let [sl,pl] = [s.length,p.length],arr=new Array(26).fill(0)
    for(let i=0;i<pl;i++){
        arr[p[i].charCodeAt()-97]++
    }
    let l=0,r=0,res=[],t=""
    while(r<sl){
        t=s[r].charCodeAt()-97
        arr[t]--
        while(arr[t]<0){
            arr[s[l++].charCodeAt()-97]++
        }
        if(r-l+1===pl) res.push(l)
        r++
    }
    return res
};
```