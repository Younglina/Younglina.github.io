---
title: 396.旋转函数
author: Younglina
date: '2022-06-09'
showAccessNumber: true
categories:
 - 算法
tags:
 - 动态规划
 - 中等
---

## 题目描述

**[396.旋转函数](https://leetcode-cn.com/problems/rotate-function/)**  
给定一个长度为 `n` 的整数数组 `nums` 。  

假设 arrk 是数组 nums 顺时针旋转 k 个位置后的数组，我们定义 nums 的 旋转函数  F 为：  
F(k) = 0 * arrk[0] + 1 * arrk[1] + ... + (n - 1) * arrk[n - 1]  
返回 *F(0), F(1), ..., F(n-1)*中的最大值 。  

生成的测试用例让答案符合 **32 位** 整数。  

### 示例 1：
```
输入: nums = [4,3,2,6]  
输出: 26  
解释:  
F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25  
F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16  
F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23  
F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26  
所以 F(0), F(1), F(2), F(3) 中的最大值是 F(3) = 26 。  
```

### 示例 2：

```
输入: nums = [100]  
输出: 0  
```

:::tip 提示
n == nums.length  
1 <= n <= 105  
-100 <= nums[i] <= 100  
:::

## 动态规划思路
由题意得：设`dp[i]`为旋转`i`个位置后的`i*nums[i]`数组和,`sum`为原数组总和,`len`为数组长度  
`dp[0]` = `0*nums[0]+1*nums[1]+2*nums[2]+3*nums[3]+···+n*nums[n]`
`dp[1]` = `0*nums[1]+1*nums[2]+2*nums[3]+···+(n-1)*nums[n]+n*nums[0]`
`dp[0]-dp[1]` = `nums[1]+nums[2]+nums[3]+···+nums[n]-n*nums[0]`

可以看出`num[1]+nums[2]+···+nums[n]`就是`sum-nums[0]`  
`dp[0]-dp[1] = sum-nums[0]-n*nums[0]`,n从0开始，n+1=len  
所以`dp[1]`=`dp[0]-sum+(n+1)*nums[0]`=`dp[0]-sum+len*nums[0]`

推出状态转移方程为：`dp[i]=dp[i-1]-sum+len*num[i-1]`

## 题解
```javascript
var maxRotateFunction = function(nums) {
    let len = nums.length,dp=[0],sum=0
    for(let i=0;i<len;i++){
        sum+=nums[i]
        dp[0]+=(i*nums[i])
    }
    let res = dp[0]
    for(let i=1;i<len;i++){
        dp[i] = dp[i-1]-sum+len*nums[i-1]
        res=Math.max(dp[i],res)
    }
    return res
};

```