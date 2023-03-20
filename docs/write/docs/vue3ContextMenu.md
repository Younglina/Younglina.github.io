---
title: vue3自定义右键菜单组件
author: Younglina
date: '2023-03-20'
categories:
 - 文档
tags:
 - 记录
 - vue3
---

掘金链接：https://juejin.cn/post/7212456518331088952

### 主要逻辑
首先监听标签的右键点击事件，阻止系统的默认行为，然后创建一个自定义的右键菜单，并将其设置为默认聚焦状态，接着监听菜单失焦事件触发关闭菜单。  
效果展示：

![2023-03-20 12.51.30.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/501f33918e934dae8b95eb4d83d502f6~tplv-k3u1fbpfcp-watermark.image?)
### 监听右键点击事件

在标签上监听`@click.right.native`事件;

views/test.vue

```
<script setup>
const showContextMenu = (e) => {
  e.preventDefault()
  console.log('监听右键点击')
}
</script>
<template>
  <div class="context-menu" @click.right.native="showContextMenu($event)">
    展示右键菜单
  </div>
</template>
<style scoped lang="scss">
</style>
```

效果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bea83b3815e49d9b96144db0662fa1a~tplv-k3u1fbpfcp-zoom-1.image)

### 菜单模板

现在，我们已经知道如何触发右键点击事件，并做一些相关的操作了，接下来我们一步步的开始展示自定义菜单模板。先创建模板对应文件

文件格式如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e2dfed923a44079915b7a1a74e1cfbd~tplv-k3u1fbpfcp-zoom-1.image)

index.js: 主要功能是创建菜单、位置计算

```
// 先创建一个简单index.js
import MenuContext from './menu.vue'
const contextMenu = (e, data) => {
    console.log(e, data)
}
export default contextMenu
```

menu.vue: 显示的菜单模板

```
// 先创建一个简单menu组件
<template>
  <div class="context-menu">
    显示的自定义右键菜单
  </div>
</template>
<style>
.context-menu{
    position: fixed;
}
</style>
```


### 挂载菜单

右键点击时，应该计算菜单显示的位置，以避免出现临界情况。例如，如果我们在屏幕的右边界点击右键，如果菜单仍在鼠标的右侧显示，那么我们可能无法看到菜单。因此，在这种情况下，菜单应该在鼠标的左侧显示。

前置知识：vue的`h()`和`render()`;

官网链接：https://cn.vuejs.org/api/render-function.html#h  
`h`就是`createVnode`，是Vue 提供了一个函数用于创建虚拟节点，完整参数签名如下

```
// 第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。
// 第二个参数是要传递的 prop，
// 第三个参数是子节点。
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
)
```

render：用于编程式地创建组件虚拟 DOM 树的函数。

需提供至少两个参数，第一个为需要渲染的虚拟节点，第二个为需要渲染到的容器节点

```
import MenuContext from './ContextMenu'
import { h, render } from 'vue'

const contextMenu = (e, data) => {
    // 创建一个临时的div，用于挂载我们的菜单  
    const container = document.createElement('div')
    // 获取body标签，用于挂载整个菜单
    const appendTo = document.body 
    // 传给组件的props
    const props = {
        ...
    }
    // 渲染虚拟节点
    const vnode = h(
        MenuContext,
        props
    )
    // vnode为需要渲染的虚拟节点，container为渲染的容器
    render(vnode, container)
}
```

可以输出看看，渲染前后各个节点的情况。

vnode：就是我们`menu.vue`组件的相关信息

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/166c48384dbe48fcaf7a01c2e95d2b0d~tplv-k3u1fbpfcp-zoom-1.image)

渲染前的container：就是一个空的div标签

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/952a4ed6b7ba4a4eb2bdfa24f69ab692~tplv-k3u1fbpfcp-zoom-1.image)

渲染后的container：已经挂载了vnode，并能从container上获取相关信息

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fac264de325b426ab5f19ee859588643~tplv-k3u1fbpfcp-zoom-1.image)

在`render`函数执行完以后，我们就已经能获取到虚拟的dom节点了，这时候只要把它挂载到我们想要显示的位置上就好了。

### 位置计算

我们需要获取的数据有：渲染出来的菜单高度和宽度、当前可视区域的高度和宽度、当前点击时相对于浏览器的坐标。

