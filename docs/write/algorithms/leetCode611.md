---
title: 611.有效三角形的个数
author: Younglina
date: '2022-01-18'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述
[611.有效三角形的个数](https://leetcode-cn.com/problems/valid-triangle-number/)  
给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
### 示例 1：
```
输入: [2,2,3,4]  
输出: 3  
解释:  
有效的组合是:   
2,3,4 (使用第一个 2)  
2,3,4 (使用第二个 2)  
2,2,3  
```

:::tip 提示
数组长度不超过1000。  
数组里整数的范围为 [0, 1000]。  
:::

## 思路
有效三角形，两边之和大于第三边。
1. 升序排序数组，固定最长边，即数组最后一项记为`i`
2. 循环数组，定义双指针`s`,`f`分别为数组两端，记为`s=0`,`f=i-1`
3. 循环当`f>s`时，如果`nums[s]+nums[f]>nums[i]`，则为有效三角形
   * 且`s`到`f`之间的都是符合条件的，如`[2,2,3,3,4,4,4]`，
   * 因为`nums[0]+nums[5]>nums[6]`，所以
   * 下标`[0,5]`之间都是符合的，即有`5-0`项
4. `f自减`继续循环

## 题解
```javascript
var triangleNumber = function(nums) {
    nums.sort((a,b)=>a-b)
    let [res,len] = [0,nums.length]
    for(let i=len-1;i>=2;i--){
        let [s,f] = [0,i-1]
        while(f>s){
            if(nums[f]+nums[s] > nums[i]){
                res+= f-s
                f--
            }else{
                s++
            }
        }
    }
    return res
};
```
