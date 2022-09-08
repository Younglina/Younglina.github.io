---
title: 926.将字符串翻转到单调递增
author: Younglina
date: '2022-06-11'
showAccessNumber: true
categories:
 - 算法
tags:
 - 回溯
 - 中等
---

## 题目描述
[926.将字符串翻转到单调递增](https://leetcode.cn/problems/flip-string-to-monotone-increasing/)  
如果一个二进制字符串，是以一些 0（可能没有 0）后面跟着一些 1（也可能没有 1）的形式组成的，那么该字符串是 单调递增 的。  
给你一个二进制字符串 s，你可以将任何 0 翻转为 1 或者将 1 翻转为 0 。  
返回使 s 单调递增的最小翻转次数。  

### 示例 1：
```
输入：s = "00110"
输出：1
解释：翻转最后一位得到 00111.  
```

### 示例 2：
```
输入：s = "010110"  
输出：2  
解释：翻转得到 011111，或者是 000111。 
```

### 示例 2：
```
输入：s = "00011000"  
输出：2  
解释：翻转得到 00000000。  
```

:::tip 提示
1 <= s.length <= 105  
s[i] 为 '0' 或 '1'  
:::

## 思路

遍历数组，统计`1`的个数记为`one`,dp表示当前最少操作数  
当i=0时，dp[0]=0,one=s[0]==='1'?1:0，开始遍历
- 如果s[i]是0，看是把自己变成1操作数少，还是前面1全变成0操作数少，即`dp[i]=Math.min(dp[i-1]+1, one)`。  
`dp[i-1]`为前一步的最小操作数，把当前'0'变成'1'需要加1步操作数，所以是`dp[i-1]+1`  
- 如果s[i]是1，one计数加1，结果不变，等于前一步最小操作数，`dp[i]=dp[i-1]`

## 题解
```javascript
var minFlipsMonoIncr = function(s) {
    let dp = [0],one = ~~(s[0]==='1');
    for(let i =1;i<s.length;i++){
        if(s[i]==='1'){
            one++
        }else{
            dp = Math.min(dp[i-1]+1, one)
        }
    }
    return dp[s.length-1]
}

```

## 优化  
由前面可知，只需要求出，如果当前是0，是把0变1，还是前面的1全变成0的最小值
```javascript
var minFlipsMonoIncr = function(s) {
    let res=0, one=0
    for(let i of s){
        if(i==='1'){
            one++
        }else{
            res= Math.min(res+1, one)
        }
    }
    return res
};
```