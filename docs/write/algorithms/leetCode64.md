---
title: 64.最小路径和
author: Younglina
date: '2022-04-20'
showAccessNumber: true
categories:
 - 算法
tags:
 - 动态规划
 - 中等
---

## 题目描述

**[64.最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)**  
给定一个包含非负整数的 `m x n` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。  
**说明：每次只能向下或者向右移动一步。** 
### 示例 1：

| 1  |   3   |   1   |
| ---- | ---- | ---- |
|   1   |   5   |   1   |
|   4   |   2   |   1   |


```
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]    
输出：7    
解释：因为路径 1→3→1→1→1 的总和最小。  
```

### 示例 2：

```
输入：grid = [[1,2,3],[4,5,6]]  
输出：12  
```

:::tip 提示
m == grid.length  
n == grid[i].length  
1 <= m, n <= 200  
0 <= grid[i][j] <= 100  
:::

## 思路
动态规划：
由题意可知到右下角，只能从上面或者左边来，所以最小值就是取上面或者左边的最小值，然后加上当前值。  
即动态转移方程为： `dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]`  
第一行和第一列的数据，可以直接赋值，因为不能从上面或者左边来。  
第一行的等于左边的加上当前值，第一列的等于上面的加上当前值。   


| 1  |   3+1=4   |   1+4=5   |
| ---- | ---- | ---- |
|   1+1=2   |   5+min(4,2)=7   |   1+min(5,7)=6   |
|   4+2=6   |   2+min(7,6)=8   |   1+mid(6,8)=7   |


## 题解
```javascript
var uniquePathsWithObstacles = function(grid) {
    let m = grid.length,n=grid[0].length
    for(let i=1;i<m;i++){
        grid[0][i] += grid[0][i-1]
    }  
    for(let j=1;j<n;j++){
        grid[j][0] += grid[j-1][0]
    }  
    for(let i=1;i<n;i++){
        for(let j=1;j<m;j++){
            grid[i][j] += Math.min(grid[i-1][j],grid[i][j-1])
        }
    }
    return grid[n-1][m-1]
};
```

<style>
.path-table tr,
.path-table td {
    width: 80px;
    height: 80px;
    text-align: center;
}

.path-table tr:nth-child(2n) {
    background-color: unset;
}
</style>