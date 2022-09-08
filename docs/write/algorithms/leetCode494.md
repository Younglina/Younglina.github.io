---
title: 494.目标和
author: Younglina
date: '2022-04-26'
showAccessNumber: true
categories:
 - 算法
tags:
 - 动态规划
 - 中等
---

## 题目描述

**[494.目标和](https://leetcode-cn.com/problems/rotate-function/)**  
给你一个整数数组 `nums` 和一个整数 `target` 。  
向数组中的每个整数前添加 `'+'` 或 `'-'` ，然后串联起所有整数，可以构造一个 表达式 ：  
例如，`nums = [2, 1]` ，可以在 `2` 之前添加 `'+'` ，在 `1` 之前添加 `'-'` ，然后串联起来得到表达式 `"+2-1"` 。  
返回可以通过上述方法构造的、运算结果等于 `target` 的不同 表达式 的数目。  

### 示例 1：
```
输入：nums = [1,1,1,1,1], target = 3  
输出：5  
解释：一共有 5 种方法让最终目标和为 3 。  
-1 + 1 + 1 + 1 + 1 = 3  
+1 - 1 + 1 + 1 + 1 = 3  
+1 + 1 - 1 + 1 + 1 = 3  
+1 + 1 + 1 - 1 + 1 = 3  
+1 + 1 + 1 + 1 - 1 = 3  
```

### 示例 2：

```
输入：nums = [1], target = 1  
输出：1  
```

:::tip 提示
1 <= nums.length <= 20  
0 <= nums[i] <= 1000  
0 <= sum(nums[i]) <= 1000  
-1000 <= target <= 1000  
:::

### 动态规划思路
题意为，有`+`串联的整数和为`p`, 有`-`串联的整数和为`m`, 
如nums=[1,1,1,1,1], target=3,sum=5,中的 `-1 + 1 + 1 + 1 + 1`  
p为4个`+`的整数和,m为1个`-`的整数和，即 `p=4,m=1`,可知 
- p+m=sum
- p-m=target
p=(sum+target)/2, m=(sum-target)/2  
所以题意可转换为，从数组`nums`中，是否可以选出一些数字（只能选一次），使得选出的数字和为`p`或着`m`，可以看出这就是`01背包`  
`dp[i][j]`就是从前`i`个数字中选出一些数字，使其和为`j`的方案数目，状态转移方程为：  
- 不选第i个数字时，前i-1个数字和为j的方案数 dp[i][j] = dp[i-1][j]
- 选第i个数字时，前i-1个的方案数，加上前i-1个数字和为j-nums[i]的方案数，dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i]]
边界情况：  
当`i=0`时，表示从`0`个数字中选取和为`j`的方案数，当`j=0`时，则`dp[0][0]=1`,当`j>0`时，`dp[0][j]=0`  
所以外层循环从`i=1`开始，而第`i`个数字对应的是`nums[i-1]`  

### 题解
```javascript
var findTargetSumWays = function(nums, target) {
    let sum = nums.reduce((p,v)=>p+v)
    if(sum<target) return 0 // 数组总和比target小的时候，没有方案
    if((sum+target)%2!==0) return 0 // 数组总和+target需要被2整除，不然bag不是整数
    let bag = Math.floor((sum-target)/2)
    ,len=nums.length
    ,dp = Array.from(Array(len+1),()=>Array(bag+1).fill(0))
    dp[0][0] = 1
    for(let i=1;i<=len;i++){
        for(let j=0;j<=bag;j++){
            dp[i][j] = dp[i-1][j] // j<nums[i-1]时，无法再选取当前nums[i-1]
            if(j>=nums[i-1]){
                dp[i][j] += dp[i-1][j-nums[i-1]]
            }
        }
    }
    return dp[len][bag]
};
```

### 优化
每一行dp的值，都只与上方和左上方有关  
dp[i][j] = dp[i-1][j] 上方状态值  
dp[i][j] = dp[i-1][j]+dp[i-1][j-nums[i-1]] 上方+左上方状态值  
可优化为一维数组
dp[j] = dp[j-1] 上方
dp[j] = dp[j-1]+dp[j-nums[i-1]] 上方+左上方状态值  
此时内部循环需要倒叙遍历，从小到大计算的话，那么 `dp[j−nums[i-1]]` 会先于 `dp[j]` 被更新，当计算 `dp[j]` 的时候，`dp[j−nums[i-1]]`已经是被更新过的状态，而不再是上一行的状态值了。

```javascript
var findTargetSumWays = function(nums, target) {
    let sum = nums.reduce((p,v)=>p+v)
    if(sum<target || (sum+target)%2!==0) return 0
    let bag = Math.floor((sum-target)/2)
    ,len = nums.length
    ,dp = Array(bag+1).fill(0)
    for(let i=0;i<=len;i++){
        for(let j=bag;j>=nums[i];j--){ //小于nums[i]的在上一轮已经计算
            dp[j]+=dp[j-nums[i]]
        }
    }
    return dp[bag]
}

```