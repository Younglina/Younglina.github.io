---
title: 222.完全二叉树的节点个数
author: Younglina
date: '2022-06-18'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 中等
---

## 题目描述
[222.完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/)  
给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。  
完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。   

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/222.jpg)
```
输入：root = [1,2,3,4,5,6]  
输出：6  
```

### 示例 2：
```
输入：root = []  
输出：0  
```

### 示例 3：
```
输入：root = [1]  
输出：1  
```

:::tip 提示  
树中节点的数目范围是[0, 5 * 104]  
0 <= Node.val <= 5 * 104  
题目数据保证输入的树是 完全二叉树  
:::

## 思路1
常规遍历，计算每层的节点数，然后累加

## 题解
```javascript
var countNodes = function(root) {
    let res = 0
    let func = (node)=>{
        if(!node) return
        res++
        func(node.left)
        func(node.right)
    }
    func(root)
    return res
}
```

## 优化
```javascript
var countNodes = function(root) {
    if(!root) return 0
    return countNodes(root.left) + countNodes(root.right) + 1
}
```

## 思路2
利用题目给出的完全二叉树性质，递归遍历左右子树的深度，如果左右子树的深度相同，则符合满二叉树，直接使用`Math.pow(2,深度)`计算即可，否则常规遍历计数

## 题解
```javascript
var countNodes = function(root) {
    let [l,ldeep,r,rdeep] = [root,0,root,0]
    while(l){
        l=l.left
        ldeep++
    }
    while(r){
        r=r.right
        rdeep++
    }
    if(ldeep===rdeep){
        return Math.pow(2,ldeep) - 1
    }
    return 1+countNodes(root.left)+countNodes(root.right)
}
```

