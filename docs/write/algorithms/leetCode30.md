---
title: 30.串联所有单词的子串
author: Younglina
date: '2022-02-21'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 困难
---

## 题目描述
[30.串联所有单词的子串](https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/)  
给定一个字符串 s 和一些 长度相同 的单词 words 。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。  
注意子串要与 words 中的单词完全匹配，中间不能有其他字符 ，但不需要考虑 words 中单词串联的顺序。  

### 示例 1：
```
输入：s = "barfoothefoobarman", words = ["foo","bar"]  
输出：[0,9]  
解释：  
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。  
输出的顺序不重要, [9,0] 也是有效答案。  
```

### 示例 2：
```
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]  
输出：[]
```

### 示例 3：
```
输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]  
输出：[6,9,12]  
```

:::tip 提示
1 <= s.length <= 104  
s 由小写英文字母组成  
1 <= words.length <= 5000  
1 <= words[i].length <= 30  
words[i] 由小写英文字母组成  
:::

## 思路
整体思路就是滑动窗口+哈希表计数
1. 遍历`words`，统计其中每个单词出现的次数记录`wm`
2. 遍历字符串`s`，循环`words`中一个单词的长度`awl`即可
3. 定义左右指针`l,r`，出现`words`中单词的个数`count`，当前循环单词出现的次数记录`win`
4. 通过截取`ss=substring(r, r+awl)`，查看`ss`是否存在于`wm`
   - 不存在，清空`win`和`count`，`l`移动至`r`
   - 存在的话，记录`win[ss]`，`count+1`
    1. 当`win[ss]>wm[ss]`时需要从左边`l`开始缩小窗口，减去`win`中`s.substring(l,l+awl)`出现的次数，且`count-1`
    2. `count=words.length`的话，符合条件
## 题解
```javascript
var findSubstring = function(s, words) {
    let wm = {}
    for(const w of words){
        wm[w] = (wm[w]||0)+1
    }
    let awl=words[0].length,sl=s.length,wl=words.length,res=[],l,r,count,win
    for(let i=0;i<awl;i++){
        l=r=i,count=0,win={}
        while(r<sl-awl){
            let ss = s.substring(r, r+awl)
            r+=awl
            if(!wm[ss]){
                win = {}
                l=r
                count=0
            }else{
                win[ss] = (win[ss]||0)+1
                count++
                while(win[ss]>wm[ss]){
                    let sl = s.substring(l,l+awl)
                    l+=awl
                    win[sl]--
                    count--
                }
                if(count===wl) res.push(l)
            }
        }
    }
    return res
}
```