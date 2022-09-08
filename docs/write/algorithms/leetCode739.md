---
title: 739.每日温度
author: Younglina
date: '2022-06-17'
showAccessNumber: true
categories:
 - 算法
tags:
 - 栈
 - 中等
---

## 题目描述
[739.每日温度](https://leetcode.cn/problems/daily-temperatures/)  
给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指在第 i 天之后，才会有更高的温度。如果气温在这之后都不会升高，请在该位置用 0 来代替。  

### 示例 1：
```
输入: temperatures = [73,74,75,71,69,72,76,73]  
输出: [1,1,4,2,1,1,0,0]  
```

### 示例 2：
```
输入: temperatures = [30,40,50,60]  
输出: [1,1,1,0]  
```

### 示例 3：
```
输入: temperatures = [30,60,90]  
输出: [1,1,0]  
```

:::tip 提示
1 <= temperatures.length <= 105  
30 <= temperatures[i] <= 100  
:::

## 思路
创建一个单调栈`stack`，存储当前数组下标，一个`res`数组记录结果  
遍历数组，当前下标记做`i`，将当前元素`t[i]`依次与栈顶对应的元素`t[stack.at(-1)]`进行比较  
如果严格大于，则直接取出栈顶，则`res[stack.at(-1)]=i-stack.pop()`  
将当前下标入栈`stack.push(i)`
如 [73,74,75,71,69,72,76,73]  
stack初始化[0]，res初始化Array(arr.length).fill(0)  
i=1时，t[i]=74 大于 t[stack.at(-1)]=t[0]=73，res[0]=i-stack.pop()=1-0，res=[1], 此时 stack = [1]  
i=2时，t[i]=75 大于 t[stack.at(-1)]=t[1]=74，res[1]=2-1，res=[1,1] 此时 stack = [2]  
i=3时，t[i]=71 小于 t[stack.at(-1)]=t[2]=75，此时 stack = [2，3]  
i=4时，t[i]=69 小于 t[stack.at(-1)]=t[3]=71，此时 stack = [2，3，4]  
i=5时，t[i]=72 大于 t[stack.at(-1)]=t[4]=69，res[4]=5-4，res=[1,1,0,0,1] 此时 stack = [2，3]  
此时栈不为空，继续判断t[i]=72是否大于t[stack.at(-1)]=t[3]=71，res[3]=5-3，res=[1,1,0,2,1] 此时 stack = [2]
以此类推  

## 题解

```javascript
var dailyTemperatures = function(t) {
    let len=t.length,stack = [0],res=Array(len).fill(0)
    for(let i=1;i<len;i++){
        while(stack.length && t[i]>t[stack.at(-1)]){
            let top = stack.pop()
            res[top] = i - top
        }
        stack.push(i)
    }
    return res
};
```