---
title: 623.在二叉树中增加一行
author: Younglina
date: '2022-06-21'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 中等
---

## 题目描述
**[623.在二叉树中增加一行](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)**  
给定一个二叉树的根 root 和两个整数 val 和 depth ，在给定的深度 depth 处添加一个值为 val 的节点行。  
注意，根节点 root 位于深度 1 。  
加法规则如下:  
给定整数 depth，对于深度为 depth - 1 的每个非空树节点 cur ，创建两个值为 val 的树节点作为 cur 的左子树根和右子树根。  
cur 原来的左子树应该是新的左子树根的左子树。  
cur 原来的右子树应该是新的右子树根的右子树。  
如果 depth == 1 意味着 depth - 1 根本没有深度，那么创建一个树节点，值 val 作为整个原始树的新根，而原始树就是新根的左子树。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/623_1.jpg)

```
输入: root = [4,2,6,3,1,5], val = 1, depth = 2  
输出: [4,1,1,2,null,null,6,3,1,5]  
```

### 示例 2：
![](https://raw.githubusercontent.com/Younglina/images/master/623_2.jpg)
```
输入: root = [4,2,null,3,1], val = 1, depth = 3  
输出:  [4,2,null,1,1,3,null,null,1]  
```

:::tip 提示
节点数在 [1, 104] 范围内  
树的深度在 [1, 104]范围内  
-100 <= Node.val <= 100  
-105 <= val <= 105  
1 <= depth <= the depth of tree + 1  
:::

## 思路
遍历树到`depth`为`1`时，当前节点即为更新节点的节点，左右孩子各增加一个节点。如果当前节点的左右孩子已经有节点，我们就将这些作为新节点的左右节点，并将其作为当前节点的子节点，并结束递归。  

## 题解 迭代
```javascript
var addOneRow = function(root, val, depth) {
    if(depth===1) return new TreeNode(val,root)
    let queue=[root]
    while(queue.length){
        --depth
        let len=queue.length
        for(let i=0;i<len;i++){
            let node = queue.shift()
            if(depth>1){
                node.left && queue.push(node.left)
                node.right && queue.push(node.right)
            }else{
                let nl = new TreeNode(val,node.left),
                nr=new TreeNode(val,null,node.right)
                node.left = nl,node.right=nr
            }
        }
    }
    return root
};
```

## 递归
```javascript
var addOneRow = function(root, val, depth) {
    if(!root) return null
    if(depth===1) return new TreeNode(val, root) 
    if(depth===2) {
        root.left = new TreeNode(val, root.left)
        root.right = new TreeNode(val, null, root.right)
    }
    addOneRow(root.left,val,depth-1)
    addOneRow(root.right,val,depth-1)
    return root
};
```