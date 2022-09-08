---
title: 377.组合总和Ⅳ
author: Younglina
date: '2022-04-28'
showAccessNumber: true
categories:
 - 算法
tags:
 - 动态规划
 - 中等
---

## 题目描述

**[377.组合总和Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/)**  
给你一个由 `不同` 整数组成的数组 `nums` ，和一个目标整数 `target` 。请你从 `nums` 中找出并返回总和为 `target` 的元素组合的个数。
题目数据保证答案符合 `32` 位整数范围。

### 示例 1：
```
输入：nums = [1,2,3], target = 4  
输出：7  
解释：  
所有可能的组合为：  
(1, 1, 1, 1)  
(1, 1, 2)  
(1, 2, 1)  
(1, 3)  
(2, 1, 1)  
(2, 2)  
(3, 1)  
请注意，顺序不同的序列被视作不同的组合。  
```

### 示例 2：

```
输入：nums = [9], target = 3  
输出：0   
```

:::tip 提示
1 <= nums.length <= 200  
1 <= nums[i] <= 1000  
nums 中的所有元素 互不相同  
1 <= target <= 1000  
:::

## 动态规划思路
根据实例1可以看出，题目要求的是排列的组合个数，即(1,3)和(3,1)是两种解，而每个数字可以用多次，所以是一种完全背包问题  
要求的是排列，所以应该在内层循环nums数组，把数字每个排列都遍历一遍  
1. 确定`dp[i]`的意义  
    从nums中抽取若干个数字，凑成总和为`i`的排列数  
2. 确定`dp[i]`的计算方法  
    对于每个数字，可以选择或不选择，所以可以分为两种情况：  
    1. 不选择当前数字就能凑成i的数量：dp[i] = dp[i]  
    2. 选择当前数，就是找到凑成i-nums[i]的数量再加1，因为选了nums[i]：dp[i] = dp[i - nums[j]] + 1  
3. 确定`dp[i]`的初始值  
    当i为0时，可以理解为，选择若干数凑成0，那么就只有一种方法，即不选，所以dp[0] = 1    
    其他情况，dp[i] = 0，存在凑不成i的情况  


## 题解
```javascript
var combinationSum4 = function(nums, target) {
    nums.sort((a,b)=>a-b) // 为了下面内层循环中，用i>=nums[j]减少循环次数
    let dp = Array(target+1).fill(0)
    dp[0] = 1
    for(let i = 1; i <= target; i++){
        //&& i>=nums[j]，i是从nums选取数要凑的总和，如果i(1)比当前(2)的数小，那这个数(2)就凑不了(1)，所以不用考虑
        //因为nums是排序过的，所以可以用i>=nums[j]来减少循环次数
        for(let j = 0; j < nums.length && i>=nums[j]; j++){ 
            dp[i] += dp[i - nums[j]]
        }
    }
    return dp[target]
};
```