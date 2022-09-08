---
title: 1004.最大连续1的个数 III
author: Younglina
date: '2022-02-17'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 中等
---

## 题目描述
[1004.最大连续1的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/)  
给定一个二进制数组 `nums` 和一个整数 `k` ，如果可以翻转最多`k` 个 `0` ，则返回 数组中连续 `1` 的最大个数 。


### 示例 1：
```
输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2  
输出：6  
解释：[1,1,1,0,0,1,1,1,1,1,1]  
粗体数字从 0 翻转到 1，最长的子数组长度为 6。  
```

### 示例 2：
```
输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3  
输出：10  
解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]  
粗体数字从 0 翻转到 1，最长的子数组长度为 10。
```

:::tip 提示
1 <= nums.length <= 105  
nums[i] 不是 0 就是 1  
0 <= k <= nums.length
:::

## 思路
与[424.替换后的最长重复字符](https://leetcode-cn.com/problems/longest-repeating-character-replacement/)基本一样，
套用滑动窗口模板即可

## 题解
```javascript
var longestOnes = function(nums, k) {
    let len = nums.length,l=0,r=0,c=0,res=0
    while(r<len){
        c += nums[r]
        while(r-l+1 > c+k){
            c -= nums[l]
            l++
        }
        res = Math.max(r-l+1, res)
        r++
    }
    return res
}
```