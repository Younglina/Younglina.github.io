---
title: 滑动窗口模版
author: Younglina
date: '2022-02-17'
showAccessNumber: true
categories:
 - 算法
tags:
 - 算法模版
---
:::tip
[参考【fuxuemingzhu】关于「滑动窗口」的模版](https://leetcode-cn.com/problems/max-consecutive-ones-iii/solution/fen-xiang-hua-dong-chuang-kou-mo-ban-mia-f76z/)
:::
```javascript
var solution = function(nums) {
    let len = nums.length, // 数组/字符串长度
    r=0,l=0, // 双指针，表示当前遍历的区间[left, right]，闭区间
    sum=0, // 用于统计 子数组/子区间 是否有效，根据题目可能会改成求和/计数
    res=0 // 保存最大的满足题目要求的 子数组/子串 长度
    while(r<len){ // 当右边的指针没有搜索到 数组/字符串 的结尾
        sum+=nums[r] // 增加当前右边指针的数字/字符的求和/计数
        while(区间[left, right]不符合题意){// 此时需要一直移动左指针，直至找到一个符合题意的区间
            sum -= nums[l] // 移动左指针前需要从counter中减少left位置字符的求和/计数
            l++ //  真正的移动左指针，注意不能跟上面一行代码写反
        }
        res = Math.max(res, r-l+1) // 需要更新结果
        r++ //  移动右指针，去探索新的区间
    }
    return res
};
```

滑动窗口中用到了左右两个指针，它们移动的思路是：以右指针作为驱动，拖着左指针向前走。右指针每次只移动一步，而左指针在内部 `while` 循环中每次可能移动多步。右指针是主动前移，探索未知的新区域；左指针是被迫移动，负责寻找满足题意的区间。

模板的整体思想是：

定义两个指针 `left` 和 `right` 分别指向区间的开头和结尾，注意是闭区间；定义 `sums` 用来统计该区间内的各个字符出现次数；
第一重 `while` 循环是为了判断 `right` 指针的位置是否超出了数组边界；当 `right` 每次到了新位置，需要增加 `right` 指针的求和/计数；
第二重 `while` 循环是让 `left` 指针向右移动到 `[left, right]` 区间符合题意的位置；当 `left` 每次移动到了新位置，需要减少 `left` 指针的求和/计数；
在第二重 `while` 循环之后，成功找到了一个符合题意的 `[left, right]` 区间，题目要求最大的区间长度，因此更新 `res` 为 `max(res, 当前区间的长度)` 。
`right` 指针每次向右移动一步，开始探索新的区间。
模板中的 `sums` 需要根据题目意思具体去修改，本题是求和题目因此把 `sums` 定义成整数用于求和；如果是计数题目，就需要改成字典用于计数。当左右指针发生变化的时候，都需要更新 `sums` 。

另外一个需要根据题目去修改的是内层 `while` 循环的判断条件，即： 区间 `[left, right]` 不符合题意 。

## 例如 1004.最大连续1的个数 III

## 题目描述
[1004.最大连续1的个数 III](https://leetcode-cn.com/problems/max-consecutive-ones-iii/)  
给定一个二进制数组 `nums` 和一个整数 `k` ，如果可以翻转最多`k` 个 `0` ，则返回 数组中连续 `1` 的最大个数 。

### 示例 1：
```
输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
输出：6
解释：[1,1,1,0,0,1,1,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 6。
```

### 示例 2：
```
输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
输出：10
解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 10。
```

## 题解
```javascript
var longestOnes = function(nums, k) {
    let len = nums.length,r=0,l=0,sum=0,res=0
    while(r<len){
        sum+=nums[r]
        while(r-l+1>sum+k){
            sum -= nums[l]
            l++
        }
        res = Math.max(res, r-l+1)
        r++
    }
    return res
};
```