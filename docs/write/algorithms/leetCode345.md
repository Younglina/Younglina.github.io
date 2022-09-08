---
title: 345.反转字符串中的元音字母
author: Younglina
date: '2022-01-07'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 简单
---

## 题目描述
[345.反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)  
给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。  
元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现。

### 示例 1：
```
输入：s = "hello"
输出："holle"
```

### 示例 2：
```
输入：s = "leetcode"
输出："leotcede"
```

:::tip 提示
1 <= s.length <= 3 * 105  
s 由 可打印的 ASCII 字符组成  
:::

## 思路
1. 先把元音字母的大小写放到对象里，不放在数组里的原因是因为，在判断是否存在数组中时使用`includes`会有消耗
2. 把`s`，`split`格式化成数组，为了后面进行位置交换
3. 定义`i`,`j`，两个指针，一个从前遍历，一个从后遍历，当`s[i]`为元音字母时跳出循环，接着找`s[j]`是元音字母
4. 交换`s[i]``s[j]`
5. 最后把s还原成字符串

## 题解
```javascript
var reverseVowels = function(s) {
    const y = {'a':1,'e':1,'i':1,'o':1,'u':1,
    'A':1,'E':1,'I':1,'O':1,'U':1}
    s = s.split('')
    for(let i=0,j=s.length-1;i<j;){
        while(!y[s[i]] && i<j){
            i++
        }
        while(!y[s[j]] && i<j){
            j--
        }
        [s[i],s[j]] = [s[j],s[i]]
        i++
        j--
    }
    return s.join('')
};
```