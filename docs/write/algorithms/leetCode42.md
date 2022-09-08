---
title: 42.接雨水
author: Younglina
date: '2022-06-30'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 栈
 - 困难
---

## 题目描述
[42.接雨水](https://leetcode.cn/problems/trapping-rain-water/)  
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/20220630163132.png)
```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]  
输出：6  
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。  
```

### 示例 2：
```
输入：height = [4,2,0,3,2,5]  
输出：9  
```

:::tip 提示
n == height.length  
1 <= n <= 2 * 104  
0 <= height[i] <= 105  
:::

## 思路1
能接到雨水的位置，一定是个凹型，所以只需要关注，当前的高度、它左边的最高、右边的最高，然后用左右两边较小的高度减去当前的高度，累加起来即可  

## 题解
```javascript
var trap = function(height) {
    let res = 0,len=height.length-1
    for(let i=1;i<len;i++){
        let lmax = rmax = height[i]
        for(let l=i-1;l>=0;l--){
            lmax = Math.max(lmax,height[l])
        }
        for(let r=i+1;r<=len;r++){
            rmax = Math.max(rmax,height[r])
        }
        res+=Math.min(lmax,rmax)-height[i]
    }
    return res
}
```

## 思路2
发现在求左右两边最高的高度时，利用了两次循环，这一步可以通过定义双指针来进行优化  
定义`lmax,rmax`分别为左右两端最高的高度，`l,r`首尾指针向中间移动，当`lmax>rmax`时，累加`lmax-左侧当前的高度`，l右移；否则累加`rmax-右侧当前高度`，r左移；即与题解一中`Math.min(lamx,rmax)-height[i]`同理

## 题解
```javascript
var trap = function(height) {
    let res = 0,len=height.length-1
    let lmax=height[0],rmax=height.at(-1)
    while(l<r){
        lmax = Math.max(lmax, height[l])
        rmax = Math.max(rmax, height[r])
        if(lmax>rmax){
            res+=rmax-height[l]
            l++
        }else{
            res+=lmax-height[r]
            r--
        }
    }
    return res
}
```

## 思路3
维护一个高度单调递减的栈，栈中存储的是高度的索引，当遇到比栈顶高的高度时，弹出栈顶记录高度为`tHigh`，因为栈时单调递减，所以此时的栈顶高度是`tHigh`左边的比它高的高度，且当前高度也是大于`tHigh`的，所以`tHigh`即为一个可以接雨水的凹处，它所能接住雨水的体积为`当前索引-当前栈顶-1`(左右两端的距离)乘以`左右两端较小的高度-tHigh`  
[思路来源](https://leetcode.cn/problems/trapping-rain-water/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-8/)，有比较详细的图解

## 题解
```javascript
var trap = function(height) {
    let res=0,stack=[],cur=0,len=height.length
    while(cur<len){
        while(stack.length && height[cur]>height[stack.at(-1)]){
            let tHigh=height[stack.pop()]
            if(!stack.length) break
            let min = Math.min(height[stack.at(-1)], height[cur])
            res+=(cur-stack.at(-1)-1)*(min-tHigh)
        }
        stack.push(height[cur])
        cur++
    }
    return res
}
```
