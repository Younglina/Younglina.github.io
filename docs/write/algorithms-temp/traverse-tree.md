---
title: 树的前中后序遍历
author: Younglina
date: '2022-02-25'
showAccessNumber: true
categories:
 - 算法
tags:
 - 算法模版
---
给你一棵二叉树的根节点 `root` ，返回其节点值的 前中后序遍历  

## 迭代
![](https://raw.githubusercontent.com/Younglina/images/master/preorder.png)  
### [144.二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)
前序遍历是：根左右  
1. 先取值，节点入栈
2. 然后取左节点，重复1 
3. 当没有左节点了，出栈，取右节点重复1 
res = [], stack = []
1. 取`A`节点值 res = ['A'], `A`入栈 stack = ['A']
2. 取`A`节点左子节点`B` res = ['A','B'], `B`入栈 stack = ['A','B']
3. 取`B`节点左子节点`D` res = ['A','B','D'], `D`入栈 stack = ['A','B','D']
4. `D`没有左子节点了，`D`出栈 stack=['A','B'],取`D`右节点
5. `D`右节点为空，`B`出栈 取`B`右节点`E` stack=['A','E'],
6. 取`E`节点值 res = ['A','B','D','E'], stack=['A']，`E`右节点为空，`A`出栈， stack = [] 取`A`右节点`C`
7. 取`C`节点值 res = ['A','B','D','E','C'], `C`入栈 stack = ['C']
8. `C`节点左子节点为空，`C`出栈取`C`右节点`F` res = ['A','B','D','E','C','F'], `F`入栈 stack = ['F']
9. `F`节点左子节点为空，`F`出栈取`F`右节点还是空, stack=[]
10. 结束  


|  出入栈   | res  | stack | 当前节点 |  
|  ----  | ----  | ----  | ----  |  
| A入栈 | [A] |  [A] |  B  | 
| B入栈 | [A,B] | [A,B] | D  | 
| D入栈 | [A,B,D] | [A,B,D] | ''  | 
| D出栈 | [A,B,D] | [A,B] | ''  | 
| B出栈 | [A,B,D] |  [A] | E  | 
| E入栈 | [A,B,D,E] | [A,E] | ''  | 
| E出栈 | [A,B,D,E] | [A] | ''  | 
| A出栈 | [A,B,D,E] | [] | A  | 
| C入栈 | [A,B,D,E,C] | [C] | C  | 
| C出栈 | [A,B,D,E,C] | [] | F  | 
| F入栈 | [A,B,D,E,C,F] | [F] | ''  | 
| F出栈 | [A,B,D,E,C,F] | [] | 结束 |

```javascript
var preorder = function(root){
  let res = [], stack = []
  while(root || stack.length){
    while(root){
      res.push(root.val)
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root = root.right
  }
  return res
}
```
![](https://raw.githubusercontent.com/Younglina/images/master/inorder.png)  

### [94.二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)
```javascript
var inorder = function(root){
  let res = [], stack = []
  while(root || stack.length){
    while(root){
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    res.push(root.val)
    root.right
  }
  return res
}
```
![](https://raw.githubusercontent.com/Younglina/images/master/postorder.png)

### [145.二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)
后序遍历和前序遍历代码基本差不多，只不过后续先遍历右节点，然后`unshift`值
```javascript
var postorder = function(root){
  let res = [], stack = []
  while(root || stack.length){
    while(root){
      res.unshift(root.val)
      stack.push(root)
      root = root.right
    }
    root = stack.pop()
    root = root.left
  }
  return res
}
```
## 递归
递归的前中后代码基本一样，只是取值的位置换一下
```javascript
var preorder = function(root){
    if(!root) return []
    const res = []
    const loop = function(root){
        // res.push(root.val) 前序在这
        if(root.left) loop(root.left)
        // res.push(root.val) 中序在这
        if(root.right) loop(root.right)
        // res.push(root.val) 后序在这
    }
    loop(root)
    return res
}
```
