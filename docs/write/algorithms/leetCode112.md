---
title: 112.路径总和
author: Younglina
date: '2022-02-27'
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
[112.路径总和](https://leetcode-cn.com/problems/path-sum/solution/)  
给你一个二叉树的根节点 `root` ， 检查它是否轴对称。
请你返回字符串的能量。

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/112.jpeg)
```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22  
输出：true  
解释：等于目标和的根节点到叶节点路径如上图所示。  
```

### 示例 2：
```
         1
       /   \
      2     3
输入：root = [1,2,3], targetSum = 5  
输出：false  
解释：树中存在两条根节点到叶子节点的路径：  
(1 --> 2): 和为 3  
(1 --> 3): 和为 4  
不存在 sum = 5 的根节点到叶子节点的路径。  
```

### 示例 3：
```
输入：root = [], targetSum = 0  
输出：false  
解释：由于树是空的，所以不存在根节点到叶子节点的路径。
```

:::tip 提示
树中节点的数目在范围 [0, 5000] 内  
-1000 <= Node.val <= 1000  
-1000 <= targetSum <= 1000
:::

## 递归
每次用`sum`减去当前节点值，碰到叶子结点时判断`sum===0`

## 题解
```javascript
var isSymmetric = function(root, s) {
    if(!root) return false
    s-=root.val
    if(!root.left && !root.right) return s===0
    return  isSymmetric(root.left, s) || isSymmetric(root.right,s)
}
```

## 迭代
利用队列和一个存储当前路径的差值迭代，当碰到叶子结点，判断当前节点与差值是否相等

## 题解
```javascript
var isSymmetric = function(root,sum) {
    if(!root) return false
    let queue = [root],res=[root.val],t,s
    while(queue.length){
        t = queue.shift()
        s = res.shift()
        if(!t.left && !t.right && s===sum) return true
        if(t.left){
            queue.push(t.left)
            res.push(t.left.val+s)
        }
        if(r.right){
            queue.push(t.right)
            res.push(t.right.val+s)
        }
    }
    return false
}
```