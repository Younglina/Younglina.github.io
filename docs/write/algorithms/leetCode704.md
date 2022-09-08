---
title: 704.二分查找
author: Younglina
date: '2022-03-17'
showAccessNumber: true
categories:
 - 算法
tags:
 - 二分查找
 - 简单
---

## 题目描述
[704.二分查找](https://leetcode-cn.com/problems/binary-search/)  
给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target`  ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 `-1`。  

### 示例 1：
```
输入: nums = [-1,0,3,5,9,12], target = 9  
输出: 4  
解释: 9 出现在 nums 中并且下标为 4  
```

### 示例 2：
```
输入: nums = [-1,0,3,5,9,12], target = 2  
输出: -1  
解释: 2 不存在 nums 中因此返回 -1  
```

:::tip 提示
你可以假设 nums 中的所有元素是不重复的。  
n 将在 [1, 10000]之间。  
nums 的每个元素都将在 [-9999, 9999]之间。  

:::

## 思路
[二分查找法模板](https://liweiwei1419.gitee.io/leetcode-algo/2019/06/17/leetcode-solution-new/search-insert-position/#toc-heading-1)  
待搜索的目标元素放在最后判断，每一次循环排除掉不存在目标元素的区间，目的依然是确定下一轮搜索的区间,
判断条件为`while (left < right)`，这里使用严格小于 `<` 表示的临界条件是：当区间里的元素只有 `2` 个时，依然可以执行循环体。  
换句话说，退出循环的时候一定有 `left == right` 成立，所以可以在最后判断`nums[l]`或者`nums[r]`是不是目标
## 题解1
```javascript
var search = function(nums, target) {
    let left = 0,right = nums.length-1
    while(left<=right){
        let mid = Math.floor((left+right)/2)
        if(nums[mid]===target) return mid
        if(nums[mid]<target){
            left = mid+1
        }else{
            right = mid-1
        }
    }
    return -1
};
```

## 题解2
```javascript
var search = function(nums, target) {
    let left = 0,right = nums.length-1
    while(left<right){
        let mid = left + Math.floor((right-left)/2)
        if(nums[mid]<target){
            left = mid+1
        }else{
            right = mid
        }
    }
    if(nums[left]===target){
        return left
    }
    return -1
};
```