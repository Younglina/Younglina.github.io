---
title: 219.存在重复元素 II
author: Younglina
date: '2022-02-22'
showAccessNumber: true
categories:
 - 算法
tags:
 - 哈希表
 - 简单
---

## 题目描述
[219.存在重复元素 II](https://leetcode-cn.com/problems/contains-duplicate-ii/)  
给你一个整数数组 `nums` 和一个整数 `k` ，判断数组中是否存在两个 *不同的索引* `i` 和 `j` ，满足 `nums[i] == nums[j]` 且 `abs(i - j) <= k` 。如果存在，返回 `true` ；否则，返回 `false` 。
### 示例 1：
```
输入：nums = [1,2,3,1], k = 3  
输出：true  
```
### 示例 2：
```
输入：nums = [1,0,1,1], k = 1  
输出：true  
```
### 示例 3：
```
输入：nums = [1,2,3,1,2,3], k = 2  
输出：false  
```

:::tip 提示
1 <= nums.length <= 105  
-109 <= nums[i] <= 109  
0 <= k <= 105  
:::

## 思路
遍历数组，定义一个哈希表`map`，记录每个数对应的下标，如果当前数存在于`map`，则判断当前下标与`map`中的下标差值是否符合
## 题解
```javascript
var containsNearbyDuplicate = function(nums, k) {
   let map = new Map(),len=nums.length
    for(let i=0;i<len;i++){
        if(map.has(nums[i]) && i-map.get(nums[i])<=k){
            return true
        }
        map.set(nums[i],i)
    }
    return false
}
```