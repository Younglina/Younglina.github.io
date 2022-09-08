---
title: 539.最小时间差
author: Younglina
date: '2022-06-14'
showAccessNumber: true
categories:
 - 算法
tags:
 - 字符串
 - 中等
---

## 题目描述
[539.最小时间差](https://leetcode.cn/problems/minimum-time-difference/)  
给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。  

### 示例 1：
```
输入：timePoints = ["23:59","00:00"]  
输出：1  
```

### 示例 2：
```
输入：timePoints = ["00:00","23:59","00:00"]  
输出：0  
```

:::tip 提示
2 <= timePoints.length <= 2 * 104  
timePoints[i] 格式为 "HH:MM"  
:::

## 思路
一天一共有`24*60=1440`分钟，所以如果`timePoints`的长度大于`1440`，则说明其中一定有相同的两个时间，此时最小时间差为0  
不大于的话，先将`timePoints`转换为分钟表示，`timePoints[i].substr(0,2)*60 + (+timePoints[i].substr(3,2))`，  
然后排序，最小时间差一定是两个相邻的时间或者首尾两个时间，首尾的时间差为`timePoints[0]+1440-timePoints.at(-1)`，  
设最小时间差为首位的时间差`min`，遍历数组，对比`min`和相邻两个时间差，即可得到结果  

## 题解
```javascript
var findMinDifference = function(timePoints) {
    let max = 1440
    if(timePoints.length>max) return 0
    for(let i =0;i<timePoints.length;i++){
        timePoints[i] = timePoints[i].substr(0,2)*60 + (+timePoints[i].substr(3,2))
    }
    timePoints.sort((a,b)=>a-b)
    let min = timePoints[0]+max-timePoints.at(-1)
    for(let i=1;i<timePoints.length;i++){
        min = Math.min(timePoints[i]-timePoints[i-1],min)
    }
    return min
};
```