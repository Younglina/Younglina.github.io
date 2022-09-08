---
title: 890.查找和替换模式
author: Younglina
date: '2022-06-12'
showAccessNumber: true
categories:
 - 算法
tags:
 - 回溯
 - 中等
---

## 题目描述
[890.查找和替换模式](https://leetcode.cn/problems/find-and-replace-pattern/)  
你有一个单词列表 words 和一个模式  pattern，你想知道 words 中的哪些单词与模式匹配。  
如果存在字母的排列 p ，使得将模式中的每个字母 x 替换为 p(x) 之后，我们就得到了所需的单词，那么单词与模式是匹配的。  
（回想一下，字母的排列是从字母到字母的双射：每个字母映射到另一个字母，没有两个字母映射到同一个字母。）  
返回 words 中与给定模式匹配的单词列表。  
你可以按任何顺序返回答案。  

### 示例 1：
```
输入：words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"  
输出：["mee","aqq"]  
解释：  
"mee" 与模式匹配，因为存在排列 {a -> m, b -> e, ...}。  
"ccc" 与模式不匹配，因为 {a -> c, b -> c, ...} 不是排列。  
因为 a 和 b 映射到同一个字母。  
```

:::tip 提示
1 <= words.length <= 50  
1 <= pattern.length = words[i].length <= 20  
:::

## 思路
通过把字符串转换为数字，来模拟排列，然后比较是否相等。  
如`'abb'=>'122','abc'=>'123'`  

## 题解
```javascript
var findAndReplacePattern = function(words, pattern) {
    let toNum = (word)=>{
        let arr =[],map={},t=0
        for(let i of word){
            if(!map[i]){
                t++
                map[i] = t
            }
            arr.push(map[i])
        }
        return arr.toString()
    }
    let pa = toNum(pattern),res=[]
    for(let i of words){
        if(toNum(i)===pa){
            res.push(i)
        }
    }
    return res
};
```
