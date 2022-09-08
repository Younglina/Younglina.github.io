---
title: 148.排序链表
author: Younglina
date: '2022-07-06'
showAccessNumber: true
categories:
 - 算法
tags:
 - 链表
 - 分治
 - 中等
---

## 题目描述
**[148.排序链表](https://leetcode.cn/problems/sort-list/)**   
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。  

### 示例 1：
输入：4->2->1->3
输出：1->2->3->4
```
输入：head = [4,2,1,3]  
输出：[1,2,3,4]  
```

### 示例 2：
输入：-1->5->3->4->0  
输出：-1->0->3->4->5  
```
输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]
```

### 示例 2：
```
输入：head = []  
输出：[]  
```

:::tip 提示
链表中节点的数目在范围 [0, 5 * 104] 内  
-105 <= Node.val <= 105  
:::
进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？  

## 思路
一个链表进行排序有点难想，但如果是合并两个有序链表，那就比较简单  
所以可以递归的将链表进行前后分割，然后将前后两部分进行排序，最后再合并  
递归到最后只有一个结点（有序），于是在递归出栈时，判断的是两个节点的大小，排序以后出栈。  
合并后的结果返回给父调用，最后递归结束时，所有节点就都排序好了。  
![](https://raw.githubusercontent.com/Younglina/images/master/128.png)  

## 题解
```javascript
var sortList = function(head) {
    if(!head || !head.next) return head
    let slow=head,fast=head,prev
    //使用快慢指针进行前后分割
    while(fast && fast.next){
        prev=slow
        slow = slow.next
        fast=fast.next.next
    }
    prev.next = null
    let l = sortList(head),r = sortList(slow)
    return mergeList(l,r)
};

let mergeList = (l,r)=>{
    let vnode = new ListNode(0),cur=vnode
    while(l && r){
        if(l.val<r.val){
            cur.next = l
            l = l.next
        }else{
            cur.next = r
            r = r.next
        }
        cur = cur.next
    }
    if(l) cur.next = l
    if(r) cur.next = r
    //返回排序后的链表
    return vnode.next
}
```