---
title: 992.K个不同整数的子数组
author: Younglina
date: '2022-02-17'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 困难
---

## 题目描述
[992.K个不同整数的子数组](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/)  
给定一个正整数数组 `nums` 和一个整数 `k` ，返回 `num` 中 「好子数组」 的数目。

如果 `nums` 的某个子数组中不同整数的个数恰好为 `k`，则称 `nums` 的这个连续、不一定不同的子数组为 「好子数组 」。

例如，`[1,2,3,1,2]` 中有 `3` 个不同的整数：`1，2，`以及 `3`。
`子数组` 是数组的 `连续` 部分。

### 示例 1：
```
输入：nums = [1,2,1,2,3], k = 2  
输出：7  
解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].  
```

### 示例 2：
```
输入：nums = [1,2,1,3,4], k = 3  
输出：3  
解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].  
```

:::tip 提示
1 <= nums.length <= 2 * 104  
1 <= nums[i], k <= nums.length  
:::

## 思路
滑动窗口，套用滑动窗口模板，使用小于等于`k`的减去小于等于`k-1`的

## 题解
```javascript
var subarraysWithKDistinct = function(A, K) {
    function func(A,K){
        let len = A.length,r=0,l=0,c=0,
        ca=new Array(A.length+1).fill(0), // 因为nums[i]<=nums.length
        res=0
        while(r<len){
            if(ca[A[r]]++ === 0){ //下面的简便写法
                c++
            }
            // if(ca[A[r]] === 0){
            //     ca[A[r]]++
            //     c++
            // }
            while(c>K){
                if(--ca[A[l++]]===0) c-- //下面的简便写法
                // --ca[A[l]]
                // if(ca[A[l]]===0){
                //     l++
                // }
                // c--
            }
            res += r-l+1
            r++
        }
        return res
    }
    return func(A, K) - func(A, K-1)
}
```