---
title: 394.字符串解码
author: Younglina
date: '2022-07-08'
showAccessNumber: true
categories:
 - 算法
tags:
 - 栈
 - 中等
---

## 题目描述
[394.字符串解码](https://leetcode.cn/problems/decode-string/)  
给定一个经过编码的字符串，返回它解码后的字符串。  
编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。  
你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。  
此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。  

### 示例 1：
```
输入：s = "3[a]2[bc]"  
输出："aaabcbc"  
```

### 示例 2：
```
输入：s = "3[a2[c]]"  ·
输出："accaccacc"  
```

### 示例 3：
```
输入：s = "2[abc]3[cd]ef"  
输出："abcabccdcdcdef"  
```

### 示例 4：
```
输入：s = "abc3[cd]xyz"  
输出："abccdcdcdxyz"  
```

:::tip 提示
1 <= s.length <= 30  
s 由小写英文字母、数字和方括号 '[]' 组成  
s 保证是一个 有效 的输入。  
s 中所有整数的取值范围为 [1, 300]   
:::

## 思路
用两个栈分别存储`当前字符串需要重复的次数`numStack和`前一段已经操作过的字符串`strStack。维护两个变量，`num=0`当前字符串需要重复的次数，`str=''`当前字符串。    
遍历`s`，记录当前字符为`c`  
- 如果c为数字，因为数字可能是十位或者百位，所以先将`num*10`再加上`c`  
- 如果c为'\['，将`num`和`str`入栈，并重置为`0`和`''`，因为可能碰到连续的'\[',如`3[a2[b\]\]`，重置是为了统计后面的字符串  
- 如果c为']'，此时strStack栈顶为之前做过操作的字符串，numStack栈顶为当前`[]`中字符串`str`需要重复的次数，即`strStrck.pop()+str.repeat(numStack.pop())`
- c为字母，累加，`str+=c`

## 题解
```javascript
var decodeString = function(s) {
    let numStack=[],strStack=[],num=0,str=''
    for(let c of s){
        if(!isNaN(c)){
            num=num*10+(+c)
        }else if(c==='['){
            numStack.push(num)
            strStack.push(str)
            num=0
            str=''
        }else if(c===']'){
            str=strStack.pop()+str.repeat(numStack.pop())
        }else{
            str+=c
        }
    }
    return str
}
```
