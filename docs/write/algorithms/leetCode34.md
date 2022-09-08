---
title: 34.在排序数组中查找元素的第一个和最后一个位置
author: Younglina
date: '2022-03-26'
showAccessNumber: true
categories:
 - 算法
tags:
 - 二分查找
 - 中等
---

## 题目描述
[34.在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)  
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。  
如果数组中不存在目标值 target，返回 [-1, -1]。  
进阶：  
你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？  

### 示例 1：
```
输入：nums = [5,7,7,8,8,10], target = 8  
输出：[3,4]  
```

### 示例 2：
```
输入：nums = [5,7,7,8,8,10], target = 6  
输出：[-1,-1]  
```


### 示例 3：
```
输入：nums = [], target = 0  
输出：[-1,-1]  
```

:::tip 提示
0 <= nums.length <= 105  
-109 <= nums[i] <= 109  
nums 是一个非递减数组  
-109 <= target <= 109  
:::

## 思路
由题可知，就是要找到第一个大于等于`target`的下标`i`，和最后一个小于等于`target`的下标`j`，`[i,j]`就是结果  
符合蓝红二分条件  
[蓝红二分B站视频](https://www.bilibili.com/video/BV1d54y1q7k7)  
[蓝红二分模板](https://younglina.top/write/algorithms-temp/bluered.html)  
找到第一个大于等于`target`的条件是，`nums[mid]<target`，取`r`  
如果取得`r`对应`nums[r]!==target`的话，则说明`target`不存在与数组中，可直接返回`[-1,-1]`  
找到最后一个小于等于`target`的条件是，`nums[mid]<=target`，取`l`  

## 题解
```javascript
var searchRange = function(nums, target) {
    let l=-1,r=nums.length
    while(l+1!=r){
        const mid = Math.floor((l+r)/2)
        if(nums[mid]<target){
            l=mid
        }else{
            r=mid
        }
    }
    if(nums[l]!==target) return [-1,-1]
    const i = r
    l=-1,r=nums.length
    while(l+1!=r){
        const mid = Math.floor((l+r)/2)
        if(nums[mid]<target){
            l=mid
        }else{
            r=mid
        }
    }
    const j = l
    return [i,j]
};
```
