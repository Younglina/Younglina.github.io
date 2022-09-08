---
title: 581.最短无序连续子数组
author: Younglina
date: '2022-01-14'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述
[581.最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/)  
给你一个整数数组`nums`，你需要找出一个`连续子数组`，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

请你找出符合题意的`最短`子数组，并输出它的长度。

### 示例 1：
```
输入：nums = [2,6,4,8,10,9,15]  
输出：5  
解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
```

### 示例 2：
```
输入：nums = [1,2,3,4]  
输出：0  
```

:::tip 提示
1 <= nums.length <= 104  
-105 <= nums[i] <= 105  
:::

## 思路
两头判断，左边应一直为递增，右边应一直为递减
1. 定义双指针，`low`和`high`，分别对应`nums.length-1`、`0`
2. 定义俩个值，`min`和 `max`，分别对应`nums[nums.length-1]`、`nums[0]`
3. 循环数组，`i`为当前循环的下标，从`1`开始,`len=nums.length`
4. 取`Math.min(nums[len-i-1], min)`
   * 因为`min`定义为数组最后一项，如果它的前一项比他大，即`nums[len-i-1]>min`，说明倒数两项不是递减，需要更改`low=len-i-1`
5. 取`Math.max(nums[i], max)`
   * 因为`max`定义为数组第一项，如果它比它的后一项大，即`max>nums[i]`，说明前两项不是递增，需要更改`high=i`
6. 如果数组一直是递增的，那最后`high和low`的值不会发生变化，即`high<low`,直接返回`0`
7. 如果存在不是递增的子序列，则`high>low`，返回`high-low+1`

## 题解
```javascript
var findUnsortedSubarray = function(nums) {
    let len = nums.length
    let [min, max] = [nums[len-1],nums[0]]
    let [low, high] = [len-1, 0]
    for(let i=1;i<len;i++){
        min = Math.min(min, nums[len-i-1])
        max = Math.max(max, nums[i])
        if(nums[len-i-1]>min){
            low = len-i-1
        }
        if(max>nums[i]){
            high = i
        }
    }
    return high>low?high-low+1:0
};
```
