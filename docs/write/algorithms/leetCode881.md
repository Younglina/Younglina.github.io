---
title: 881.救生艇
author: Younglina
date: '2022-02-14'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述
[881.救生艇](https://leetcode-cn.com/problems/friends-of-appropriate-ages/)  
给定数组 `people` 。`people[i]`表示第 `i` 个人的体重 ，船的数量不限，每艘船可以承载的最大重量为 `limit`。

每艘船最多可同时载两人，但条件是这些人的重量之和最多为 `limit`。

返回 承载所有人所需的最小船数 。

### 示例 1：
```
输入：people = [1,2], limit = 3  
输出：1  
解释：1 艘船载 (1, 2)
```

### 示例 2：
```
输入：people = [3,2,2,1], limit = 3  
输出：3  
解释：3 艘船分别载 (1, 2), (2) 和 (3)  
```

### 示例 3：
```
输入：people = [3,5,3,4], limit = 5  
输出：4  
解释：4 艘船分别载 (3), (3), (4), (5)  
```

:::tip 提示
1 <= people.length <= 5 * 104  
1 <= people[i] <= limit <= 3 * 104  
:::

## 思路
1. 排序数组
2. 定义首尾双指针，`i=0,j=people.length-1`
3. 判断`people[i]+people[j]`
  - 如果`people[i]+people[j]<=limit`，则说明两人可坐一条船，两个指针向中间靠齐
  - 否则，因为`people[i]`对应的是此时最轻的人，所以不符合条件的话`people[j]`对应的要减重，即`j`向中间靠齐

## 题解
```javascript
var numRescueBoats = function(p, limit) {
    let len = p.length,l=0,r=len-1,res=0
    p.sort((a,b)=>a-b)
    while(l<=r){
        if(p[l]+p[r]<=limit){
            l++
        }
        r--
        ++res
    }
    return res
};
```
