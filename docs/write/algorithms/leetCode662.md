---
title: 662.二叉树最大宽度
author: Younglina
date: '2022-06-20'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 中等
---

## 题目描述
[662.二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/)  
给定一个二叉树，编写一个函数来获取这个树的最大宽度。树的宽度是所有层中的最大宽度。这个二叉树与满二叉树（full binary tree）结构相同，但一些节点为空。  
每一层的宽度被定义为两个端点（该层最左和最右的非空节点，两端点间的null节点也计入长度）之间的长度。  

### 示例 1：

```
输入: 

           1  
         /   \  
        3     2  
       / \     \  
      5   3     9  

输出: 4  
解释: 最大值出现在树的第 3 层，宽度为 4 (5,3,null,9)。  
```

### 示例 2：
```
输入: 

          1  
         /    
        3    
       / \       
      5   3     

输出: 2  
解释: 最大值出现在树的第 3 层，宽度为 2 (5,3)。  
```

### 示例 3：

```
输入: 

          1  
         / \  
        3   2   
       /        
      5      

输出: 2  
解释: 最大值出现在树的第 2 层，宽度为 2 (3,2)。  
```

### 示例 4：

```
输入: 
          1  
         / \  
        3   2  
       /     \   
      5       9   
     /         \  
    6           7  
输出: 8  
解释: 最大值出现在树的第 4 层，宽度为 8 (6,null,null,null,null,null,null,7)。  
```

:::tip 提示
注意: 答案在32位有符号整数的表示范围内。  
:::

## 思路
通过层序遍历，从左到右给每个节点进行编号，队列中存储当前节点的左右节点，编号的计算，因为空子树也算一个位置，所以左子树的编号为2\*idx，右子树为2\*idx+1
因为层级可能很大，所以用bigint来存储编号。  

## 题解
```javascript
var widthOfBinaryTree = function(root) {
    let res = 0n,queue=[[root,0n]],l=0n,r=0n
    while(queue.length){
        l=queue[0][1],len=queue.length
        for(let i=0;i<len;i++){
            let [node, idx] = queue.shift()
            r=idx
            node.left && queue.push([node.left, idx*2n])
            node.right && queue.push([node.right, idx*2n+1n])
        }
        //Math.max 返回number不能复制给bigint
        res = res>r-l+1n?res:r-l+1n
    }
    return res
};
```