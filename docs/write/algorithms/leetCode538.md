---
title: 538.把二叉搜索树转换为累加树
author: Younglina
date: '2022-06-16'
showAccessNumber: true
categories:
 - 算法
tags:
 - 数
 - 中等
---

## 题目描述
[538.把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/)  
给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。  
提醒一下，二叉搜索树满足下列约束条件：  
节点的左子树仅包含键 小于 节点键的节点。  
节点的右子树仅包含键 大于 节点键的节点。  
左右子树也必须是二叉搜索树。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/538.png)
```
输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]  
输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]  
```

### 示例 2：
```
输入：root = [0,null,1]  
输出：[1,null,1]  
```

### 示例 3：
```
输入：root = [1,0,2]  
输出：[3,3,2]  
```

:::tip 提示
树中的节点数介于 0 和 104 之间。  
每个节点的值介于 -104 和 104 之间。  
树中的所有值 互不相同 。  
给定的树为二叉搜索树。  
:::

## 思路
根据二叉搜索树的定义可知，如果对树进行正常的中序遍历，那么结果就是一个升序的数组。  
而如果改变中序遍历中先左后右的顺序，进行逆序遍历，然后直接进行累加就能得到结果  
如例一中，正常中序遍历获取的数据先后顺序为，0,1,2,3,4,5,6,7,8  
逆序中序遍历获取的数据先后顺序为，8,7,6,5,4,3,2,1,0  

## 题解
```javascript
var convertBST = function(root) {
    let sum = 0
    let func = (root) => {
        if(!root) return
        func(root.right)
        sum+=root.val
        root.val = sum
        func(root.left)
    }
    func(root)
    return root
};
```
