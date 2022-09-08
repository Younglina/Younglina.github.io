---
title: 449.序列化和反序列化二叉搜索树
author: Younglina
date: '2022-06-24'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 中等
---

## 题目描述
**[449.序列化和反序列化二叉搜索树](https://leetcode.cn/problems/serialize-and-deserialize-bst/)**   
序列化是将数据结构或对象转换为一系列位的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，以便稍后在同一个或另一个计算机环境中重建。  
设计一个算法来序列化和反序列化 二叉搜索树 。 对序列化/反序列化算法的工作方式没有限制。 您只需确保二叉搜索树可以序列化为字符串，并且可以将该字符串反序列化为最初的二叉搜索树。  
编码的字符串应尽可能紧凑。  

### 示例 1：
```
输入：root = [2,1,3]  
输出：[2,1,3]  
```

### 示例 2：
```
输入：root = []  
输出：[]  
```

:::tip 提示
树中节点数范围是 [0, 104]  
0 <= Node.val <= 104  
题目数据 保证 输入的树是一棵二叉搜索树。  
:::

## 思路
通过前序遍历，序列化二叉搜索树，通过二叉搜索树的性质可知，第一位一定是根元素，比根元素小的一定是左子树，大的一定是右子树  
所以在反序列化时，通过判断是否大于数组第一个元素，来划分左右子数组，在递归时再分别传入
## 题解
```javascript
var serialize = function(root) {
    let res = []
    let dfs = (node) => {
        if(node != null) {
            res.push(node.val)
            dfs(node.left)
            dfs(node.right)
        }
    }
    dfs(root)
    return res.join(",")
};

var deserialize = function(data) {
    if(!data) return null
    let arr = data.split(',').map(i => +i)
    let lArr = [],rArr=[],n=arr[0]
    for(let i=1;i<arr.length;i++){
        if(arr[i]<n) lArr.push(arr[i])
        else rArr.push(arr[i])
    }
    let root = new TreeNode(n)
    root.left = deserialize(lArr.join(','))
    root.right = deserialize(rArr.join(','))
    return root
};
```