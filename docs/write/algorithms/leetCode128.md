---
title: 128.最长连续序列
author: Younglina
date: '2022-07-05'
showAccessNumber: true
categories:
 - 算法
tags:
 - 哈希表
 - 中等
---

## 题目描述
[128.最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)  
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。  
请你设计并实现时间复杂度为 O(n) 的算法解决此问题。  

### 示例 1：
```
输入：nums = [100,4,200,1,3,2]  
输出：4  
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。  
```

### 示例 2：
```
输入：nums = [0,3,7,2,5,8,4,6,0,1]  
输出：9  
```

:::tip 提示
0 <= nums.length <= 105  
-109 <= nums[i] <= 109  
:::

## 思路
题目说了要用O(n)的时间复杂度，那就不能用排序，需要用哈希表  
因为数组中可能存在重复元素，用set对数组进行去重，且set可以快速判断元素是否存在  
遍历set，当遍历到一个数`i`，set中不存在`i-1`时，则`i`为某个连续序列的开头，将`i`赋值给一个临时变量`cur`，然后依次判断set中是否存在`cur+1`，cur自增，当不存在时，以当前`i`开头的连续序列结束，该序列的长度为`cur-i+1`，重复上面的操作，找到最长序列即可  

## 题解
```javascript
var longestConsecutive = function(nums) {
    nums = new Set(nums)
    let res = 0
    for(let i of nums){
        if(!nums.has(i-1)){
            let cur = i
            while(nums.has(cur+1)) cur++
            res = Math.max(res, cur-i+1)
        }
    }
    return res
};
```