```
// 首先需要先把菜单真正渲染到页面，才能拿到它的宽度和高度
appendTo.appendChild(container.firstElementChild)
// 当前真正的菜单节点，上面输出的vnode中可以看到，el就是我们的菜单节点
const curMenu = vnode.el
// 获取curMenu的高度和宽度，用于临界的计算
const { offsetWidth, offsetHeight } = curMenu 
// 获取body的可视区域的宽度
const { clientWidth } = appendTo 
// 取出右键点击时的坐标，clientX是距离左侧的位置，clientY是距离顶部的位置
const { clientX, clientY } = e

// 当前可视区域的宽度 - 当前鼠标距离浏览器左边的距离 
// 如果 大于菜单的宽度，说明正常设置菜单距离左边界的距离,即设置style.left
// 否则菜单需要在鼠标左侧展示，即需要设置style.right组件距离可视区域右侧的距离
const leftOrRight = clientWidth - clientX > offsetWidth ? "left" : "right"

// 当前浏览器的高度(不包含滚动条) - 当前鼠标距离浏览器上边的距离 
// 如果 大于菜单的高度，说明可以正常设置菜单距离上边界的距离,即设置style.top
// 否则需要设置菜单距离底部边界的位置，即style.bottom
const topOrBottom = window.innerHeight - clientY > offsetHeight ? "top" : "bottom" 

// 设置top或者bottom的style
 curMenu.style[leftOrRight] = leftOrRight === "left" ? `${clientX + 20}px` : `2px`
 
// 设置left或者right的style
 curMenu.style[topOrBottom] = topOrBottom === 'bottom' ? '2px' : `${clientY}px`
```

结果展示

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/286ea2da50264f2980d0001d25389dcc~tplv-k3u1fbpfcp-zoom-1.image)

### 关闭菜单

可以发现上面的结果中，我们展示了三个菜单，实际情况中我们应该在下一次右键时，关闭并卸载上一个菜单。

这里我们可以维护一个菜单实例，在创建菜单前，判断实例是否已经存在了，如果已经存在，先把它卸载。

#### index.js的完整代码：

```
import MenuContext from './menu.vue'
import { h, render } from 'vue'

// 维护一个菜单实例
let curInstance = null
let seed = 1
const contextMenu = (e, data) => {
  if (curInstance) {
    curInstance.destroy()
  }
  curInstance = null
  let id = seed++
  // 创建一个临时的div，用于挂载我们的菜单  
  const container = document.createElement('div')
  // 获取body标签，用于挂载整个菜单
  const appendTo = document.body
  // 传给menu组件的props
  const props = {
    data,
    onClose: () => {
      curInstance.destroy()
    },
  }
  // 渲染虚拟节点
  const vnode = h(
    MenuContext,
    props
  )
  // vnode为需要渲染的虚拟节点，container为渲染的容器
  render(vnode, container)
  // 首先需要先把菜单真正渲染到页面，才能拿到它的宽度和高度
  appendTo.appendChild(container.firstElementChild)
  // 当前真正的菜单节点，上面输出的vnode中可以看到，el就是我们的菜单节点
  const curMenu = vnode.el
  // 获取curMenu的高度和宽度，用于临界的计算
  const { offsetWidth, offsetHeight } = curMenu
  // 获取body的可视区域的宽度
  const { clientWidth } = appendTo
  // 取出右键点击时的坐标，clientX是距离左侧的位置，clientY是距离顶部的位置
  const { clientX, clientY } = e

  // 当前可视区域的宽度 - 当前鼠标距离浏览器左边的距离 
  // 如果 大于菜单的宽度，说明正常设置菜单距离左边界的距离,即设置style.left
  // 否则菜单需要在鼠标左侧展示，即需要设置style.right组件距离可视区域右侧的距离
  const leftOrRight = clientWidth - clientX > offsetWidth ? "left" : "right"

  // 当前浏览器的高度(不包含滚动条) - 当前鼠标距离浏览器上边的距离 
  // 如果 大于菜单的高度，说明可以正常设置菜单距离上边界的距离,即设置style.top
  // 否则需要设置菜单距离底部边界的位置，即style.bottom
  const topOrBottom = window.innerHeight - clientY > offsetHeight ? "top" : "bottom"
  const offsetLeft = Math.abs(clientWidth - clientX)
  // 设置left或者right的style
  curMenu.style[leftOrRight] = leftOrRight === "left" ? `${clientX + 20}px` : `${offsetLeft}px`
  // 设置top或者bottom的style
  curMenu.style[topOrBottom] = topOrBottom === 'bottom' ? '2px' : `${clientY}px`

  const instance = {
    id,
    destroy: () => {
      render(null, container)
    },
  }
  curInstance = instance
  return instance

}

export default contextMenu
```

