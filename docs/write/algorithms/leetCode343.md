---
title: 343.整数拆分
author: Younglina
date: '2022-04-14'
showAccessNumber: true
categories:
 - 算法
tags:
 - 动态规划
 - 递归
 - 中等
---

## 题目描述

**[343.整数拆分](https://leetcode-cn.com/problems/integer-break/submissions/)**  
给定一个正整数 `n` ，将其拆分为 `k` 个 正整数 的和`（ k >= 2 ）`，并使这些整数的乘积最大化。  
返回 *你可以获得的最大乘积* 。  

### 示例 1：

```
输入: n = 2  
输出: 1  
解释: 2 = 1 + 1, 1 × 1 = 1。  
```

### 示例 2：
```
输入: n = 10  
输出: 36  
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。  
```

:::tip 提示
2 <= n <= 58  
:::

## 思路1 动态规划

<div class="path-table">

| 2   | 3   |
| --- | --- |
|  [1,1]=1   | 不拆分：j=1,i=2,1*2 <br/> 拆分：j=1,dp[2]=1,1\*1     | 

</div>

`dp[n]`：最大乘积  
`i`: 被拆分的数字，从3开始，因为`n>=2`  
`j`: 拆分的次数，从1开始  

1. 确定`dp[n]`为拆分数字`n`**可以获得的最大乘积**，这个一定要想明白  
2. 获取`dp[n]`有两种路径，`j`是拆分出的第一个正整数，则剩下的部分是 `n-j`，`n−j` 可以不继续拆分，或者继续拆分成至少两个正整数的和  
- 将 `i` 拆分成 `j` 和 `i-j` 的和，且 `i-j` 不再拆分成多个正整数，此时的乘积是 `j*(i−j) ` 
- 将 `i` 拆分成 `j` 和 `i-j` 的和，且 `i-j` 继续拆分成多个正整数，此时的乘积是 `j*dp[i−j] `   
为什么不需要`dp[j]`，`j`是从`1`开始遍历的，所以`j`其实已经背地里拆分过了    
`j * (i - j)` 是单纯的把整数拆分为两个数相乘，而`j * dp[i - j]`是拆分成两个以及两个以上的个数相乘。   
所以可以推出递推公式为: `dp[i] = Math.max(dp[i], j*(i-j), j*dp[i-j])`  
3. 初始化`dp`，`0,1`都是无意义的，`dp[2]=1`，外层直接从`3`开始遍历，内层从`1`开始遍历，把`dp[i]`、`j*(i-j)`和`j*dp[i-j]`取最大值，更新`dp[i]`

```
n=10
[0, 0,  1,  2,  0, 0, 0, 0,  0,  0,   0]
[0, 0,  1,  2,  4, 0, 0, 0,  0,  0,   0]
[0, 0,  1,  2,  4, 6, 0, 0,  0,  0,   0]
[0, 0,  1,  2,  4, 6, 9, 0,  0,  0,   0]
[0, 0,  1,  2,  4, 6, 9, 12, 0,  0,   0]
[0, 0,  1,  2,  4, 6, 9, 12, 18, 0,   0]
[0, 0,  1,  2,  4, 6, 9, 12, 18, 27,  0]
[0, 0,  1,  2,  4, 6, 9, 12, 18, 27,  36]
```
## 题解1
```javascript
var integerBreak = function(n) {
    let dp = Array(n+1).fill(0)
    dp[2]=1
    for(let i=3;i<=n;i++){
        for(let j=1;j<i-j;j++){
            dp[i] = Math.max(dp[i], j*(i-j), j*dp[i-j])
        }
    }
    return dp[n]
}
```

## 思路2 递归
对于数字`n`，它可以拆分成`1到n-1`，`n-1`可以选择拆或者不拆，如果拆分，即递归拆分`n-1`  
不拆的乘积为`i*(n-i)`，拆的为`i*dfs(n-1)`，取最大值即可  

![343.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7759603b2d37489dbd40e1dc453063fd~tplv-k3u1fbpfcp-watermark.image?)

## 题解2
```javascript
var integerBreak = function(n){
    if(n<3){
        return n-1
    }
    let path = [] // 记录已拆分的数字，避免重复计算
    let dfs = (n)=>{
        if(path[n]) return path[n]
        let res = 0
        for(let i=1;i<n;i++){
            res = Math.max(res, i*(n-i), i*dfs(n-1))
        }
        return path[n] = res
    }
    return dfs(n)
}
```

<style>
.path-table tr,.path-table td{
width: 80px;
height: 80px;
text-align: center;
}
.path-table tr:nth-child(2n){
    background-color: unset;
}
</style>