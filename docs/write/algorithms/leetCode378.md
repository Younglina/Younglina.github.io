---
title: 378.有序矩阵中第 K 小的元素
author: Younglina
date: '2022-07-20'
showAccessNumber: true
categories:
 - 算法
tags:
 - 二分
 - 中等
---

## 题目描述
[378.有序矩阵中第 K 小的元素](https://leetcode-cn.com/problems/symmetric-tree/)  
给你一个 `n x n` 矩阵 `matrix` ，其中每行和每列元素均按升序排序，找到矩阵中第 `k` 小的元素。  
请注意，它是 `排序后` 的第 k 小元素，而不是第 k 个 不同 的元素。  
你必须找到一个内存复杂度优于 O(n2) 的解决方案。  

### 示例 1：
```
输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8  
输出：13  
解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13  
```

### 示例 2：
```
输入：matrix = [[-5]], k = 1  
输出：-5  
```

:::tip 提示
n == matrix.length  
n == matrix[i].length  
1 <= n <= 300  
-109 <= matrix[i][j] <= 109  
题目数据 保证 matrix 中的所有行和列都按 非递减顺序 排列  
1 <= k <= n2  
:::

## 二分
由题可知，matrix[0][0]是最小值，matrix[n-1][n-1]是最大值。所需找到的第Ｋ小元素必定在这个区间内。  
`有序　＋　确定范围`所以可以使用二分查找  
记`l=matrix[0][0]`，`r=matrix[n-1][n-1]`，`mid=Math.floor(l+r)/2`，  
记`row`为行号从0开始，`col`为列号从最后一列n-1开始，寻找数组中小于等于`mid`的元素个数记为`cnt`，  
- `matrix[row][col]<=mid`,说明有`col+1`个小于等于`mid`的元素，所以`cnt+=col+1`，且`row+1`从下一行继续判断  
- 否则`matrix[row][col]>mid`,因为列从上到下递增，所以`col`得前进一列，即`col-1`  
得出的cnt，如果大于`k`说明小于等于`mid`的元素个数多于`k`，所以`r=mid-1`，否则`l=mid+1`，最后l,r一定会加一或者减一成数组中的一个符合条件的数  

## 题解
```javascript
var kthSmallest = function(matrix, k) {
    let len = matrix.length,
        l = matrix[0][0],
        r = matrix[len-1][len-1],
        mid;
    let getCnt = (mid) => {
        let row=0,col=len-1,cnt=0;
        while(row<len && col>=0){
            if(matrix[row][col]<=mid){
                cnt+=col+1;
                row++;
            }else{
                col--;
            }
        }
        return cnt
    }

    while(l<=r){
        mid = Math.floor((l+r)/2)
        let cnt = getCnt(mid)
        if(cnt < k){
            l=mid+1
        }else{
            r=mid-1
        }
    }
    return l
}
```
