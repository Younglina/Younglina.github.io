---
title: 40.组合总和II
author: Younglina
date: '2022-07-16'
showAccessNumber: true
categories:
 - 算法
tags:
 - dfs
 - 回溯
 - 中等
---

## 题目描述
[40.组合总和II](https://leetcode.cn/problems/combination-sum-ii/)  
给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。  
candidates 中的每个数字在每个组合中只能使用 一次 。  
注意：解集不能包含重复的组合。   

### 示例 1：
```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

### 示例 2：
```
输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
```

:::tip 提示
1 <= candidates.length <= 100  
1 <= candidates[i] <= 50  
1 <= target <= 30  
:::

## 思路
与[39. 组合总和](https://leetcode.cn/problems/combination-sum/)不同之处在于如何去重，可以先对数组进行排序，使得重复的数字相邻，这样在递归过程中就能能通过判断当前数字是否等于前一个数字来去重。  
如 [1,2,2,3]，当选择了第一个`2`后变成`[1,2]`，由于会进行回溯处理，如果再选第二个`2`，那就还是`[1,2]`此时会存在重复  
所以当遍历的当前下标大于给定的开始下标时，且当前数字与前一个数字相等，则视为重复，直接跳过  
因为排过序了，所以当前数字如果大于`target-sum`那么后面的就肯定都大于，所以可以提前结束遍历  

## 题解
```javascript
var combinationSum2 = function(candidates, target) {
    let res = [],path=[]
    candidates.sort((a,b)=>a-b)
    let dfs = (sum, start) => {
        if(sum>target) return
        if(sum===target) res.push(path.slice())
        for(let i=start;i<candidates.length;i++){
            if(candidates[i]>target-sum) break
            if(i>start && candidates[i]===candidates[i-1]) continue
            path.push(candidates[i])
            dfs(sum+candidates[i], i+1)
            path.pop()
        }
    }
    dfs(0, 0)
    return res
};
```
