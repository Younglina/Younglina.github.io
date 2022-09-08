---
title: 485.最大连续 1 的个数
author: Younglina
date: '2022-01-12'
showAccessNumber: true
categories:
 - 算法
tags:
 - 模拟
 - 简单
---

## 题目描述
[485.最大连续 1 的个数](https://leetcode-cn.com/problems/max-consecutive-ones/)  
给定一个二进制数组， 计算其中最大连续`1`的个数。

### 示例：
```
输入：[1,1,0,1,1,1]  
输出：3  
解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.  
```

:::tip 提示
输入的数组只包含 0 和 1 。  
输入数组的长度是正整数，且不超过 10,000。  
:::

## 思路
遍历数组，碰到`1`累加，反之清零

## 题解
```javascript
var findMaxConsecutiveOnes = function(nums) {
  let [a,t] = [0,0]
  nums.map(item=>{
    if(item===1){
      a = Math.max(a, ++t)
    }else{
      t = 0
    }
  })
  return a
};
```