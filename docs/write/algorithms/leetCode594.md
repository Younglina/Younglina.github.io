---
title: 594.最长和谐子序列
author: Younglina
date: '2022-01-17'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 滑动窗口
 - 简单
---

## 题目描述
[594.最长和谐子序列](https://leetcode-cn.com/problems/longest-harmonious-subsequence/)  
和谐数组是指一个数组里元素的最大值和最小值之间的差别`正好是 1` 。

现在，给你一个整数数组`nums`，请你在所有可能的子序列中找到最长的和谐子序列的长度。

数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且不改变其余元素的顺序而得到。
### 示例 1：
```
输入：nums = [1,3,2,2,5,2,3,7]  
输出：5  
解释：最长的和谐子序列是 [3,2,2,2,3]  
```

### 示例 2：
```
输入：nums = [1,2,3,4]  
输出：2  
```

### 示例 3：
```
输入：nums = [1,1,1,1]  
输出：0  
```

:::tip 提示
1 <= nums.length <= 104  
-105 <= nums[i] <= 105  
:::

## 思路 1, 哈希表
1. 哈希表`map`存储每个数出现的次数
2. 遍历哈希表,如果存在`map[key+1]`，取`map[key]+map[key+1]`的和，
意思是`map: {1:1, 2:3, 3:2, 5:1, 7:1}`,
当前遍历到`map[1]`，如果存在`map[1+1]`，则取`map[1]+map[2]`

## 题解
```javascript
var findLHS = function(nums) {
    const map = {}
    nums.map(item=>map[item] = (map[item] || 0)+1)
    let res = 0
    Object.keys(map).map(item=>{
        item = +item
        if(map[item+1]){
            res = Math.max(res, map[item]+ map[item+1])
        }
    })
    return res
};
```
## 思路 2, 排序+滑动窗口

1. 数组排序，定义双指针`i=0`、`j=1`
2. 遍历数组，`j`一直右移
  * `nums[j]-nums[i] > 1`时，不符合条件，`i`需要右移
  * `nums[j]-nums[i] == 1`时，取`j-i+1`

## 题解
```javascript
var findLHS = function(nums) {
    nums.sort((a,b)=>a-b)
    let res = 0
    for(let i=0,j=1;j<nums.length;j++){
        while(j>i && nums[j]-nums[i] > 1)i++
        if(nums[j]-nums[i]===1) res = Math.max(res, j-i+1)
    }
    return res
};
```

