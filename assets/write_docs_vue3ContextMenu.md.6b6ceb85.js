import{_ as s,o as n,c as a,h as l}from"./app.f8544706.js";const m=JSON.parse('{"title":"vue3自定义右键菜单组件","description":"","frontmatter":{"title":"vue3自定义右键菜单组件","author":"Younglina","date":"2023-03-20","categories":["文档"],"tags":["记录","vue3"]},"headers":[{"level":3,"title":"主要逻辑","slug":"主要逻辑","link":"#主要逻辑","children":[]},{"level":3,"title":"监听右键点击事件","slug":"监听右键点击事件","link":"#监听右键点击事件","children":[]},{"level":3,"title":"菜单模板","slug":"菜单模板","link":"#菜单模板","children":[]},{"level":3,"title":"挂载菜单","slug":"挂载菜单","link":"#挂载菜单","children":[]},{"level":3,"title":"位置计算","slug":"位置计算","link":"#位置计算","children":[]},{"level":3,"title":"关闭菜单","slug":"关闭菜单","link":"#关闭菜单","children":[{"level":4,"title":"index.js的完整代码：","slug":"index-js的完整代码","link":"#index-js的完整代码","children":[]}]},{"level":3,"title":"focus和blur","slug":"focus和blur","link":"#focus和blur","children":[{"level":4,"title":"menu.vue完整代码：","slug":"menu-vue完整代码","link":"#menu-vue完整代码","children":[]},{"level":4,"title":"test.vue完整代码","slug":"test-vue完整代码","link":"#test-vue完整代码","children":[]}]},{"level":3,"title":"最终效果","slug":"最终效果","link":"#最终效果","children":[]}],"relativePath":"write/docs/vue3ContextMenu.md","lastUpdated":1679289558000}'),p={name:"write/docs/vue3ContextMenu.md"},e=l(`<p>掘金链接：<a href="https://juejin.cn/post/7212456518331088952" target="_blank" rel="noreferrer">https://juejin.cn/post/7212456518331088952</a></p><h3 id="主要逻辑" tabindex="-1">主要逻辑 <a class="header-anchor" href="#主要逻辑" aria-hidden="true">#</a></h3><p>首先监听标签的右键点击事件，阻止系统的默认行为，然后创建一个自定义的右键菜单，并将其设置为默认聚焦状态，接着监听菜单失焦事件触发关闭菜单。<br> 效果展示：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/501f33918e934dae8b95eb4d83d502f6~tplv-k3u1fbpfcp-watermark.image?" alt="2023-03-20 12.51.30.gif"></p><h3 id="监听右键点击事件" tabindex="-1">监听右键点击事件 <a class="header-anchor" href="#监听右键点击事件" aria-hidden="true">#</a></h3><p>在标签上监听<code>@click.right.native</code>事件;</p><p>views/test.vue</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">const showContextMenu = (e) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  e.preventDefault()</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&#39;监听右键点击&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;context-menu&quot; @click.right.native=&quot;showContextMenu($event)&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    展示右键菜单</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style scoped lang=&quot;scss&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>效果</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bea83b3815e49d9b96144db0662fa1a~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="菜单模板" tabindex="-1">菜单模板 <a class="header-anchor" href="#菜单模板" aria-hidden="true">#</a></h3><p>现在，我们已经知道如何触发右键点击事件，并做一些相关的操作了，接下来我们一步步的开始展示自定义菜单模板。先创建模板对应文件</p><p>文件格式如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e2dfed923a44079915b7a1a74e1cfbd~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>index.js: 主要功能是创建菜单、位置计算</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// 先创建一个简单index.js</span></span>
<span class="line"><span style="color:#A6ACCD;">import MenuContext from &#39;./menu.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const contextMenu = (e, data) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(e, data)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">export default contextMenu</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>menu.vue: 显示的菜单模板</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// 先创建一个简单menu组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;context-menu&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    显示的自定义右键菜单</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.context-menu{</span></span>
<span class="line"><span style="color:#A6ACCD;">    position: fixed;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="挂载菜单" tabindex="-1">挂载菜单 <a class="header-anchor" href="#挂载菜单" aria-hidden="true">#</a></h3><p>右键点击时，应该计算菜单显示的位置，以避免出现临界情况。例如，如果我们在屏幕的右边界点击右键，如果菜单仍在鼠标的右侧显示，那么我们可能无法看到菜单。因此，在这种情况下，菜单应该在鼠标的左侧显示。</p><p>前置知识：vue的<code>h()</code>和<code>render()</code>;</p><p>官网链接：<a href="https://cn.vuejs.org/api/render-function.html#h" target="_blank" rel="noreferrer">https://cn.vuejs.org/api/render-function.html#h</a><br><code>h</code>就是<code>createVnode</code>，是Vue 提供了一个函数用于创建虚拟节点，完整参数签名如下</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// 第一个参数既可以是一个字符串 (用于原生元素) 也可以是一个 Vue 组件定义。</span></span>
<span class="line"><span style="color:#A6ACCD;">// 第二个参数是要传递的 prop，</span></span>
<span class="line"><span style="color:#A6ACCD;">// 第三个参数是子节点。</span></span>
<span class="line"><span style="color:#A6ACCD;">function h(</span></span>
<span class="line"><span style="color:#A6ACCD;">  type: string | Component,</span></span>
<span class="line"><span style="color:#A6ACCD;">  props?: object | null,</span></span>
<span class="line"><span style="color:#A6ACCD;">  children?: Children | Slot | Slots</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>render：用于编程式地创建组件虚拟 DOM 树的函数。</p><p>需提供至少两个参数，第一个为需要渲染的虚拟节点，第二个为需要渲染到的容器节点</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import MenuContext from &#39;./ContextMenu&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { h, render } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const contextMenu = (e, data) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 创建一个临时的div，用于挂载我们的菜单  </span></span>
<span class="line"><span style="color:#A6ACCD;">    const container = document.createElement(&#39;div&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 获取body标签，用于挂载整个菜单</span></span>
<span class="line"><span style="color:#A6ACCD;">    const appendTo = document.body </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 传给组件的props</span></span>
<span class="line"><span style="color:#A6ACCD;">    const props = {</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 渲染虚拟节点</span></span>
<span class="line"><span style="color:#A6ACCD;">    const vnode = h(</span></span>
<span class="line"><span style="color:#A6ACCD;">        MenuContext,</span></span>
<span class="line"><span style="color:#A6ACCD;">        props</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">    // vnode为需要渲染的虚拟节点，container为渲染的容器</span></span>
<span class="line"><span style="color:#A6ACCD;">    render(vnode, container)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>可以输出看看，渲染前后各个节点的情况。</p><p>vnode：就是我们<code>menu.vue</code>组件的相关信息</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/166c48384dbe48fcaf7a01c2e95d2b0d~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>渲染前的container：就是一个空的div标签</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/952a4ed6b7ba4a4eb2bdfa24f69ab692~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>渲染后的container：已经挂载了vnode，并能从container上获取相关信息</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fac264de325b426ab5f19ee859588643~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>在<code>render</code>函数执行完以后，我们就已经能获取到虚拟的dom节点了，这时候只要把它挂载到我们想要显示的位置上就好了。</p><h3 id="位置计算" tabindex="-1">位置计算 <a class="header-anchor" href="#位置计算" aria-hidden="true">#</a></h3><p>我们需要获取的数据有：渲染出来的菜单高度和宽度、当前可视区域的高度和宽度、当前点击时相对于浏览器的坐标。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// 首先需要先把菜单真正渲染到页面，才能拿到它的宽度和高度</span></span>
<span class="line"><span style="color:#A6ACCD;">appendTo.appendChild(container.firstElementChild)</span></span>
<span class="line"><span style="color:#A6ACCD;">// 当前真正的菜单节点，上面输出的vnode中可以看到，el就是我们的菜单节点</span></span>
<span class="line"><span style="color:#A6ACCD;">const curMenu = vnode.el</span></span>
<span class="line"><span style="color:#A6ACCD;">// 获取curMenu的高度和宽度，用于临界的计算</span></span>
<span class="line"><span style="color:#A6ACCD;">const { offsetWidth, offsetHeight } = curMenu </span></span>
<span class="line"><span style="color:#A6ACCD;">// 获取body的可视区域的宽度</span></span>
<span class="line"><span style="color:#A6ACCD;">const { clientWidth } = appendTo </span></span>
<span class="line"><span style="color:#A6ACCD;">// 取出右键点击时的坐标，clientX是距离左侧的位置，clientY是距离顶部的位置</span></span>
<span class="line"><span style="color:#A6ACCD;">const { clientX, clientY } = e</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 当前可视区域的宽度 - 当前鼠标距离浏览器左边的距离 </span></span>
<span class="line"><span style="color:#A6ACCD;">// 如果 大于菜单的宽度，说明正常设置菜单距离左边界的距离,即设置style.left</span></span>
<span class="line"><span style="color:#A6ACCD;">// 否则菜单需要在鼠标左侧展示，即需要设置style.right组件距离可视区域右侧的距离</span></span>
<span class="line"><span style="color:#A6ACCD;">const leftOrRight = clientWidth - clientX &gt; offsetWidth ? &quot;left&quot; : &quot;right&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 当前浏览器的高度(不包含滚动条) - 当前鼠标距离浏览器上边的距离 </span></span>
<span class="line"><span style="color:#A6ACCD;">// 如果 大于菜单的高度，说明可以正常设置菜单距离上边界的距离,即设置style.top</span></span>
<span class="line"><span style="color:#A6ACCD;">// 否则需要设置菜单距离底部边界的位置，即style.bottom</span></span>
<span class="line"><span style="color:#A6ACCD;">const topOrBottom = window.innerHeight - clientY &gt; offsetHeight ? &quot;top&quot; : &quot;bottom&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 设置top或者bottom的style</span></span>
<span class="line"><span style="color:#A6ACCD;"> curMenu.style[leftOrRight] = leftOrRight === &quot;left&quot; ? \`\${clientX + 20}px\` : \`2px\`</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">// 设置left或者right的style</span></span>
<span class="line"><span style="color:#A6ACCD;"> curMenu.style[topOrBottom] = topOrBottom === &#39;bottom&#39; ? &#39;2px&#39; : \`\${clientY}px\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>结果展示</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/286ea2da50264f2980d0001d25389dcc~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="关闭菜单" tabindex="-1">关闭菜单 <a class="header-anchor" href="#关闭菜单" aria-hidden="true">#</a></h3><p>可以发现上面的结果中，我们展示了三个菜单，实际情况中我们应该在下一次右键时，关闭并卸载上一个菜单。</p><p>这里我们可以维护一个菜单实例，在创建菜单前，判断实例是否已经存在了，如果已经存在，先把它卸载。</p><h4 id="index-js的完整代码" tabindex="-1">index.js的完整代码： <a class="header-anchor" href="#index-js的完整代码" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import MenuContext from &#39;./menu.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { h, render } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 维护一个菜单实例</span></span>
<span class="line"><span style="color:#A6ACCD;">let curInstance = null</span></span>
<span class="line"><span style="color:#A6ACCD;">let seed = 1</span></span>
<span class="line"><span style="color:#A6ACCD;">const contextMenu = (e, data) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (curInstance) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    curInstance.destroy()</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  curInstance = null</span></span>
<span class="line"><span style="color:#A6ACCD;">  let id = seed++</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 创建一个临时的div，用于挂载我们的菜单  </span></span>
<span class="line"><span style="color:#A6ACCD;">  const container = document.createElement(&#39;div&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 获取body标签，用于挂载整个菜单</span></span>
<span class="line"><span style="color:#A6ACCD;">  const appendTo = document.body</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 传给menu组件的props</span></span>
<span class="line"><span style="color:#A6ACCD;">  const props = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    data,</span></span>
<span class="line"><span style="color:#A6ACCD;">    onClose: () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      curInstance.destroy()</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 渲染虚拟节点</span></span>
<span class="line"><span style="color:#A6ACCD;">  const vnode = h(</span></span>
<span class="line"><span style="color:#A6ACCD;">    MenuContext,</span></span>
<span class="line"><span style="color:#A6ACCD;">    props</span></span>
<span class="line"><span style="color:#A6ACCD;">  )</span></span>
<span class="line"><span style="color:#A6ACCD;">  // vnode为需要渲染的虚拟节点，container为渲染的容器</span></span>
<span class="line"><span style="color:#A6ACCD;">  render(vnode, container)</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 首先需要先把菜单真正渲染到页面，才能拿到它的宽度和高度</span></span>
<span class="line"><span style="color:#A6ACCD;">  appendTo.appendChild(container.firstElementChild)</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 当前真正的菜单节点，上面输出的vnode中可以看到，el就是我们的菜单节点</span></span>
<span class="line"><span style="color:#A6ACCD;">  const curMenu = vnode.el</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 获取curMenu的高度和宽度，用于临界的计算</span></span>
<span class="line"><span style="color:#A6ACCD;">  const { offsetWidth, offsetHeight } = curMenu</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 获取body的可视区域的宽度</span></span>
<span class="line"><span style="color:#A6ACCD;">  const { clientWidth } = appendTo</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 取出右键点击时的坐标，clientX是距离左侧的位置，clientY是距离顶部的位置</span></span>
<span class="line"><span style="color:#A6ACCD;">  const { clientX, clientY } = e</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 当前可视区域的宽度 - 当前鼠标距离浏览器左边的距离 </span></span>
<span class="line"><span style="color:#A6ACCD;">  // 如果 大于菜单的宽度，说明正常设置菜单距离左边界的距离,即设置style.left</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 否则菜单需要在鼠标左侧展示，即需要设置style.right组件距离可视区域右侧的距离</span></span>
<span class="line"><span style="color:#A6ACCD;">  const leftOrRight = clientWidth - clientX &gt; offsetWidth ? &quot;left&quot; : &quot;right&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 当前浏览器的高度(不包含滚动条) - 当前鼠标距离浏览器上边的距离 </span></span>
<span class="line"><span style="color:#A6ACCD;">  // 如果 大于菜单的高度，说明可以正常设置菜单距离上边界的距离,即设置style.top</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 否则需要设置菜单距离底部边界的位置，即style.bottom</span></span>
<span class="line"><span style="color:#A6ACCD;">  const topOrBottom = window.innerHeight - clientY &gt; offsetHeight ? &quot;top&quot; : &quot;bottom&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const offsetLeft = Math.abs(clientWidth - clientX)</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 设置left或者right的style</span></span>
<span class="line"><span style="color:#A6ACCD;">  curMenu.style[leftOrRight] = leftOrRight === &quot;left&quot; ? \`\${clientX + 20}px\` : \`\${offsetLeft}px\`</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 设置top或者bottom的style</span></span>
<span class="line"><span style="color:#A6ACCD;">  curMenu.style[topOrBottom] = topOrBottom === &#39;bottom&#39; ? &#39;2px&#39; : \`\${clientY}px\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  const instance = {</span></span>
<span class="line"><span style="color:#A6ACCD;">    id,</span></span>
<span class="line"><span style="color:#A6ACCD;">    destroy: () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      render(null, container)</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  curInstance = instance</span></span>
<span class="line"><span style="color:#A6ACCD;">  return instance</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default contextMenu</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br></div></div><p>效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cbe3fb654a843b3bd56363049a651f3~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><p>效果实现了，但是这时又发现另一个问题，当切换页面时，菜单没有正常关闭。</p><h3 id="focus和blur" tabindex="-1">focus和blur <a class="header-anchor" href="#focus和blur" aria-hidden="true">#</a></h3><p>为了解决上面的问题，我们可以在菜单正在挂载以后，使其聚焦，即主动触发<code>focus</code>事件，然后监听它的失焦事件<code>blur</code>，当失焦时触发props传进来的<code>destroy</code>方法。</p><p>需要注意的是，要给<code>div</code>标签设置<code>tabindex</code>属性，否则无法触发<code>focus</code>事件。</p><h4 id="menu-vue完整代码" tabindex="-1">menu.vue完整代码： <a class="header-anchor" href="#menu-vue完整代码" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { computed, onMounted, ref, nextTick } from &quot;vue&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">const props = defineProps({</span></span>
<span class="line"><span style="color:#A6ACCD;">  data: { default: null },</span></span>
<span class="line"><span style="color:#A6ACCD;">  onClose: { type: Function, default: () =&gt; {} },</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;">const showData = computed(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let data = {},</span></span>
<span class="line"><span style="color:#A6ACCD;">    pd = props.data;</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (pd) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    data.name = pd.name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    data.id = pd.id;</span></span>
<span class="line"><span style="color:#A6ACCD;">    data.subname = pd.ar[0].name;</span></span>
<span class="line"><span style="color:#A6ACCD;">    data.picUrl = pd.al.picUrl;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return data;</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 创建组件ref</span></span>
<span class="line"><span style="color:#A6ACCD;">const contextMenu = ref(null);</span></span>
<span class="line"><span style="color:#A6ACCD;">onMounted(async () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">// 确保组件已经渲染</span></span>
<span class="line"><span style="color:#A6ACCD;">  await nextTick();</span></span>
<span class="line"><span style="color:#A6ACCD;">// 触发组件focus</span></span>
<span class="line"><span style="color:#A6ACCD;">  contextMenu.value.focus();</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const clickFunc = (type) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  props.onClose();</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">const actions = [</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  {</span></span>
<span class="line"><span style="color:#A6ACCD;">    label: &quot;播放&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: &quot;play&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  {</span></span>
<span class="line"><span style="color:#A6ACCD;">    label: &quot;添加到队列&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: &quot;添加到队列&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  {</span></span>
<span class="line"><span style="color:#A6ACCD;">    label: &quot;添加到我喜欢的音乐&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: &quot;添加到我喜欢的音乐&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  {</span></span>
<span class="line"><span style="color:#A6ACCD;">    label: &quot;添加到歌单&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: &quot;添加到歌单&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  {</span></span>
<span class="line"><span style="color:#A6ACCD;">    label: &quot;复制链接&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: &quot;复制链接&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">];</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div</span></span>
<span class="line"><span style="color:#A6ACCD;">    v-if=&quot;showData.name&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class=&quot;context-menu&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ref=&quot;contextMenu&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    @blur=&quot;onClose&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    tabindex=&quot;-1&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;context-menu__info&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;img class=&quot;context-menu__img&quot; :src=&quot;showData.picUrl&quot; alt=&quot;&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;div class=&quot;context-menu__name&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          {{ showData.name }}</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;div class=&quot;context-menu__subname&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">          {{ showData.subname }}</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div v-for=&quot;(item, idx) in actions&quot; :key=&quot;idx&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div class=&quot;divide&quot; v-if=&quot;!item&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;div v-else class=&quot;context-menu__item&quot; @click=&quot;clickFunc(item.type)&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        {{ item.label }}</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style scoped lang=&quot;scss&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.context-menu {</span></span>
<span class="line"><span style="color:#A6ACCD;">  position: fixed;</span></span>
<span class="line"><span style="color:#A6ACCD;">  padding: 12px 4px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  border-radius: 6px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  border: 1px solid  rgba(222, 222, 222, 0.5);</span></span>
<span class="line"><span style="color:#A6ACCD;">  background-color:  #ffffff;</span></span>
<span class="line"><span style="color:#A6ACCD;">  font-size: 14px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  font-weight: 500;</span></span>
<span class="line"><span style="color:#A6ACCD;">  user-select: none;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &amp;:focus {</span></span>
<span class="line"><span style="color:#A6ACCD;">    outline: none;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  .divide {</span></span>
<span class="line"><span style="color:#A6ACCD;">    height: 1px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    background-color:  rgba(222, 222, 222, 0.5);</span></span>
<span class="line"><span style="color:#A6ACCD;">    margin: 8px auto;</span></span>
<span class="line"><span style="color:#A6ACCD;">    width: calc(100% - 12px);</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  &amp;__item {</span></span>
<span class="line"><span style="color:#A6ACCD;">    padding: 8px 12px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    cursor: pointer;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    &amp;:hover {</span></span>
<span class="line"><span style="color:#A6ACCD;">      color: #646cff;</span></span>
<span class="line"><span style="color:#A6ACCD;">      background-color: rgba(100, 108, 255, 0.1);</span></span>
<span class="line"><span style="color:#A6ACCD;">      border-radius: 6px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  &amp;__info {</span></span>
<span class="line"><span style="color:#A6ACCD;">    display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">    padding: 0 12px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  &amp;__img {</span></span>
<span class="line"><span style="color:#A6ACCD;">    width: 36px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    height: 36px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    margin-right: 6px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  &amp;__name {</span></span>
<span class="line"><span style="color:#A6ACCD;">    font-size: 16px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  &amp;__subname {</span></span>
<span class="line"><span style="color:#A6ACCD;">    color: #666;</span></span>
<span class="line"><span style="color:#A6ACCD;">    font-size: 12px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br></div></div><h4 id="test-vue完整代码" tabindex="-1">test.vue完整代码 <a class="header-anchor" href="#test-vue完整代码" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import axios from &quot;axios&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import ContextMenu from &quot;../components/ContextMenu&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">const showContextMenu = (e) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  e.preventDefault();</span></span>
<span class="line"><span style="color:#A6ACCD;">  axios</span></span>
<span class="line"><span style="color:#A6ACCD;">    .get(</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;https://www.fastmock.site/mock/6b16c722604e6f9b79e16f7ec3a768d4/vue3vite/playlist/detail&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">    .then((res) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      ContextMenu(e, res.data.playlist.tracks[0]);</span></span>
<span class="line"><span style="color:#A6ACCD;">    });</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;  </span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div @click.right.native=&quot;showContextMenu($event)&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    展示右键菜单</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div style=&quot;text-align: right;&quot; @click.right.native=&quot;showContextMenu($event)&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    展示右侧边界菜单</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div style=&quot;position: absolute;bottom: 0px&quot; @click.right.native=&quot;showContextMenu($event)&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    展示底部边界菜单</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style scoped lang=&quot;scss&quot;&gt;&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="最终效果" tabindex="-1">最终效果 <a class="header-anchor" href="#最终效果" aria-hidden="true">#</a></h3><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf4d6c7657204e3e9f2b60eab1c5ae41~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p>`,56),c=[e];function r(t,o,i,b,u,C){return n(),a("div",null,c)}const y=s(p,[["render",r]]);export{m as __pageData,y as default};
