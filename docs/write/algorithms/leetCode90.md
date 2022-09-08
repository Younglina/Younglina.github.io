---
title: 90.子集 II
author: Younglina
date: '2022-03-09'
showAccessNumber: true
categories:
 - 算法
tags:
 - 回溯
 - 中等
---

## 题目描述
[90.子集 II](https://leetcode-cn.com/problems/subsets-ii/)  
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。  

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。  

### 示例 1：
```
输入：nums = [1,2,2]  
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]  
```

### 示例 2：
```
输入：nums = [0]  
输出：[[],[0]]  
```

:::tip 提示
1 <= nums.length <= 10  
-10 <= nums[i] <= 10  
:::

## 思路
回溯的基本解法，新建`res`存储符合条件的结果，`path`存储递归过程中的数据  
定义递归函数参数`idx`,遍历开始的下标，看题目是否运行当前数据重复，允许则递归时传入当前下标`i`，不允许则传入`i+1`
往`path`push数据以后，递归，`path`pop进行回溯
## 题解
```javascript
var subsetsWithDup = function(nums) {
    let res = [],path=[],len = nums.length
    nums = nums.sort((a,b)=>a-b)
    const backLoop = (startIdx) => {
        res.push(path.slice())
        if(startIdx>len-1) return 
        for(let i=startIdx;i<len;i++){
            if(i>startIdx&&nums[i]===nums[i-1]){
                continue;
            }
            path.push(nums[i])
            backLoop(i+1, path)
            path.pop()
        }
    }
    backLoop(0, [])
    return res
};
```