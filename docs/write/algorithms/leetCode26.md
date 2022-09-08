---
title: 26.删除有序数组中的重复项
author: Younglina
date: '2022-01-05'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 简单
---

## 题目描述
[26.删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)  
给你一个有序数组`nums`，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用`O(1)`额外空间的条件下完成。

### 示例 1：
```
输入：nums = [1,1,2]
输出：2, nums = [1,2]
解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。
不需要考虑数组中超出新长度后面的元素。
```

### 示例 2：
```
输入：nums = [0,0,1,1,1,2,2,3,3,4]
输出：5, nums = [0,1,2,3,4]
解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。
不需要考虑数组中超出新长度后面的元素。
```

:::tip 提示
0 <= nums.length <= 3 * 104  
-104 <= nums[i] <= 104  
nums 已按升序排列  
:::

## 思路
快慢指针，快指针循环数组，慢指针从0开始，快指针与慢指针对比，如果数据不相等，把当前快指针对应数据与慢指针下一个对应的数据进行交换，且慢指针向后移动一位

## 题解
```javascript
var removeDuplicates = function(nums) {
  let i = 0
  for(let j=1;j<nums.length;j++){
    if(nums[i]!==nums[j]){
      nums[++i] = nums[j]
    }
  }
  return i+1
};
```