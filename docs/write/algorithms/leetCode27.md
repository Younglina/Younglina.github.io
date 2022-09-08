---
title: 27.移除元素
author: Younglina
date: '2022-01-06'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 简单
---

## 题目描述
[27.移除元素](https://leetcode-cn.com/problems/remove-element/)  
给你一个数组`nums`和一个值`val`，你需要`「原地」`移除所有数值等于`val`的元素，并返回移除后数组的新长度。  
不要使用额外的数组空间，你必须仅使用`O(1)`额外空间并「原地」修改输入数组。  
元素的顺序可以改变。  
你不需要考虑数组中超出新长度后面的元素。

### 示例 1：
```
输入：nums = [3,2,2,3], val = 3  
输出：2, nums = [2,2]  
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，
而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```

### 示例 2：
```
输入：nums = [0,1,2,2,3,0,4,2], val = 2  
输出：5, nums = [0,1,4,0,3]  
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```

:::tip 提示
0 <= nums.length <= 100  
0 <= nums[i] <= 50  
0 <= val <= 100  
:::

## 思路
快慢指针，快指针循环数组，慢指针从0开始，快指针与慢指针对比，如果数据不相等，交换当前快、慢指针对应数据，且慢指针向后移动一位
## 题解
```javascript
var removeElement = function(n, v) {
  let i = 0;
  for(let j = 0;j<n.length;j++){
    if(n[j]!==v){
      n[i++] = n[j]
    }
  }
  return i
};
```