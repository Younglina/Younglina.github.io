---
title: 230.二叉搜索树中第K小的元素
author: Younglina
date: '2022-06-26'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 中等
---

## 题目描述

**[230.二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)**  
给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。  
差值是一个正数，其数值等于两值之差的绝对值。  

### 示例 1：
         3  
        / \   
       1   4  
        \ 
         2  
```
输入：root = [4,2,6,1,3]  
输出：1  
```
### 示例 2：
         5  
        / \   
       3  6    
      /\    
    2   4  
   /  
 1  
```
输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
```

:::tip 提示
树中的节点数为 n 。
1 <= k <= n <= 104
0 <= Node.val <= 104
:::

## 思路
二叉搜索树有个性质为，二叉搜索树中序遍历得到的值序列是递增有序的，所以在中序遍历过程中，对k进行自减操作，当k减到0时，就能的到结果  

## 题解
```javascript
var kthSmallest = function(root, k) {
    let res = 0
    let dfs = (node) => {
        if(node && k>0){
            dfs(node.left)
            if(--k===0) res = node.val
            dfs(node.right)
        }
    }
    dfs(root)
    return res
};
```
