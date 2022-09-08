---
title: 1663.具有给定数值的最小字符串
author: Younglina
date: '2022-06-06'
showAccessNumber: true
categories:
 - 算法
tags:
 - 贪心
 - 中等
---

## 题目描述
[1663.具有给定数值的最小字符串](https://leetcode.cn/problems/smallest-string-with-a-given-numeric-value/)  
小写字符 的 数值 是它在字母表中的位置（从 1 开始），因此 a 的数值为 1 ，b 的数值为 2 ，c 的数值为 3 ，以此类推。  
字符串由若干小写字符组成，字符串的数值 为各字符的数值之和。例如，字符串 "abe" 的数值等于 1 + 2 + 5 = 8 。  
给你两个整数 n 和 k 。返回 长度 等于 n 且 数值 等于 k 的 字典序最小 的字符串。  
注意，如果字符串 x 在字典排序中位于 y 之前，就认为 x 字典序比 y 小，有以下两种情况：  
x 是 y 的一个前缀；  

### 示例 1：
```
输入：n = 3, k = 27  
输出："aay"  
解释：字符串的数值为 1 + 1 + 25 = 27，它是数值满足要求且长度等于 3 字典序最小的字符串。  
```

### 示例 2：
```
输入：n = 5, k = 73  
输出："aaszz"  
```

:::tip 提示
1 <= n <= 105  
n <= k <= 26 * n  
:::

## 思路1
因为需要的是字典序最小，所以优先使用`a`拼接字符串，如果后面需要补充的长度使用`z`无法达到`k`值，则当前字符就不能使用`a`拼接  
如 n=3,k=27，优先使用`a`拼接
1. 当前第1个位置，如果使用`a`，后面需要补充的是`3-1`个`z`，`(3-1)*26=52 >= 27-1`，所以可以使用`a`，此时s='a'
2. 当前第2个位置，如果使用`a`，后面需要补充的是`3-2`个`z`，`(3-2)*26=26 >= 27-2`，所以可以使用`a`，此时s='aa'
3. 当前第3个位置，如果使用`a`，后面需要补充的是`3-3`个`z`，`(3-3)*26=0 < 27-3`，所以第3个位置不能使用`a`，应使用当前的差值的绝对值（(3-2)*26-27-2）
4. 此时可提前结束循环，因为后面的位置都可以使用`z`拼接

## 题解1
```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function(n, k) {
    let s='',num=0
    for(let i=0;i<n;i++){
        let diff = (n-i-1)*26-(k-num)
        if(diff>=0){
            s+='a'
            num++
        }else{
            let code = Math.abs(diff)
            num+=(code)
            s+=String.fromCharCode(code+96)
            break
        }
    }
    return s.padEnd(n,'z')
};
```

## 思路2
初始化一个长度为`n`的数组使用`a`填充，diff=k-n  
从后往前修改数组，遍历diff,如果diff>25，说明当前可以用`z`替换，最后diff应该是在[0,25]的数字，所以再修改一次数组对应下标的值为diff

## 题解2
```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function(n, k) {
    let s = Array(n).fill('a'),diff=k-n,idx=n-1
    while(diff>25){
        s[idx--] = 'z'
        diff-=25
    }
    s[idx] = String.fromCharCode(diff+97)
    return s.join('')
};
```
