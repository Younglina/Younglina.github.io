---
title: 530.二叉搜索树的最小绝对差
author: Younglina
date: '2022-06-25'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 简单
---

## 题目描述

**[530.二叉搜索树的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/)**  
给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。  
差值是一个正数，其数值等于两值之差的绝对值。  

### 示例 1：
         4  
        / \   
       2   6  
       /\  
      1  3  
```
输入：root = [4,2,6,1,3]  
输出：1  
```
### 示例 2：
         1  
        / \   
       0  48  
            /\  
        12  49  
```
输入：root = [1,0,48,null,null,12,49]
输出：1
```

:::tip 提示
树中节点的数目范围是 [2, 104]  
0 <= Node.val <= 105  
:::

## 思路
二叉搜索树有个性质为，二叉搜索树中序遍历得到的值序列是递增有序的，而在有序数列中，最小之差，一定为相邻两个元素之差  
所以题意可理解为，在二叉搜索树的中序遍历过程中，求得最小的相邻两个元素之差，遍历过程中，维护一个最小差值，和一个前驱节点即可  

## 题解
```javascript
var getMinimumDifference = function(root) {
    let res = Infinity,pre
    let dfs = (node) => {
        if(!node) return
        dfs(node.left)
        if(pre!=undefined){
            res = Math.min(res, node.val-pre)
        }
        pre=node.val
        dfs(node.right)
    }
    dfs(root)
    return res
};
```
