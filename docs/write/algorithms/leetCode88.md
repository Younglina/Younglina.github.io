---
title: 88.合并两个有序数组
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
[88.合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)  
给你两个按`非递减顺序`排列的整数数组`nums1`和`nums2`，另有两个整数`m`和`n`，分别表示`nums1`和`nums2`中的元素数目。  
请你 合并`nums2`到`nums1`中，使合并后的数组同样按`非递减顺序`排列。  
注意：最终，合并后数组不应由函数返回，而是存储在数组`nums1`中。为了应对这种情况`nums1`的初始长度为`m + n`，其中前`m`个元素表示应合并的元素，后`n`个元素为`0` ，应忽略`nums2`的长度为`n `。


### 示例 1：
```
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
```

### 示例 2：
```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
```

### 示例 3：
```
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。
nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

:::tip 提示
nums1.length == m + n  
nums2.length == n  
0 <= m, n <= 200  
1 <= m + n <= 200  
-109 <= nums1[i], nums2[j] <= 109  
:::

进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？

## 思路一
创建额外一个数组，定义`i``j`两个指针，循环`m+n`次，对比`nums1[i]`和`nums2[j]`，把小的那个push到`res`,
且对应指针自增，当指针大于对应数组长度时，直接把剩下的另外一个数组剩余的依次push到`res`，最后循环res，
一次修改`nums1`的值

## 题解
```javascript
 var merge = function(nums1, m, nums2, n) {
    let res = [],j=0,k=0
    for(let i=0;i<m+n;i++){
        if(j<m && k<n){
            res[i] = nums1[j]<nums2[k]?nums1[j++]:nums2[k++]
        }else if(j<m){
            res[i] = nums1[j++]
        }else if(k<n){
            res[i] = nums2[k++]
        }
    }
    for(let i =0;i<res.length;i++){
        nums1[i] = res[i]
    }
};
```
* 时间复杂度：$O(m + n)$
* 空间复杂度：$O(m + n)$

## 思路二
双指针，倒叙遍历，原地修改，遍历次数`t=m+n-1`，因为`m`，`n`对应的是数组有数据的长度，且数组是已经排序，
所以`nums[m--]`和`nums[n--]`中大的直接赋值给`nums[t--]`，最后考虑`m`，`n`小于0的情况

## 题解
```javascript
 var merge = function(nums1, m, nums2, n) {
    let l = t=m+n-1
    --m
    --n
    for(let i =0;i<=l;i++){
        if(m>=0 && n>=0){
            nums1[t--] = nums1[m] > nums2[n]?nums1[m--]:nums2[n--]
        }else if(m>=0){
            nums1[t--] = nums1[m--]
        }else{
            nums1[t--] = nums2[n--]
        }
    }
};
```
* 时间复杂度：$O(m + n)$
* 空间复杂度：$O(1)$