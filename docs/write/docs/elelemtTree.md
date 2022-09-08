---
title: element el-tree 拖拽的使用
author: Younglina
date: '2022-03-15'
categories:
 - 文档
tags:
 - 记录
---

最近在项目中使用到了element el-tree拖拽的相关功能，记录一下一些使用场景

## 常规
设置`draggable`属性开启拖拽功能
```html
<el-tree
  ...
  draggable
  ...
  >
</el-tree>
```

## 是否能被拖拽、放置
通过`allowDrop`控制能否被放置  
通过`allowDrag`控制能否被拖拽
```html
<el-tree
  ...
  draggable
  :allow-drop="allowDrop"
  :allow-drag="allowDrag"
  ...
  >
</el-tree>
<script>
  export default{
    methods: {
      /** 
       * dragNode 对应被拖拽的节点
       * dropNode 对应被放置的目标节点
       * type 对应 'prev'目标节点上方,'inner'作为目标节点子节点,'next'目标节点下方
      */
      allowDrop(dragNode, dropNode, type){
        //项目中要求我只能同级拖拽，且不能有inner的情况
        const dgData = dragNode.data,dpData = dropNode.data
        /** 
         * level 对应层级，保证同一级
         * parentId 对应节点的父节点，保证不能跨父节点同级拖拽
         * type 不能是 inner
        */
        return dgData.level === dpData.level && dpData.parentId === dgData.parentId && type !== 'inner'
      },
      //dragNode对应被拖拽的节点
      allowDrag(dragNode){
        return dragNode.data.name !== 'notDrag'
      }
    }
  }
</script>
```

## 设置被拖拽节点样式
项目需求是要求我，拖拽时，高亮显示被拖拽的节点，即加背景色、文字色等。  
我的做法是，通过监听拖拽开始和拖拽结束的事件，设置当前被拖拽的节点id, 控制节点的样式  
![](https://raw.githubusercontent.com/Younglina/images/master/dragNode.png)
```html
<el-tree
  ...
  draggable
  @node-drag-start="dragStart"
  @node-drag-end="dragEnd"
  ...
  >
   <div class="custom-tree-node" slot-scope="{ node, data }">
     <span :style="{ color: node.data.id===currentId?'#1f5aff':'' }">{{node.label}}</span>
   </div>
</el-tree>
<script>
  export default{
    data(){
      return {
        currentId: ''
      }
    },
    methods: {
      dragStart(node){
        this.currentId = node.data.id
      },
      dragEnd(){
        this.currentId = ''
      }
    }
  }
</script>
```

## 拖拽时的光标异常
在节点数据过多，有滚动条的情况时，会出现下面这种情况
![](https://raw.githubusercontent.com/Younglina/images/master/dragLine.png)  
在查看[源码](https://github.com/ElemeFE/element/blob/dev/packages/tree/src/tree.vue#L413)后发现，光标定位的高度并未加上滚动的高度
![](https://raw.githubusercontent.com/Younglina/images/master/elTree.png)  
修改后
![](https://raw.githubusercontent.com/Younglina/images/master/elTreeC.png)  
![](https://raw.githubusercontent.com/Younglina/images/master/dragLineC.png)  
