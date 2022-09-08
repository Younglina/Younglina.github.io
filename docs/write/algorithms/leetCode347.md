---
title: 347.前 K 个高频元素
author: Younglina
date: '2022-07-08'
showAccessNumber: true
categories:
 - 算法
tags:
 - 栈
 - 中等
---

## 题目描述
[347.前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)  
给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。  

### 示例 1：
```
输入: nums = [1,1,1,2,2,3], k = 2  
输出: [1,2]  
```

### 示例 2：
```
输入: nums = [1], k = 1  
输出: [1]  
```

:::tip 提示
1 <= nums.length <= 105  
k 的取值范围是 [1, 数组中不相同的元素的个数]  
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的  
:::

:::tip 要求
你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
:::

## 思路
哈希表+桶排序  
先用哈希表记录每个数字出现的次数  
定义一个桶数组，存储的是出现其对应下标次数的数字集合  
最后倒叙遍历桶取值   
如 nums = [1,1,1,2,2,3,3,4],k=2  
哈希表 = {1:3,2:2,3:2,4,1}  
桶数组 = [空,[4],[2,3],[1]]  

## 题解
```javascript
var topKFrequent = function(nums, k) {
    let map = {},arr=[],res=[]
    for(let i of nums){
        map[i] = (map[i]||0)+1
    }
    for(let k in map){
        if(arr[map[k]]){
            arr[map[k]].push(k)
        }else{
            arr[map[k]] = [k]
        }
    }
    for(let i=arr.length-1;i>=0;i--){
        if(arr[i]) res.push(...arr[i])
    }
    return res
}
```
