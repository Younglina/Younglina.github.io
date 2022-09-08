---
title: 数据有序，相同元素保留 `k` 位模版
author: Younglina
date: '2022-02-15'
showAccessNumber: true
categories:
 - 算法
tags:
 - 算法模版
---
:::tip
[参考【宫水三叶】关于「删除有序数组重复项」的通解](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/solution/gong-shui-san-xie-guan-yu-shan-chu-you-x-glnq/)
:::

**这是一种针对「数据有序，相同元素保留 `k` 位」问题更加本质的解法，该解法是从性质出发提炼的，利用了「数组有序 & 保留逻辑」两大主要性质。**

例如：[80. 删除有序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/)

为了让解法更具有一般性，我们将原问题的「保留 2 位」修改为「保留 k 位」。

对于此类问题，我们应该进行如下考虑：

- 由于是保留 k 个相同数字，对于前 k 个数字，我们可以直接保留
- 对于后面的任意数字，能够保留的前提是：与当前写入的位置前面的第 k 个元素进行比较，不相同则保留

举个🌰，我们令 k=2，假设有如下样例. 

[1,1,1,1,1,1,2,2,2,2,2,2,3]

1. 首先我们先让前 2 位直接保留，得到 1,1
2. 对后面的每一位进行继续遍历，能够保留的前提是与当前位置的前面 k 个元素不同（答案中的第一个 1），因此我们会跳过剩余的 1，将第一个 2 追加，得到 1,1,2
3. 继续这个过程，这时候是和答案中的第 2 个 1 进行对比，因此可以得到 1,1,2,2
4. 这时候和答案中的第 1 个 2 比较，只有与其不同的元素能追加到答案，因此剩余的 2 被跳过，3 被追加到答案：1,1,2,2,3.    

```javascript
var solution = function(nums){
  let u = 0, k = 2 //k为需要保留的几位
  for(let x of nums){
    if(u < k || nums[u-k] !== x) nums[u++] = x
  }
  return u
}

```