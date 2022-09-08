---
title: 143.重排链表
author: Younglina
date: '2022-07-04'
showAccessNumber: true
categories:
 - 算法
tags:
 - 双指针
 - 链表
 - 中等
---

## 题目描述
[143.重排链表](https://leetcode.cn/problems/reorder-list/)    
给定一个单链表 L 的头节点 head ，单链表 L 表示为：      
```
L0 → L1 → … → Ln - 1 → Ln
```
请将其重新排列后变为：  
```
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

### 示例 1：
1->2->3->4  
1->4->2->3  
```
输入：head = [1,2,3,4]  
输出：[1,4,2,3]  
```

### 示例 2：
1->2->3->4->5  
1->5->2->4->3  
```
输入：head = [1,2,3,4,5]  
输出：[1,5,2,4,3]  
```

:::tip 提示 
链表的长度范围为 [1, 5 * 104]  
1 <= node.val <= 1000  
:::

## 思路
需要知道反转链表的知识，![原题](https://leetcode.cn/problems/reverse-linked-list/)  
题意可理解为，将链表后半部反转，然后依次与前半部分拼接  
1. 用快慢指针(l、r)来分割前后两部分，l每次走一步，r每次走两步，当r到达链表尾部时，l就是中间节点  
2. 将l.next赋值给r，此时r就是后半部分的头节点  
3. l.next = null即断开前后两部分，此时让l回到头节点l=head，l就是前半部分的头节点  
4. 将r进行反转，然后依次拼接即可
## 题解
```javascript
var reorderList = function(head) {
    let l = head,r=head
    //获取中点
    while(r && r.next){
        l=l.next
        r=r.next.next
    }
    //获取前后两部分的头节点
    r=l.next
    l.next=null
    l=head
    //反转后半部分链表
    let prev=null,cur=r
    while(cur){
        let next = cur.next
        cur.next=prev
        prev=cur
        cur=next
    }
    r=prev
    //依次拼接
    while(l && r){
        let lnext=l.next,rnext=r.next
        l.next = r
        l=lnext
        r.next=l
        r=rnext
    }
};
```