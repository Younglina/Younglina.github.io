---
title: 287.寻找重复数
author: Younglina
date: '2022-04-02'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 中等
---

## 题目描述
[287.寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)  
给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。  
假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。  
你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。  

### 示例 1：
```
输入：nums = [1,3,4,2,2]  
输出：2  
```

### 示例 2：
```
输入：nums = [3,1,3,4,2]  
输出：3  
```

## 思路1 暴力
循环数组`i`，定义头尾指针，头从`i+1`开始，尾从数组长度-1开始，如果其中一个等于`nums[i]`返回，不然就缩小头尾指针向中间靠齐

## 题解1
```javascript
 var findDuplicate = function(nums) {
    let len = nums.length-1
    for(let i=0;i<=len;i++){
        for(let l=i+1,j=len;l<=j;l++,j--){
            if(nums[l]===nums[i]){
                return nums[l]
            }
            if(nums[j]===nums[i]){
                return nums[j]
            }
        }
    }
};
```

## 思路2 二分
因为题目说明了 `n + 1` 个整数的数组 `nums` ，其数字都在 `[1, n]` 范围内（包括 1 和 n）  
要找的是一个`整数`，并且这个整数有明确的范围，所以可以使用`二分`。   
这个问题是用`二分`是在数组 [1, 2,.., n] 中查找一个整数，而不是在给定的数组中查找一个整数。  
通过循环原数组判断小于等于`mid`的数共有`c`个，如果`c`大于`mid`，则重复数在左边即`[l,mid]`，否则在`[mid+1, r]`里

## 题解2
```javascript
 var findDuplicate = function(nums) {
    let l = 1,len=nums.length,r=len-1
    // 1,len-1 是因为数据是从1到n的
    while(l<r){
      const mid = Math.floor((l+r)/2)
      let c = 0
      for(let i=0;i<len;i++){
        if(nums[i]<=mid){
          c++
        }
      }
      if(c>mid){
        r = mid
      }else{
        l = mid+1
      }
    }
    return l
};
```

## 思路3 快慢指针
因为题目说了`n+1`个整数,数组元素范围在`[1, n]`内，将题目想成一个有闭环的链表，找出闭环入口的节点数据。  
  0  1 2 3 4  
如[1,3,4,2,2]  
将下标对应节点，头节点0的值是1，next节点是下标1对应的3，3的next节点是下标3对应的2  
=>     ---  
      |  |  
      |  |  
1->3->2->4  

## 题解3
```javascript
 var findDuplicate = function(nums) {
    let l =0,r=nums.length-1
    while(true){
      l = nums[l]
      r = nums[nums[r]]
      if(l===r){
        l = 0
        while(nums[l]!==nums[r]){
          l = nums[l]
          r = nums[r]
        }
        return nums[l]
      }
    }
};
```

