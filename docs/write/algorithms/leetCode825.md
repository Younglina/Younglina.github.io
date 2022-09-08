---
title: 825.适龄的朋友
author: Younglina
date: '2022-02-11'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述
[825.适龄的朋友](https://leetcode-cn.com/problems/friends-of-appropriate-ages/)  
在社交媒体网站上有 `n`个用户。给你一个整数数组 `ages` ，其中 `ages[i]` 是第 `i` 个用户的年龄。

如果下述任意一个条件为真，那么用户 `x` 将不会向用户 `y（x != y）`发送好友请求：

- ages[y] <= 0.5 * ages[x] + 7
- ages[y] > ages[x]
- ages[y] > 100 && ages[x] < 100
否则，x 将会向 y 发送一条好友请求。

注意，如果 `x` 向 `y` 发送一条好友请求，`y` 不必也向 `x` 发送一条好友请求。另外，用户不会向自己发送好友请求。

返回在该社交媒体网站上产生的好友请求总数。

### 示例 1：
```
输入：ages = [16,16]  
输出：2  
解释：2 人互发好友请求。  
```

### 示例 2：
```
输入：ages = [16,17,18]  
输出：2  
解释：产生的好友请求为 17 -> 16 ，18 -> 17 。  
```

### 示例 3：
```
输入：ages = [20,30,100,110,120]  
输出：3  
解释：产生的好友请求为 110 -> 100 ，120 -> 110 ，120 -> 100 。  
```

:::tip 提示
- n == ages.length  
- 1 <= n <= 2 * 104  
- 1 <= ages[i] <= 120  
:::

## 思路
根据所给条件可以得知，当数据`age`处于`( 0.5*agx[x]+7, agx[y] ]`，那么`y到x`之间的数据都符合条件，即`y-x`个，
所以给`ages`排序以后，求的区间即可

## 题解
```javascript
var numFriendRequests = function(ages) {
    ages.sort((a,b)=>a-b)
    let left=0,right=0,n=ages.length,res=0
    for(const age of ages){
        //当age小于15时，不存在区间( 0.5*agx[x]+7, agx[x] ]
        if(age<15){
            continue
        }
        while(ages[left]<= 0.5*age+7){
            left++
        }
        while(right+1<n && ages[right+1]<=age){
            right++
        }
        res+=right-left
    }
    return res
};
```
