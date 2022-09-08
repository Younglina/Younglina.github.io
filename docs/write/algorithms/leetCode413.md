---
title: 413.等差数列划分
author: Younglina
date: '2022-01-16'
showAccessNumber: true
categories:
 - 算法
tags:
 - 模拟
 - 中等
---

## 题目描述
[413.等差数列划分](https://leetcode-cn.com/problems/arithmetic-slices/)  
如果一个数列`至少有三个元素`，并且任意两个相邻元素之差相同，则称该数列为等差数列。  
例如，`[1,3,5,7,9]`、`[7,7,7,7]` 和 `[3,-1,-5,-9]` 都是等差数列。  
给你一个整数数组`nums`，返回数组`nums`中所有为等差数组的`子数组`个数。  
子数组 是数组中的一个连续序列。

### 示例 1：
```
输入：nums = [1,2,3,4]  
输出：3  
解释：nums 中有三个子等差数组：[1, 2, 3]、[2, 3, 4] 和 [1,2,3,4] 自身。  
```

### 示例 2：
```
输入：nums = [1]  
输出：0  
```

:::tip 提示
1 <= nums.length <= 5000  
-1000 <= nums[i] <= 1000  
:::

## 思路1
1. 根据描述`至少有三个元素`,如果数组长度小于3直接返回，也是为了循环直接从下标2开始
2. 定义两个变量`r`存储总排列个数,`c`存储每组的排列个数
3. 每有符合等差条件情况`c`自增，`r`累加`c`

## 题解1
```javascript
var numberOfArithmeticSlices = function(n) {
    if(n.length<3) return 0;
    let [r,c] = [0,0]
    for(let i = 2; i < n.length; i++){
        if(n[i-1]-n[i-2]===n[i]-n[i-1]){
            r += ++c
        }else{
            c = 0
        }
    }
    return r
};
```
## 思路2
1. 根据描述`至少有三个元素`,如果数组长度小于3直接返回，也是为了循环直接从下标2开始
2. 定义两个变量`res`存储总排列个数,`step`存储每组的排列个数,`diff`为等差
3. 每有符合等差条件情况`step`自增，`res`累加`step`,否则`diff`等于新等差，`step`清0

## 题解2
```javascript
var numberOfArithmeticSlices = function(nums) {
    let len = nums.length,step=0,res=0
    if(len < 3) return 0
    let diff = nums[1]-nums[0]
    for(let i =2;i<len;i++){
        if(nums[i]-nums[i-1] === diff){
            step++
            res+=step
        }else{
            step = 0
            diff = nums[i]-nums[i-1]
        }
    }
    return res
};
```