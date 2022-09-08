---
title: 1208.尽可能使字符串相等
author: Younglina
date: '2022-02-24'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 中等
---

## 题目描述
[1208.尽可能使字符串相等](https://leetcode-cn.com/problems/get-equal-substrings-within-budget/)  
给你两个长度相同的字符串，`s` 和 `t`。

将 `s` 中的第 `i` 个字符变到 t 中的第 `i` 个字符需要 `|s[i] - t[i]|` 的开销（开销可能为 0），也就是两个字符的 `ASCII` 码值的差的绝对值。

用于变更字符串的最大预算是 `maxCost`。在转化字符串时，总开销应当小于等于该预算，这也意味着字符串的转化可能是不完全的。

如果你可以将 `s` 的子字符串转化为它在 `t` 中对应的子字符串，则返回可以转化的最大长度。

如果 `s` 中没有子字符串可以转化成 `t` 中对应的子字符串，则返回 `0`。

### 示例 1：
```
输入：s = "abcd", t = "bcdf", maxCost = 3  
输出：3  
解释：s 中的 "abc" 可以变为 "bcd"。开销为 3，所以最大长度为 3。  
```

### 示例 2：
```
输入：s = "abcd", t = "cdef", maxCost = 3  
输出：1  
解释：s 中的任一字符要想变成 t 中对应的字符，其开销都是 2。因此，最大长度为 1。  
```

### 示例 3：
```
输入：s = "abcd", t = "acde", maxCost = 0  
输出：1  
解释：a -> a, cost = 0，字符串未发生变化，所以最大长度为 1。  
```

:::tip 提示
1 <= s.length, t.length <= 10^5  
0 <= maxCost <= 10^6  
s 和 t 都只含小写英文字母。  
:::

## 思路
滑动窗口，维护两个指针 `l,r`为滑动窗口的左右边界，`diff`为`s[r]-t[r]`对应字符串的差值，`c`为`diff`的总和，为了决定如何移动指针。
1. 遍历字符串累加`diff`至`c`
2. 当`c>maxCost`时，需要缩小滑动窗口左边界`l`，且`c`需要减去`s,t`所在`l`对应的字符串的`diff`值
3. 记录最大值为`r-l+1`

## 题解
```javascript
var equalSubstring = function(s, t, maxCost) {
    let len = s.length,r=0,l=0,c=0,res=0,diff=0
    while(r<len){
        diff = Math.abs(s[r].charCodeAt()-t[r].charCodeAt())
        c+=diff
        while(c>maxCost){
            c -= Math.abs(s[l].charCodeAt()-t[l].charCodeAt())
            l++
        }
        res = Math.max(r-l+1, res)
        r++
    }   
    return res
};
```