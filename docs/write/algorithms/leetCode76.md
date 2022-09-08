---
title: 76.最小覆盖子串
author: Younglina
date: '2022-09-07'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 困难
---

## 题目描述
[76.最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)  
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。  

注意：  
对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。  
如果 s 中存在这样的子串，我们保证它是唯一的答案。  

### 示例 1：
```
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
```

### 示例 2：
```
输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
```

:::tip 提示
1 <= s.length, t.length <= 105  
s 和 t 由英文字母组成  
:::

## 思路
先用`map`记录`t`中每个单词出现的次数，然后通过滑动窗口判断该滑窗内单词出现的次数是否与`map`中的相等  
1. 统计滑窗内字符出现次数
    使用另一个`win`来统计当前字符`c`，当`c存在于map。并且win[c]<=map[c]`则`cnt++`
2. 缩小窗口
    当窗口左侧的字符不存在于`map`，或者左侧字符在`win`中的出现次数大于`map`的时候，左侧向右侧滑动，且`win`中的次数减一
3. 获取结果
    当`cnt=t.length`时，说明窗口内包含了t，`res`即为该窗口，因为是要获取最小，所以在后面有更小的窗口时，需更新`res`

## 题解
```javascript
var minWindow = function(s, t) {
    let map = {}
    for(let i of t){
        map[i] = (map[i]||0)+1
    }
    let [l,r,res,win,cnt,sl,tl] = [0,0,"",{},0,s.length,t.length]
    while(r<sl){
        let c = s[r]
        win[c] = (win[c]||0)+1
        if(map[c] && win[c]<=map[c]) cnt++
        while(l<r && (!map[s[l]] || win[s[l]]>map[s[l]] )){
            win[s[l++]]--
        }
        if(cnt===tl){
            if(res==='' || r-l+1<res.length){
                res = s.substring(l,r+1)
            }
        }
        r++
    }
    return res
};
```