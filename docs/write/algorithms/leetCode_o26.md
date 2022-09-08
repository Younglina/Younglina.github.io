---
title: 剑指Offer26.树的子结构
author: Younglina
date: '2022-07-12'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 对称树
 - 中等
---

## 题目描述
[剑指Offer26.树的子结构](https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/)  
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)  
B是A的子结构， 即 A中有出现和B相同的结构和节点值。  

例如:  
给定的树 A:  

     3  
    / \  
   4   5  
  / \  
 1   2  
给定的树 B：  
  
   4   
  /  
 1  
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。  

### 示例 1：

```
输入：A = [1,2,3], B = [3,1]
输出：false
```

### 示例 2：

```
输入：A = [3,4,5,1,2], B = [4,1]
输出：true
```

:::tip 提示
0 <= 节点个数 <= 10000
:::

## 思路
B如果是A的子结构，那么B一定先比A要先遍历完，且判断的前提为A.val==B.val  
先从根节点判断B是不是A的子结构，如果不是在分别从左右两个子树判断  
1：递归的进行上面的判断  
2：再判断A.left或者A.right中是否有B的子结构  

## 题解
```javascript
var isSubStructure = function(A, B) {
    if(!A || !B) return false
    //只要有一个为true，就说明B是A的子结构
    return dfs(A, B) || isSubStructure(A.left,B) || isSubStructure(A.right,B)
};

var dfs = (A, B) => {
    // 递归到B为空时，说明B再A中找到了
    if(!B) return true
    // B不为空时，A为空了，说明B不是A的子节点
    if(!A) return false
    return A.val===B.val && dfs(A.left, B.left) && dfs(A.right, B.right)
}
```