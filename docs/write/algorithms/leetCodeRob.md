---
title: 打家劫舍I、II、III
author: Younglina
date: '2022-04-29'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 简单
---

## 题目描述
[198.打家劫舍](https://leetcode-cn.com/problems/house-robber/)  
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。  
给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。  

### 示例 1：
```
输入：[1,2,3,1]  
输出：4  
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。  
     偷窃到的最高金额 = 1 + 3 = 4 。  
```

### 示例 2：
```
输入：[2,7,9,3,1]  
输出：12  
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。  
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。  
```

:::tip 提示
1 <= nums.length <= 100  
0 <= nums[i] <= 400  
:::

## 动态规划思路
每个房屋有偷与不偷两种情况，后面房屋偷或者不偷依赖前面房屋的情况。  
1. 确定`dp[i]`的意义  
    表示偷到第`i`个房屋的最大金额
2. 确定`dp[i]`的计算方法  
    - 偷第`i`个房屋，那么`i-1`的房屋就不能偷，所以`dp[i]`应该是偷到第i-2个房屋的最大值即`dp[i-2]`加上第`i`个房屋的金额  
        `dp[i] = nums[i] + dp[i-2]`
    - 不偷第`i`个房屋，那么`dp[i]`就是前`i-1`个房屋的最大值即`dp[i-1]`  
        `dp[i] = dp[i-1]`
    - `dp[i]`的意义为，偷第`i`个房屋的最大金额，所以  
        `dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])`
3. 确定`dp[0]`的初始值  
    dp[0]是0个房屋的最大金额，那么应该就是0，dp[1]是一个房屋的最大金额，那么应该就是nums[0]  
    dp[0] = 0, dp[1] = nums[0]

## 题解
```javascript
var rob = function(nums) {
    let len=nums.length+1,dp = Array(len+1).fill(0);
    dp[0] = 0;
    dp[1] = nums[0];
    for(let i=2;i<len;i++){
        dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i-1]); // 因为dp[0]没有计算房屋，所以i是从1开始的，这里就是i-1
    }
    return dp[len];
}
```
## 优化空间
可以看出`dp[i]`只与`dp[i-1]`和`dp[i-2]`有关，所以可以用两个变量交替存储每次的计算值  
prev = 0, cur = nums[0],每次计算，cur等于当前的最大值, prev等于cur，相当于上一次的最大值  
```javascript
var rob = function(nums) {
    let len=nums.length+1,
    [prev, cur] = [0, nums[0]];
    for(let i=2;i<len;i++){
        [prev, cur] = [cur, Math.max(prev, cur+nums[i-1])];
    }
    return cur;
}
```

## 213.打家劫舍II
[213.打家劫舍II](https://leetcode-cn.com/problems/house-robber-ii/)  
你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 `围成一圈` ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。  
给定一个代表每个房屋存放金额的非负整数数组，计算你 `在不触动警报装置的情况下` ，今晚能够偷窃到的最高金额。  

### 示例 1：
```
输入：nums = [2,3,2]  
输出：3  
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。  
```

### 示例 2：
```
输入：nums = [1,2,3,1]   
输出：4  
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。  
     偷窃到的最高金额 = 1 + 3 = 4 。  
```

### 示例 3：
```
输入：nums = [1,2,3]  
输出：3  
```

## 动态规划思路
与1不同的是，这里首尾也是类似相邻，两个不能同时偷，所以为了方便计算，可以把房屋分成两部分，一部分不包含尾部，一部分不包含首部   
如：[1,2,3,1]，分成[1,2,3]和[2,3,1]，然后使用`打家劫舍I`的计算方式，分别计算两部分能偷到的最大值，最后返回两者中较大的那个  

## 题解
``` javascript
var rob = function(nums) {
    let len = nums.length
    if(len===1) return nums[0]
    if(len===2) return Math.max(...nums)
    const getDp=(l,r)=>{
        if(l===r) return nums[l]
        // let dp =Array(r).fill(0)
        // dp[l] = nums[l]
        // dp[l+1] = Math.max(nums[l],nums[l+1])
        // for(let i=l+2;i<r;i++){
        //     dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i])
        // }
        let [p,c] = [nums[l],Math.max(nums[l],nums[l+1])]
        for(let i=l+2;i<r;i++){
            [p,c] = [c,Math.max(c, p+nums[i])]
        }
        return c
    }
    let dp1 = getDp(0, len-1) // 不考虑尾部
    let dp2 = getDp(1, len) // 不考虑首部
    return Math.max(dp1,dp2)
};
```

## 337.打家劫舍III
[337.打家劫舍III](https://leetcode-cn.com/problems/house-robber-iii/)  

小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。  
除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。  
给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。  

### 示例 1：
![](https://raw.githubusercontent.com/Younglina/images/master/rob1-tree.jpeg)
```
输入: root = [3,2,3,null,3,null,1]  
输出: 7   
解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7  
```

### 示例 2：
![](https://raw.githubusercontent.com/Younglina/images/master/rob2-tree.jpeg)
```
输入: root = [3,4,5,1,3,null,1]  
输出: 9  
解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9  
```

## 动态规划思路
与前两题不同的是，结构变成了树，偷的情况变成了，偷了当前节点的话，左右子节点就不能偷了，所以需要确定遍历树的顺序为后序遍历，  
在遍历的途中确定当前节点偷与不偷的情况，后序遍历函数可以返回一个数组，下标0表示当前节点不偷的最大金额，1表示偷的  
- 偷了当前节点，则左右节点不能偷 `rotCur = cur.val + left[0] + right[0]`
- 不偷当前节点，则取左右节点偷与不偷的较大值相加 `notRotCur = Math.max(left[0],left[1]) + Math.max(right[0], right[1])`

## 题解
```javascript
var rob = function(root) {
    const postOrder = (node) => {
        if(!node) return [0,0]
        const left = postOrder(node.left)
        const right = postOrder(node.right)
        const robCur = node.val + left[0] + right[0]
        const notRobcur = Math.max(left[0],left[1])+Math.max(right[0],right[1])
        //后序遍历，0是不偷当前，1是偷
        return [notRobcur, robCur]
    }
    return Math.max(...postOrder(root))
}
```