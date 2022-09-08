---
title: 304.二维区域和检索 - 矩阵不可变
author: Younglina
date: '2022-07-18'
showAccessNumber: true
categories:
 - 算法
tags:
 - 前缀和
 - 中等
---

## 题目描述
[304.二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable/)  
给定一个二维矩阵 matrix，以下类型的多个请求：  
- 计算其子矩形范围内元素的总和，该子矩阵的 左上角 为 (row1, col1) ，右下角 为 (row2, col2)  

实现 NumMatrix 类：  
- NumMatrix(int[][] matrix) 给定整数矩阵 matrix 进行初始化  
- int sumRegion(int row1, int col1, int row2, int col2) 返回 左上角 (row1, col1) 、右下角 (row2, col2) 所描述的子矩阵的元素 总和 。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/304.png)
```
输入: 
["NumMatrix","sumRegion","sumRegion","sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]
输出: 
[null, 8, 11, 12]

解释:
NumMatrix numMatrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (红色矩形框的元素总和)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (绿色矩形框的元素总和)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (蓝色矩形框的元素总和)
```

## 二位数组前缀和
定义 `sum[i][j]` 为以`i,j`为右下角，`0,0`为左上角的矩形区域的元素总和。  
`sum[i][j]` 的计算方法为：
![](https://raw.githubusercontent.com/Younglina/images/master/304_1.jpg)  
`i-1,j`的和加上`i,j-1`的和减去公共的`i-1,j-1`再加上`matrix[i][j]`的小方块的和。
所以公式为  
`sum[i][j] = sum[i-1][j] + sum[i][j-1] - sum[i-1][j-1] + matrix[i][j]`  
因为前缀和是以`0,0`为左上角，所以计算矩形区域和的公式为  
以[2,1,3,4]为例  
![](https://raw.githubusercontent.com/Younglina/images/master/304_2.jpg)  
以`2,1`为左上角，`3,4`为右下角的矩形区域的元素总和为  
`sum[3][4]-sum[1][4]-sum[3][0]+sum[1][0]`  
这里的sum都是以`0,0`为左上角的  

## 题解
```javascript
var NumMatrix = function(matrix) {
    let m=matrix.length,n=matrix[0].length,
    sum = Array.from({length: m+1}, ()=>Array(n+1).fill(0))
    for(let i=1;i<=m;i++){
        for(let j=1;j<=n;j++){
            sum[i][j] = sum[i-1][j] + sum[i][j-1]-sum[i-1][j-1]+matrix[i-1][j-1] //i,j从1开始，所以减一
        }
    }
    this.sum = sum
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    let sum = this.sum
    row1++, col1++, row2++, col2++
    return sum[row2][col2] - sum[row1 - 1][col2] - sum[row2][col1 - 1] + sum[row1 - 1][col1 - 1]
};
```
