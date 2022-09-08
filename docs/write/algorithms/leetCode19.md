---
title: 19. 删除链表的倒数第 N 个结点
author: Younglina
date: '2022-01-05'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 中等
---

## 题目描述
**[19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)**  
给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

进阶：你能尝试使用一趟扫描实现吗？

### 示例 1：

![](https://raw.githubusercontent.com/Younglina/images/master/leetcode19.jpeg)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

### 示例 2：
```
输入：head = [1], n = 1
输出：[]
```

### 示例 3：
```
输入：head = [1,2], n = 1
输出：[1]
```

:::tip 提示
链表中结点的数目为 sz  
1 <= sz <= 30  
0 <= Node.val <= 100  
1 <= n <= sz  
:::

## 思路
使用快慢指针，确定倒数的第`n`个节点，当快指针走的比慢指针多`n`步时，慢指针开始移动
快指针下一个节点为`null`时，结束循环，此时慢指针的下一个指针为需要删掉的节点

## 题解
```javascript
var removeNthFromEnd = function(head, n) {
  const vnode = new ListNode(0, head)
  let i = 1;
  let slow = vnode,fast = vnode.next
  while(fast.next){
    if(i>=n){
      slow = slow.next
    }
    fast = fast.next
    i++
  }
  slow.next = slow.next.next
  return vnode.next
};
```