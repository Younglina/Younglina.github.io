---
title: 从一个字符串中找另一个字符串模版
author: Younglina
date: '2022-02-23'
showAccessNumber: true
categories:
 - 算法
tags:
 - 算法模版
---
:::tip
滑动窗口模版的另一种变形
:::
```javascript
var solution = function(s, p) {
    let [sl,pl] = [s.length,p.length],arr=new Array(26).fill(0)
    for(let i=0;i<pl;i++){
        arr[p[i].charCodeAt()-97]++
    }
    let l=0,r=0,res=[],t=""
    while(r<sl){
        t=s[r].charCodeAt()-97
        arr[t]--
        while(arr[t]<0){
            arr[s[l++].charCodeAt()-97]++
        }
        if(r-l+1===pl) res.push(l)
        r++
    }
    return res
};
```

整体思想于滑动窗口类似，多的是，使用一个数组统计需要查找字符串中各个字符出现的次数记为`arr`，  
然后遍历被找的字符串，每次减去`arr`中当前字符的次数，如果次数小于`0`了，说明该滑动窗口不符合条件，  
左边界右移，并且对应字符加一，符合的条件根据题意进行修改；  

例题：  
[438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)  
[567. 字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)  