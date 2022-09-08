---
title: 442.数组中重复的数据
author: Younglina
date: '2022-06-08'
showAccessNumber: true
categories:
 - 算法
tags:
 - 数组
 - 原地修改
 - 中等
---

## 题目描述
[442.数组中重复的数据](https://leetcode.cn/problems/find-all-duplicates-in-an-array/)  
给你一个长度为 `n` 的整数数组 `nums` ，其中 `nums` 的所有整数都在范围 `[1, n]` 内，且每个整数出现 一次 或 两次 。请你找出所有出现 `两次` 的整数，并以数组形式返回。  

你必须设计并实现一个时间复杂度为 `O(n)` 且仅使用`常量额外空间`的算法解决此问题。  

### 示例 1：
```
输入：nums = [4,3,2,7,8,2,3,1]  
输出：[2,3]  
```

### 示例 2：
```
输入：nums = [1,1,2]  
输出：[1]  
```

### 示例 3：
```
输入：nums = [1]  
输出：[]  
```

:::tip 提示
n == nums.length  
1 <= n <= 105  
1 <= nums[i] <= n  
nums 中的每个元素出现 一次 或 两次  
:::

## 思路
题目规定必须设计并实现一个时间复杂度为 `O(n)` 且仅使用`常量额外空间`的算法解决此问题。  
题目又说长度为 `n`，所有整数都在范围 `[1, n]` 内，且每个整数出现一次或两次。  
将`nums[i]-1`当作下标看成`key`，`nums[nums[i]-1]`为`value`，则可以将`nums`转换为一个`hash`表。  
遍历数组，将当前元素-1，`nums[i]-1`当作下标，将`nums[nums[i]-1]`对应的元素取反，如果有`nums[nums[j]-1]`为负数，则说明`nums[j]`出现了两次。  
如 [1,1,2]
1. i=0, 找到下标为`nums[0]-1`的数，即`nums[1-1]`取反，nums = [-1,1,2]  
2. i=1, 找到下标为`nums[1]-1`的数，即`nums[1-1]`,发现已经取反，则说明该整数出现了两次。    


## 题解
```javascript
var findDuplicates = function(nums) {
    let res= []
    for(let i=0;i<nums.length;i++){
        let n = Math.abs(nums[i])
        if(nums[n-1]<0){
            res.push(n)
        }else{
            nums[n-1]*=-1
        }
    }
    return res
};
```