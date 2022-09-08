---
title: 589.N叉树的前序遍历
author: Younglina
date: '2022-06-23'
showAccessNumber: true
categories:
 - 算法
tags:
 - 滑动窗口
 - 中等
---

## 题目描述
[589.N 叉树的前序遍历](https://leetcode-cn.com/problems/longest-repeating-character-replacement/)  
给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。  
n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/589_1.png)
```
输入：root = [1,null,3,2,4,null,5,6]  
输出：[1,3,5,6,2,4]  
```

### 示例 2：
![](https://raw.githubusercontent.com/Younglina/images/master/589_2.png)
```
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]  
输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]  
```

进阶：递归法很简单，你可以使用迭代法完成此题吗?

:::tip 提示
节点总数在范围 [0, 104]内  
0 <= Node.val <= 104  
n 叉树的高度小于或等于 1000  
:::

## 递归
与常规的前序递归相比，不同之处在于，递归传递的不是左右节点，而是遍历的递归`children`  

## 题解
```javascript
var preorder = function(root) {
    let res = []
    let dfs = (node) => {
        if(!node) return
        res.push(node.val)
        node.children.map(n=>dfs(n))
    }
    dfs(root)
    return res
};
```

## 迭代
与常规的迭代相比，不同之处在于，维护队列时，不再是分别`push`左右子节点，而是将`children`解构以后，在队首插入  

## 题解
```javascript
var preorder = function(root) {
    let res = [],queue=[root]
    while(queue.length){
        let node = queue.shift()
        if(!node) continue
        res.push(node.val)
        queue.unshift(...node.children)
    }
    return res
};
```