---
title: 41.缺失的第一个正数
author: Younglina
date: '2022-06-08'
showAccessNumber: true
categories:
 - 算法
tags:
 - 数组
 - 原地修改
 - 困难
---

## 题目描述
[41.缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)  
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。  

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。  

### 示例 1：
```
输入：nums = [1,2,0]  
输出：3  
```

### 示例 2：
```
输入：nums = [3,4,-1,1]  
输出：2  
```

### 示例 3：
```
输入：nums = [7,8,9,11,12]  
输出：1  
```

:::tip 提示
1 <= nums.length <= 5 * 105  
-231 <= nums[i] <= 231 - 1  
:::

## 思路
规定时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。基本上就是原地修改。  
根据题意可知，要找的数在 `[1, N + 1]` 左闭右闭的这个区间内，N是数组的长度，  
那么可以通过遍历数组，将`大于0`并且`小于N`的数字放到它-1的下标上，如1放到0的下标上，2放到1的下标上，3放到2的下标上，以此类推。  
然后再遍历一次数组，如果当前数不是对应的下标+1，那么下标+1就是缺失的数，如果所有数都对应上了，那缺失的就是N+1。    

## 题解
```javascript
var firstMissingPositive = function(nums) {
    let len = nums.length
    for(let i=0;i<len;i++){
        while(nums[i]>0 && nums[i]<=len && nums[nums[i]-1]!=nums[i]){ //如果nums[nums[i]-1]==nums[i],那么当前数已经处于正确的位置,不需要再移动
            [nums[nums[i]-1],nums[i]]=[nums[i],nums[nums[i]-1]];
    }

    for(let i=0;i<len;i++){
        if(nums[i]!=i+1){
            return i+1
        }
    }

    return len+1
};

```