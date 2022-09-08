---
title: 剑指 Offer 53 - II.0～n-1中缺失的数字
author: Younglina
date: '2022-03-27'
showAccessNumber: true
categories:
 - 算法
tags:
 - 二分查找
 - 简单
---

## 题目描述
[剑指 Offer 53 - II.0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)  
一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。  

### 示例 1：
```
输入: [0,1,3]  
输出: 2  
```

### 示例 2：
```
输入: [0,1,2,3,4,5,6,7,9]  
输出: 8  
```

:::tip 提示
1 <= 数组长度 <= 10000  
:::

## 思路
根据题意可知，数据和数组下标是对应的，如果中间有缺失，则数据肯定比下标大，而且又是有序数组，利用二分查找
，条件为`nums[mid]>mid`

## 题解
```javascript
var missingNumber = function(nums){
    let l=0,r=nums.length-1
    while(l<r){
        const mid = Math.floor((r+l)/2)
        if(nums[mid]>mid){
            r = mid-1
        }else{
            l = mid
        }
    }
    return l
}
```