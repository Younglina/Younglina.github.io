---
title: 200.岛屿数量
author: Younglina
date: '2022-07-07'
showAccessNumber: true
categories:
 - 算法
tags:
 - 矩阵
 - dfs
 - 中等
---

## 题目描述
[200.岛屿数量](https://leetcode.cn/problems/number-of-islands/)  
给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。    
岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。    
此外，你可以假设该网格的四条边均被水包围。  

### 示例 1：
```
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1 
```

### 示例 2：
```
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
```

:::tip 提示
m == grid.length  
n == grid[i].length  
1 <= m, n <= 300  
grid[i][j] 的值为 '0' 或 '1'  
:::

## 思路
两层循环遍历网格，外层循环`x`,内层循环`y`，如果`grid[x][y]`是陆地，且未被访问过(定义一个visied数组)，则递归判断上下左右4个方向是不是也是陆地  
当x,y越界(x<0 || x>=m || y<0 || y>=n)、grid[x][y]不是陆地且被访问过，就可以提前退出递归

## 题解
```javascript
var numIslands = function(grid) {
    let m = grid.length,n=grid[0].length,count=0,
    visied=Array.from({length: m}, ()=>Array(n).fill(false)),
    dirs = [[-1,0],[0,1],[1,0],[0,-1]];
    let dfs = (x, y) => {
        if(x<0 || x>=m || y<0 || y>=n || grid[x][y]==='0' || visied[x][y]) return;
        visied[x][y]=true;
        for(let [dx, dy] of dirs){
            dfs(x+dx,y+dy)
        }
        return
    }

    for(let x=0;x<m;x++){
        for(let y=0;y<n;y++){
            if(grid[x][y]==1 && !visied[x][y]){
                count++;
                dfs(x,y);
            }
        }
    }
    return count
}
```
