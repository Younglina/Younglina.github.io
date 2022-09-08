---
title: 697.数组的度
author: Younglina
date: '2022-06-08'
showAccessNumber: true
categories:
 - 算法
tags:
 - 数组
 - 简单
---

## 题目描述
[697.数组的度](https://leetcode.cn/problems/degree-of-an-array/)  
给定一个非空且只包含非负数的整数数组 nums，数组的 度 的定义是指数组里任一元素出现频数的最大值。  

你的任务是在 nums 中找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度。  

### 示例 1：
```
输入：nums = [1,2,2,3,1]
输出：2
解释：
输入数组的度是 2 ，因为元素 1 和 2 的出现频数最大，均为 2 。
连续子数组里面拥有相同度的有如下所示：
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
最短连续子数组 [2, 2] 的长度为 2 ，所以返回 2 。
```

### 示例 2：
```
输入：nums = [1,2,2,3,1,4,2]  
输出：6
解释：
数组的度是 3 ，因为元素 2 重复出现 3 次。
所以 [2,2,3,1,4,2] 是最短子数组，因此返回 6 。
```

:::tip 提示
nums.length 在 1 到 50,000 范围内。  
nums[i] 是一个在 0 到 49,999 范围内的整数。  
:::

## 思路
遍历数组，创建一个`map`，key为数组中的元素，value为一个数组`[start,end,cnt]`，代表元素第一次出现的下标、最后一次出现的下标、出现的次数。
取出`map`的`values`，按度进行倒叙排序，第一个的度最大，子数组长度为`end-start+1`，从下标1开始遍历`values`，如果有相同的度，则对比子数组长度，取最小的。
## 题解
```javascript
var findShortestSubArray = function(nums) {
    let map={}
    for(let i=0;i<nums.length;i++){
        if(map[nums[i]]){
            map[nums[i]][1] = i
            map[nums[i]][2]++
        }else{
            map[nums[i]] = [i,i,1]
        }
    }
    let arr = Object.values(map).sort((a,b)=>b[2]-a[2])
    let max = arr[0][2],res=arr[0][1]-arr[0][0]+1
    for(let i=1;i<arr.length;i++){
        if(arr[i][2]===max){
            res = Math.min(res, arr[i][1]-arr[i][0]+1)
        }else{
            break
        }
    }
    return res
};
```