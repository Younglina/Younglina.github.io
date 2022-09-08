---
title: 187.重复的DNA序列
author: Younglina
date: '2022-02-22'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 中等
---

## 题目描述
[187.重复的DNA序列](https://leetcode-cn.com/problems/repeated-dna-sequences/)  
DNA序列 由一系列核苷酸组成，缩写为 'A', 'C', 'G' 和 'T'.。  
例如，"ACGAATTCCG" 是一个 DNA序列 。    
在研究 DNA 时，识别 DNA 中的重复序列非常有用。  
给定一个表示 DNA序列 的字符串 s ，返回所有在 DNA 分子中出现不止一次的 长度为 10 的序列(子字符串)。你可以按 任意顺序 返回答案。

### 示例 1：
```
输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"  
输出：["AAAAACCCCC","CCCCCAAAAA"]  
```

### 示例 2：
```
输入：s = "AAAAAAAAAAAAA"  
输出：["AAAAAAAAAA"]  
```

:::tip 提示
1 <= nums.length <= 105  
-109 <= nums[i] <= 109  
0 <= k <= 105  
:::

## 思路
题意就是统计长度为10的滑动窗口所出现的次数等于2的

## 题解
```javascript
var findRepeatedDnaSequences = function(s) {
    let len = s.length,i=0,map=new Map(),res= [],ss="",step=10
    while(i<=len-step){
        ss = s.slice(i,i+step)
        map.set(ss, (map.get(ss)||0)+1)
        if(map.get(ss)===2)res.push(ss)
        i++
    }
    return res
};
```