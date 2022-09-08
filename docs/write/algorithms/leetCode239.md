---
title: 239.滑动窗口最大值
author: Younglina
date: '2022-07-13'
showAccessNumber: true
categories:
 - 算法
tags:
 - 队列
 - 困难
---

## 题目描述
[239.滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)  
给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。  
返回 滑动窗口中的最大值 。  

### 示例 1：
```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3  
输出：[3,3,5,5,6,7]  
解释：  
滑动窗口的位置                最大值  
---------------               -----  
[1  3  -1] -3  5  3  6  7       3  
 1 [3  -1  -3] 5  3  6  7       3  
 1  3 [-1  -3  5] 3  6  7       5  
 1  3  -1 [-3  5  3] 6  7       5  
 1  3  -1  -3 [5  3  6] 7       6  
 1  3  -1  -3  5 [3  6  7]      7  
```

### 示例 2：
```
输入：nums = [1], k = 1  
输出：[1]  
```

:::tip 提示
1 <= nums.length <= 105  
-104 <= nums[i] <= 104  
1 <= k <= nums.length  
:::

## 思路
维护一个单调递减的队列，队列存储的是数组下标，循环数组，如果队列不为空,且当前值大于队列队尾值,则弹出队尾，保证队列为单调递减   
因为存储的是下标，所以当遍历到超出下标时，需将队列中对应数据弹出  

## 题解
```javascript
var maxSlidingWindow = function(nums, k) {
    let queue = [],res=[],len=nums.length
    for(let i=0;i<len;i++){
        while(queue.length && nums[i]>=nums[queue.at(-1)]){
            queue.pop()
        }
        queue.push(i)
        if(queue[0]<i-k+1){
            queue.shift()
        }
        if(i>=k-1){
            res.push(nums[queue[0]])
        }
    }
    return res
};
```