效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cbe3fb654a843b3bd56363049a651f3~tplv-k3u1fbpfcp-zoom-1.image)

效果实现了，但是这时又发现另一个问题，当切换页面时，菜单没有正常关闭。

### focus和blur

为了解决上面的问题，我们可以在菜单正在挂载以后，使其聚焦，即主动触发`focus`事件，然后监听它的失焦事件`blur`，当失焦时触发props传进来的`destroy`方法。

需要注意的是，要给`div`标签设置`tabindex`属性，否则无法触发`focus`事件。

#### menu.vue完整代码：

```
<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
const props = defineProps({
  data: { default: null },
  onClose: { type: Function, default: () => {} },
});
const showData = computed(() => {
  let data = {},
    pd = props.data;
  if (pd) {
    data.name = pd.name;
    data.id = pd.id;
    data.subname = pd.ar[0].name;
    data.picUrl = pd.al.picUrl;
  }
  return data;
});

// 创建组件ref
const contextMenu = ref(null);
onMounted(async () => {
// 确保组件已经渲染
  await nextTick();
// 触发组件focus
  contextMenu.value.focus();
});

const clickFunc = (type) => {
  props.onClose();
};
const actions = [
  "",
  {
    label: "播放",
    type: "play",
  },
  {
    label: "添加到队列",
    type: "添加到队列",
  },
  "",
  {
    label: "添加到我喜欢的音乐",
    type: "添加到我喜欢的音乐",
  },
  {
    label: "添加到歌单",
    type: "添加到歌单",
  },
  {
    label: "复制链接",
    type: "复制链接",
  },
];
</script>
<template>
  <div
    v-if="showData.name"
    class="context-menu"
    ref="contextMenu"
    @blur="onClose"
    tabindex="-1"
  >
    <div class="context-menu__info">
      <img class="context-menu__img" :src="showData.picUrl" alt="" />
      <div>
        <div class="context-menu__name">
          {{ showData.name }}
        </div>
        <div class="context-menu__subname">
          {{ showData.subname }}
        </div>
      </div>
    </div>
    <div v-for="(item, idx) in actions" :key="idx">
      <div class="divide" v-if="!item" />
      <div v-else class="context-menu__item" @click="clickFunc(item.type)">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.context-menu {
  position: fixed;
  padding: 12px 4px;
  border-radius: 6px;
  border: 1px solid  rgba(222, 222, 222, 0.5);
  background-color:  #ffffff;
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  &:focus {
    outline: none;
  }

  .divide {
    height: 1px;
    background-color:  rgba(222, 222, 222, 0.5);
    margin: 8px auto;
    width: calc(100% - 12px);
  }

  &__item {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      color: #646cff;
      background-color: rgba(100, 108, 255, 0.1);
      border-radius: 6px;
    }
  }

  &__info {
    display: flex;
    padding: 0 12px;
  }

  &__img {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }

  &__name {
    font-size: 16px;
  }

  &__subname {
    color: #666;
    font-size: 12px;
  }
}
</style>
```

#### test.vue完整代码

```
<script setup>
import axios from "axios";
import ContextMenu from "../components/ContextMenu";
const showContextMenu = (e) => {
  e.preventDefault();
  axios
    .get(
      "https://www.fastmock.site/mock/6b16c722604e6f9b79e16f7ec3a768d4/vue3vite/playlist/detail"
    )
    .then((res) => {
      ContextMenu(e, res.data.playlist.tracks[0]);
    });
};
</script>
<template>  
  <div @click.right.native="showContextMenu($event)">
    展示右键菜单
  </div>
  <div style="text-align: right;" @click.right.native="showContextMenu($event)">
    展示右侧边界菜单
  </div>
  <div style="position: absolute;bottom: 0px" @click.right.native="showContextMenu($event)">
    展示底部边界菜单
  </div>
</template>
<style scoped lang="scss"></style>
```

### 最终效果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf4d6c7657204e3e9f2b60eab1c5ae41~tplv-k3u1fbpfcp-zoom-1.image)
