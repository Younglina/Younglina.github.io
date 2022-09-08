---
title: 17.电话号码的字母组合
author: Younglina
date: '2022-03-06'
showAccessNumber: true
categories:
 - 算法
tags:
 - 回溯
 - 中等
---

## 题目描述
[17.电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。  

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。  

### 示例 1：
```
输入：digits = "23"  
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]  
```

### 示例 2：
```
输入：digits = ""  
输出：[]  
```

### 示例 3：
```
输入：digits = "2"  
输出：["a","b","c"]  
```

:::tip 提示
0 <= digits.length <= 4  
digits[i] 是范围 ['2', '9'] 的一个数字。  
:::

## 思路
1. 建立`charts`数组，对应数字和字母的关系
2. `res`存符合条件的结果，`path`存回溯过程的数据
3. 定义回溯时的下标`idx`，每次取`idx+1`获取`digits`后面对应的数字
4. 当`path`长度等于`digits`的长度的时候就符合条件了，退出当前递归
## 题解
```javascript
var letterCombinations = function(digits) {
    if(!digits) return []

    let res = [],path=[],len = digits.length,
    charts = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
    
    const backLoop = (idx) => {
        if(path.length===len){
            res.push(path.join(''))
            return
        }
        const chart = charts[digits[idx]]
        for(let i=0,len=chart.length;i<len;i++){
            path.push(chart[i])
            backLoop(idx+1)
            path.pop()
        }
    }
    backLoop(0)
    return res
};
```