---
title: 687.最长同值路径
author: Younglina
date: '2022-06-19'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 中等
---

## 题目描述
[687.最长同值路径](https://leetcode.cn/problems/longest-univalue-path/)  
给定一个二叉树的 root ，返回 最长的路径的长度 ，这个路径中的 每个节点具有相同值 。 这条路径可以经过也可以不经过根节点。  
两个节点之间的路径长度 由它们之间的边数表示。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/687_1.jpg)
```
输入：root = [5,4,5,1,1,5]  
输出：2  
```

### 示例 2:
![](https://raw.githubusercontent.com/Younglina/images/master/687_2.jpg)
```
输入：root = [1,4,5,4,4,5]  
输出：2  
```

:::tip 提示
树的节点数的范围是 [0, 104]   
-1000 <= Node.val <= 1000  
树的深度将不超过 1000  
:::

## 思路
通过后续遍历，记录父节点值，如果当前值与父节点值不同,那么整棵子树都没有同值路径，返回0。  
相同则比较左子树还是右子树更长，然后加一返回  
同时比较当前子树的左右链之和，和全局最大值比较，更新最大值  
    
## 题解
```javascript
var longestUnivaluePath = function (root) {
  if (root == null) return 0;
  let res = 0;
  let maxDepth = (root, parentVal) => {
    if (root == null) return 0;
    let leftLen = maxDepth(root.left, root.val);
    let rightLen = maxDepth(root.right, root.val);
    res = Math.max(res, leftLen + rightLen);
    if (root.val != parentVal) return 0;
    return 1 + Math.max(leftLen, rightLen);
  };
  maxDepth(root, root.val);
  return res;
};
```