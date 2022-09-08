---
title: 438.找到字符串中所有字母异位词
author: Younglina
date: '2022-01-11'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 滑动窗口
 - 中等
---

## 题目描述
[438.找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)  
给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
### 示例 1：
```
输入: s = "cbaebabacd", p = "abc"  
输出: [0,6]  
解释:  
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。  
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。  
```

### 示例 2：
```
输入: s = "abab", p = "ab"  
输出: [0,1,2]  
解释:  
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。  
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。  
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。  
```

:::tip 提示
1 <= s.length, p.length <= 3 * 104  
s 和 p 仅包含小写字母  
:::

## 思路1
只要对比`s`中长度为`p.length`的滑动窗口中字符出现的次数与`p`中字符出现的次数相等即可  
1. 定义两个数组，分别存储`s`,`p`中字符出现的次数  
2. 遍历`p`，初始化两个数组，数据为`0到p.length`中各自字符出现的次数
3. 遍历`s`，对比两个数组是否相等，相等直接push，不相等向左移动滑动窗口，
`s[i]`对应的字符出现次数-1，`s[r]`对应的字符出现次数+1，`i,j`分别为左右指针

## 题解1
```javascript
var findAnagrams = function(s, p) {
  if(s.length<p.length) return []
  const pa = new Array(26).fill(0),
  ps=new Array(26).fill(0)
  for(let i=0;i<p.length;i++){
    pa[p[i].charCodeAt()-97]++
    ps[s[i].charCodeAt()-97]++
  }
  let r=p.length-1
  const ans = []
  for(let i=0;i<=s.length;i++){
    if(ps.toString()===pa.toString()){
        ans.push(i)
    }
    ps[s[i]?.charCodeAt()-97]--
    ps[s[++r]?.charCodeAt()-97]++
  }
  return ans
};
```

## 思路2
滑动窗口  
先记录`p`中字符出现的情况记为`mp`  
遍历`s`,确定滑动窗口`win`，`l`为右边界，`r`未左边界，记录窗口中字符出现的情况记为`ms`,`c`为窗口中不同字符的数量  
当`win`中的某个字符`ms[s[r]]`出现次数大于`mp`中的时，需要缩小`win`，即`l++`且`c--`，`ms`中对应字符减一  
当`c`等于`p`的长度时，说明当前窗口符合条件，`l`即为起始索引  
当当前字符不存在于`mp`中时，说明当前窗口不符合条件，需要重制`l`到`++r`，重新确定窗口

## 题解2
```javascript
var findAnagrams = function(s, p) {
    let len=s.length,pl=p.length,l=0,r=0,ms={},mp={},c=0,res=[]
    for(let i=0;i<pl;i++){
        mp[p[i]] = (mp[p[i]]||0)+1
    }
    while(r<len){
        if(!mp[s[r]]){
            l=++r
            ms={}
            c=0
        }else{
            ms[s[r]] = (ms[s[r]]||0)+1
            c++
            while(ms[s[r]]>mp[s[r]]){
                --ms[s[l++]]
                c--
            }
            if(c===pl){
                res.push(l)
            }
            r++
        }
    }
    return res
};
```

## 题解三 
套用找字符的滑动窗口模板
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