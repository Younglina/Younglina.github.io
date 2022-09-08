---
title: 101.对称二叉树
author: Younglina
date: '2022-02-28'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 递归
 - 迭代
 - 简单
---

## 题目描述
[101.对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)  
给你一个二叉树的根节点 `root` ， 检查它是否轴对称。
请你返回字符串的能量。

### 示例 1：
```
         1
       /   \
      2     2
    /  \   /  \
   3   4   4  3
输入：root = [1,2,2,3,4,4,3]  
输出：true    
```

### 示例 2：
```
         1
       /   \
      2     2
      \      \
       3      3
输入：root = [1,2,2,null,3,null,3]  
输出：false  
```

:::tip 提示
树中节点数目在范围 [1, 1000] 内  
-100 <= Node.val <= 100  
进阶：你可以运用递归和迭代两种方法解决这个问题吗？
:::

## 递归
1. 如果`root`为空直接返回`true`
2. 对比左右子树`l=root.left,r=root.right`
3. 如果都为空，则对称
4. 如果都不为空，比较值相等`l.val===r.val`，同时比较`l.left,r.right`和`l.right,r.left`
5. 否则就是一个空一个不空返回`false`

## 题解
```javascript
var isSymmetric = function(root) {
    if(!root) return true
    const loop = (l,r) => {
        if(!l && !r) return true
        if(l && r){
            return l.val===r.val && loop(l.left,r.right) && loop(l.right,r.left)
        }
        return false
    }
    return loop(root.left,root.right)
}
```

## 迭代
一对一对进，一对一对出

## 题解
```javascript
var isSymmetric = function(root) {
    if(!root) return true
    let queue = [root.left,root.right],l,r
    while(queue.length){
        l = queue.shift()
        r = queue.shift()
        if(!l && !r) continue
        if(!l || !r || l.val!==r.val) return false
        queue.push(l.left)
        queue.push(r.right)
        queue.push(l.right)
        queue.push(r.left)
    }
    return true
}
```