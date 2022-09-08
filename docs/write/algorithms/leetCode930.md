---
title: 930.和相同的二元子数组
author: Younglina
date: '2022-02-15'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 前缀和
 - 中等
---

## 题目描述
[930.和相同的二元子数组](https://leetcode-cn.com/problems/binary-subarrays-with-sum/)  
给你一个二元数组 `nums` ，和一个整数 `goal` ，请你统计并返回有多少个和为 `goal` 的 `非空` 子数组。

`子数组` 是数组的一段连续部分。


### 示例 1：
```
输入：nums = [1,0,1,0,1], goal = 2  
输出：4  
解释：  
有 4 个满足题目要求的子数组：[1,0,1]、[1,0,1,0]、[0,1,0,1]、[1,0,1]
```

### 示例 2：
```
输入：people = [3,2,2,1], limit = 3  
输出：3  
解释：3 艘船分别载 (1, 2), (2) 和 (3)  
```

### 示例 3：
```
输入：nums = [0,0,0,0,0], goal = 0  
输出：15
```

:::tip 提示
1 <= nums.length <= 3 * 104  
nums[i] 不是 0 就是 1  
0 <= goal <= nums.length
:::

## 思路1
### 前缀和 + 哈希表
遍历数组记录当前值为`i`，定义一个哈希表`map`记录数组的前缀和、`sum`记录当前总和`nums[0]+···+nums[i]`，
累加`map`中存在`sum-goal`的数量即可  
```
[1,0,1,0,1]
i=1, map={0:1},         sum = 0,    map[0-2]=0, res=0  
i=0, map={0:1,1:1},     sum = 1,    map[1-2]=0, res=0  
i=1, map={0:1,1:2},     sum = 2,    map[2-2]=1, res=1  
i=0, map={0:1,1:2,2:1}, sum = 2,    map[2-2]=1, res=2  
i=1, map={0:1,1:2,2:2}, sum = 3,    map[3-2]=2, res=4  
```

## 题解1
```javascript
var numSubarraysWithSum = function(nums, goal) {
    let map={},sum=0,res=0
    for(const i of nums){
        map[sum] = (map[sum] || 0) + 1
        sum += i
        res += (map[sum-goal] || 0)
    }
    return res
}
```

## 思路2
### 滑动窗口
定义两个左指针`l1,l2`，一个右指针`r`遍历数组，`(l1,r]`的和记为`s1` ，`(l2,r]`的和记为`s2`,
`l1`为`s1>goal`的临界点，`l2`为`s2>=goal`的零界点，所以`l2到l1`之间的数都是满足条件的，即为`l2-l1`    

## 题解2
```javascript
var numSubarraysWithSum = function(nums, goal) {
    let len=nums.length,res=0
    for(let l1=0,l2=0,s1=0,s2=0,r=0;r<len;r++){
        s1 += nums[r]
        s2 += nums[r]
        while(l1<=r && s1>goal) s1 -= nums[l1++]
        while(l2<=r && s2>=goal) s2 -= nums[l2++]
        res += l2-l1
    }
    return res
}
```