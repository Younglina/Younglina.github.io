---
title: 33.搜索旋转排序数组
author: Younglina
date: '2022-03-19'
showAccessNumber: true
categories:
 - 算法
tags:
 - 二分查找
 - 中等
---

## 题目描述
[33.搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)  
整数数组 `nums` 按升序排列，数组中的值 互不相同 。

在传递给函数之前，`nums` 在预先未知的某个下标 `k（0 <= k < nums.length）`上进行了 旋转，使数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`（下标 从 0 开始 计数）。例如， `[0,1,2,4,5,6,7]` 在下标` 3` 处经旋转后可能变为 `[4,5,6,7,0,1,2]` 。

给你 `旋转后` 的数组 `nums` 和一个整数 `target` ，如果 `nums` 中存在这个目标值 `target` ，则返回它的下标，否则返回 `-1` 。

### 示例 1：
```
输入：nums = [4,5,6,7,0,1,2], target = 0  
输出：4  
```

### 示例 2：
```
输入：nums = [4,5,6,7,0,1,2], target = 3  
输出：-1  
```

### 示例 3：
```
输入：nums = [1], target = 0  
输出：-1  
```

:::tip 提示
1 <= nums.length <= 5000  
-10^4 <= nums[i] <= 10^4  
nums 中的每个值都 独一无二  
题目数据保证 nums 在预先未知的某个下标上进行了旋转  
-10^4 <= target <= 10^4  
:::

## 思路
还是用正常二分的思想，只是需要多判断几次,确定升序区间，判断target是否处于确定的升序区间内。 
先确定`l=0,r=nums.legnth-1`
1. 如果`nums[mid]===target`直接返回`mid`
2. 如果`nums[mid]>=nums[l]`,则`[l,mid]`一定是升序区间
- 判断target是否处于`[l,mid]`的区间内，`target>=nums[l] && target<=nums[mid]`，把`r移到mid-1`
- 否则把`l移到mid+1`
3. 否则就是`nums[mid]<nums[l]`，则`[mid,r]`一定是升序区间
- 判断target是否处于`[mid,r]`的区间内，`target>=nums[mid] && target<=nums[r]`，把`l移到mid+1`
- 否则把`r移到mid-1`

## 题解
```javascript
var search = function(nums, target) {
    let len = nums.length-1,l=0,r=len
    while(l<=r){
        let mid = Math.floor((r+l)/2)
        if(nums[mid]===target) return mid
        if(nums[mid]>=nums[l]){
            if(target<=nums[mid] && target>=nums[l]){
                r = mid-1
            }else{
                l = mid+1
            }
        }else{
            if(target>=nums[mid] && target<=nums[r]){
                l = mid+1
            }else{
                r = mid-1
            }
        }
    }
    return -1
};
```