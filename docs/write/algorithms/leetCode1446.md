---
title: 1446.连续字符
author: Younglina
date: '2022-02-21'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 简单
---

## 题目描述
[1446.连续字符](https://leetcode-cn.com/problems/consecutive-characters/)  
给你一个字符串 s ，字符串的「能量」定义为：只包含一种字符的最长非空子字符串的长度。  
请你返回字符串的能量。

### 示例 1：
```
输入：s = "leetcode"  
输出：2  
解释：子字符串 "ee" 长度为 2 ，只包含字符 'e' 。  
```

### 示例 2：
```
输入：s = "abbcccddddeeeeedcba"  
输出：5  
解释：子字符串 "eeeee" 长度为 5 ，只包含字符 'e' 。  
```

### 示例 3：
```
输入：s = "triplepillooooow"  
输出：5  
```

### 示例 4：
```
输入：s = "hooraaaaaaaaaaay"  
输出：11  
```

### 示例 5：
```
输入：s = "tourist"  
输出：1  
```

:::tip 提示
1 <= s.length <= 500  
s 只包含小写英文字母。  
:::

## 思路
1. 定义快慢指针`i=0,j=1`
2. 遍历字符串，当`s[i]!==s[j]`时，移动`i`到`j`
结果就是最大的`i`到`j`之间的距离

## 题解
```javascript
var maxPower = function(s) {
    let i=0,j=1,res=1,len=s.length
    while(j<len){
        if(s[j]!==s[i]){
            i=j
        }
        j++
        res = Math.max(res, j-i)
    }
    return res
}
```