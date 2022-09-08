---
title: 15.三数之和
author: Younglina
date: '2022-01-04'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述

**[15. 三数之和](https://leetcode-cn.com/problems/3sum/)**  
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？  
请你找出所有和为 0 且不重复的三元组。  
注意：答案中不可以包含重复的三元组。  

### 示例 1：
```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

### 示例 2：
```
输入：nums = []
输出：[]
```

### 示例 3：
```
输入：nums = [0]
输出：[]
```

:::tip 提示
0 <= nums.length <= 3000  
-$10^5$ <= nums[i] <= $10^5$  
:::

## 思路
参考[宫水三叶](https://github.com/SharingSource/LogicStack-LeetCode/edit/main/LeetCode/11-20/15.%20%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C%EF%BC%88%E4%B8%AD%E7%AD%89%EF%BC%89.md)  
对数组进行排序，使用三个指针 `i`、`j` 和 `k` 分别代表要找的三个数。

1. 通过枚举 `i` 确定第一个数，另外两个指针 `j`，`k` 分别从左边 `i + 1` 和右边 `n - 1` 往中间移动，找到满足 `nums[i] + nums[j] + nums[k] == 0` 的所有组合。

2. `j` 和 `k` 指针的移动逻辑，分情况讨论 `sum = nums[i] + nums[j] + nums[k]` ：
    * `sum` > 0：`k` 左移，使 `sum` 变小
    * `sum` < 0：`j` 右移，使 `sum` 变大
    * `sum` = 0：找到符合要求的答案，存起来

由于题目要求答案不能包含重复的三元组，所以在确定第一个数和第二个数的时候，要跳过数值一样的下标（在三数之和确定的情况下，确保第一个数和第二个数不会重复，即可保证三元组不重复）。

## 题解
```javascript
var threeSum = function(nums) {
    nums.sort((a,b)=>a-b)
    let len = nums.length,res=[]
    for(let i=0;i<len;i++){
        if(nums[i]>0) break //因为排序以后，当nums[i]>0, nums[j]和nums[k]一定大于0，所以和也就一定大于0，后续都可以不用判断了
        if(nums[i]===nums[i-1]) continue;
        let j = i+1,k=len-1
        while(j<k){
            while(j>i+1 && nums[j]===nums[j-1] && j < len) j++
            if(j>=k) break;
            let sum = nums[i] + nums[j] + nums[k]
            if(sum===0){
                res.push([nums[i] , nums[j] , nums[k]])
                j++
            }else if(sum<0){
                j++
            }else{
                k--
            }
        }
    }
    return res
};
```