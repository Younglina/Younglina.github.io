---
title: 108.将有序数组转换为二叉搜索树
author: Younglina
date: '2022-06-29'
showAccessNumber: true
categories:
 - 算法
tags:
 - 树
 - 中等
---

## 题目描述
[108.将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)  
给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。  
高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。  

### 示例 1：

```
输入: [-10,-3,0,5,9]
输出: 
           0  
         /   \  
        -3    9  
       /     /  
     -10    5  

输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案
```

### 示例 2：
```
输入: [1,3]
输出: 

          1  
         /    
        3      

输入：nums = [1,3]
输出：[3,1]
解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。
```

:::tip 提示
1 <= nums.length <= 104  
-104 <= nums[i] <= 104  
nums 按 严格递增 顺序排列  
:::

## 思路1
通过BST的性质可知，BST的中序遍历为有序数组。所以题意可理解为，根据中序遍历的序列还原BST。还有个附加条件为高度平衡，所以可每次取序列中间的元素作为根节点，左边的元素作为左子树，右边的元素作为右子树。依次递归。  

## 题解
```javascript
var sortedArrayToBST = function(nums) {
    let dfs = (s,e) => {
        if(s>e) return null
        let mid = Math.floor((s+e)/2)
        let root = new TreeNode(nums[mid])
        root.left = dfs(s,mid-1)
        root.right = dfs(mid+1,e)
        return root
    }
    return dfs(0,nums.length-1)
}
```

## 思路2
[思路来源](https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree/solution/shou-hua-tu-jie-san-chong-jie-fa-jie-zhu-shu-zu-ku/)
通过思路一可知，BST的中序遍历为所提供的数组，所以可以在递归中根据中序遍历的方法依次构建左根右节点，定义一个下标依次取出节点值  
用二分后的左链，递归构建左子树，然后用 下标 创建节点，接上创建好的左子树，再用右链构建右子树，再接上。  
递归中会不断进行二分，直到无法划分就返回 null，即来到递归树的底部  
下标对应的数据创建完结点后，下标就后移，锁定出下一个要构建的节点值……  

## 题解
```javascript
var lowestCommonAncestor = function(root, p, q) {
    if(!root || root===p || root===q) return root
    let l = lowestCommonAncestor(root.left,p,q)
    let r = lowestCommonAncestor(root.right,p,q)
    if(!l || !r) return l || r
    return root
};
```