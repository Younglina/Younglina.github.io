---
title: 875.爱吃香蕉的珂珂
author: Younglina
date: '2022-06-07'
showAccessNumber: true
categories:
 - 算法
tags:
 - 二分
 - 中等
---

## 题目描述
[875.爱吃香蕉的珂珂](https://leetcode.cn/problems/koko-eating-bananas/)  
珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。  
珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。    
珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。  
返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。  

### 示例 1：
```
输入：piles = [3,6,7,11], h = 8  
输出：4  
```

### 示例 2：
```
输入：piles = [30,11,23,4,20], h = 5  
输出：30  
```

### 示例 2：
```
输入：piles = [30,11,23,4,20], h = 6  
输出：23   
```

:::tip 提示
1 <= nums.length <= 5000  
-1000 <= nums[i] <= 1000  
:::

## 思路
由题意可知，每堆香蕉都是独立的，即便k大于piles[i]，吃完这堆也不会吃后面的，所以每堆香蕉耗时为piles[i]/k，  
当piles[i]/k有余时，不管剩下多少，都需要再花费一个小时。所以需要要向上取整  
可以从1到最大的piles中选取一个数作为k，如果以k这个速度吃完所有香蕉的耗时大于h，那么k可以有减小的空间。如果小于h，说明速度不够，要加大k  
从一组单调数中找到一个符合条件的数，可以使用二分  

## 题解
```javascript
var minEatingSpeed = function(piles, h) {
    let l=1,r=Math.max(...piles)
    let useTime = (k) => {
        let t = 0
        for(let i of piles){
            t+=Math.ceil(i/k)
        }
        return t
    }
    while(l<r){
        let mid = Math.floor((l+r)/2)
        if(useTime(mid)>h){
            l = mid+1
        }else{
            r = mid
        }
    }
    return r
};
```