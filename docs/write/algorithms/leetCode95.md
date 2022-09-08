---
title: 95.不同的二叉搜索树 II
author: Younglina
date: '2022-07-21'
showAccessNumber: true
categories:
 - 算法
tags:
 - 递归
 - 中等
---

## 题目描述
[95.不同的二叉搜索树 II](https://leetcode.cn/problems/unique-binary-search-trees-ii/)  
给你一个整数`n`，请你生成并返回所有由 `n` 个节点组成且节点值从 `1` 到 `n` 互不相同的不同 二叉搜索树 。可以按 `任意顺序` 返回答案。

### 示例 1：
```
输入：n = 3  
输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]  
```

### 示例 2：
```
输入：n = 1  
输出：[[1]]  
```

:::tip 提示
1 <= n <= 8  
:::

## 思路
因为二叉搜索树地性质是，`左节点值<父节点值<右节点值`  
以1到n分别作为根节点，如果当前数是3，那么它的左子树只能是由1到2的二叉搜索树，右子树只能是由4到n的二叉搜索树，  
1到2和4到n和上面一步一样，所以可以递归判断，期间会有很多重复运算，所以可以用一个哈希表记录`start&end`，表示start到end的组合  

## 题解
```javascript
var generateTrees = function(n) {
    let map = {}
    let func = (s,e) => {
        if(s>e) return [null]
        let res = []
        let key = `${s}&${e}`
        if(map[key]) return map[key]
        for(let i=s;i<=e;i++){
            let l = func(s,i-1),r=func(i+1,e)
            for(let lnode of l){
                for(let rnode of r){
                    res.push(new TreeNode(i, lnode, rnode))
                }
            }
        }
        map[key] = res
        return res
    }
    return func(1,n)
};
```