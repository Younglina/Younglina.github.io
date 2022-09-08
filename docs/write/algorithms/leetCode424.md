---
title: 424.替换后的最长重复字符
author: Younglina
date: '2022-01-10'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 中等
---

## 题目描述
[424.替换后的最长重复字符](https://leetcode-cn.com/problems/longest-repeating-character-replacement/)  
给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 `k` 次。在执行上述操作后，找到包含重复字母的最长子串的长度。

注意：字符串长度 和 `k` 不会超过`104`。

### 示例 1：
```
输入：s = "ABAB", k = 2
输出：4
解释：用两个'A'替换为两个'B',反之亦然。
```

### 示例 2：
```
输入：s = "AABABBA", k = 1
输出：4
解释：
将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
子串 "BBBB" 有最长重复字母, 答案为 4。
```

## 思路
1. 定义`l`,`r`双指针确定滑动窗口
2. 移动右指针`r`，确定滑动窗口中出现最多的字母次数记为`max`
3. 根据滑动窗口的大小`r-l+1`是否大于`max+k`，大于的话说明，在该滑动窗口中能被替换的字母已经不足，如`AABAB`，此时`r=4, l=0, k=1`，最多只能替换第一个`B`使最长重复等于4，所以此时需要移动左指针`l`重新确定滑动窗口，因为左指针移动，所以它对应的出现次数也需要减1
4. 最后的结果就是滑动窗口的长度`r-l`

## 题解
```javascript
 var characterReplacement = function(s, k) {
  let max = 0,l=0,r=0
  let len = s.length
  let a = {}
  while(r<len){
    a[s[r]] = (a[s[r]] || 0)+1
    max = Math.max(max, a[s[r]])
    if(r-l+1>max+k){
      a[s[l]]--
      l++
    }
    r++
  }
  return r-l
};
```