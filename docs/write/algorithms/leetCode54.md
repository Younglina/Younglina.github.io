---
title: 54.螺旋矩阵
author: Younglina
date: '2022-06-10'
showAccessNumber: true
categories:
 - 算法
tags:
 - 回溯
 - 中等
---

## 题目描述
[54.螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)  
给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/54-1.jpg)
```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]  
输出：[1,2,3,6,9,8,7,4,5]  
```

### 示例 2：
![](https://raw.githubusercontent.com/Younglina/images/master/54-2.jpg)
```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]  
输出：[1,2,3,4,8,12,11,10,9,5,6,7]  
```

:::tip 提示
m == matrix.length  
n == matrix[i].length  
1 <= m, n <= 10  
-100 <= matrix[i][j] <= 100  
:::

## 思路
走的方向是右，下，左，上进行循环，然后可以对走过的位置进行标记，当下一步越界或者是已经标记过的，就转弯。  
定义`dirs = [[0,1],[1,0],[0,-1],[-1,0]]`为走的方向，d为当前方向，通过`(1+d)%4`确定方向。  
定义`x,y`为当前坐标，`nx,ny`为下一步，`nx=x+dirs[d][0],ny=y+dirs[d][1]`，  
当`nx,ny`越界或者`matrix[nx][ny]`已经标记过，就转弯，即`d=(1+d)%4`，此时需要对`nx,ny`重新赋一次值。  

## 题解
```javascript
var spiralOrder = function(matrix) {
    let res = [],m=matrix.length,n=matrix[0].length
    let dirs = [[0,1],[1,0],[0,-1],[-1,0]]
    for(let x=0,y=0,d=0,i=0;i<m*n;i++){
        res.push(matrix[x][y])
        matrix[x][y]='x'
        let nx = x+dirs[d][0],ny=y+dirs[d][1]
        if(nx<0||nx>=m||ny<0||ny>=n||matrix[nx][ny]==='x'){
            d=(1+d)%4
            nx = x+dirs[d][0],ny=y+dirs[d][1]
        }
        [x,y]=[nx,ny]
    }
    return res
};
```