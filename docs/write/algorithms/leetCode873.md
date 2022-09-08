---
title: 873.最长的斐波那契子序列的长度
author: Younglina
date: '2022-07-09'
showAccessNumber: true
categories:
 - 算法
tags:
 - 动态规划
 - 中等
---

## 题目描述
[873.最长的斐波那契子序列的长度]https://leetcode.cn/problems/length-of-longest-fibonacci-subsequence/)  
如果序列 X_1, X_2, ..., X_n 满足下列条件，就说它是 斐波那契式 的：  
n >= 3  
对于所有 i + 2 <= n，都有 X_i + X_{i+1} = X_{i+2}  
给定一个严格递增的正整数数组形成序列 arr ，找到 arr 中最长的斐波那契式的子序列的长度。如果一个不存在，返回  0 。  
（回想一下，子序列是从原序列 arr 中派生出来的，它从 arr 中删掉任意数量的元素（也可以不删），而不改变其余元素的顺序。例如， [3, 5, 8] 是 [3, 4, 5, 6, 7, 8] 的一个子序列）  

### 示例 1：
```
输入: arr = [1,2,3,4,5,6,7,8]  
输出: 5  
解释: 最长的斐波那契式子序列为 [1,2,3,5,8] 。  
```

### 示例 2：
```
输入: arr = [1,3,7,11,12,14,18]  
输出: 3  
解释: 最长的斐波那契式子序列有 [1,11,12]、[3,11,14] 以及 [7,11,18] 。  
```

:::tip 提示
0 <= nums.length <= 100  
0 <= nums[i] <= 50  
0 <= val <= 100  
:::

## 思路
遍历数组，按`{val: idx}`的新式存于哈希表中，固定斐波那契数列的两个起始值`arr[i],arr[j]`，判断`arr[i]+arr[j]`是否存在与哈希表。    
初始化一个二维数组，值填充为2  
我们遍历这两个起点i, j，如果他们的和在数列中，记为坐标k，即arr[i] + arr[j] = arr[k]arr[i]+arr[j]=arr[k]。 
则设置dp[j][k] = dp[i][j] + 1dp[j][k]=dp[i][j]+1。  
找到最大的两个点即可  

## 题解
```javascript
var lenLongestFibSubseq = function(arr) {
    let map = {},
     n=arr.length,
     numArr=Array.from({length:n},()=>Array(n).fill(2)),res=0
 for(let [idx,v] of arr.entries()){
     map[v] = idx
 }
 for(let i=0;i<n-1;i++){
     for(let j=i+1;j<n;j++){
         let k = map[[arr[i]+arr[j]]]
         if(map[k]){
             numArr[j][map[k]] = numArr[i][j]+1
             res=Math.max(numArr[j][map[k]],res)
         }
     }
 }
 return res
};
```