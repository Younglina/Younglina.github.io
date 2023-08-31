import{_ as s,o as n,c as a,h as e}from"./app.f8544706.js";const d=JSON.parse('{"title":"LRU缓存","description":"","frontmatter":{"date":"2022-10-13","title":"LRU缓存","author":"Younglina","categories":["算法"],"tags":["记录","LRU缓存"]},"headers":[{"level":2,"title":"题目描述","slug":"题目描述","link":"#题目描述","children":[{"level":3,"title":"示例：","slug":"示例","link":"#示例","children":[]},{"level":3,"title":"题解","slug":"题解","link":"#题解","children":[]}]}],"relativePath":"write/docs/LRUCache.md","lastUpdated":1665644931000}'),l={name:"write/docs/LRUCache.md"},p=e(`<p><code>LRU</code>是<code>Least Recently Used</code>的缩写，即最近最少使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 <code>t</code> 值最大的，即最近最少使用的页面予以淘汰。</p><h2 id="题目描述" tabindex="-1">题目描述 <a class="header-anchor" href="#题目描述" aria-hidden="true">#</a></h2><p><a href="https://leetcode.cn/problems/lru-cache/" target="_blank" rel="noreferrer">146. LRU 缓存</a><br> 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。<br> 实现 LRUCache 类：<br> LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存<br> int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。<br> void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。</p><h3 id="示例" tabindex="-1">示例： <a class="header-anchor" href="#示例" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入</span></span>
<span class="line"><span style="color:#A6ACCD;">[&quot;LRUCache&quot;, &quot;put&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;put&quot;, &quot;get&quot;, &quot;get&quot;, &quot;get&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]</span></span>
<span class="line"><span style="color:#A6ACCD;">输出</span></span>
<span class="line"><span style="color:#A6ACCD;">[null, null, null, 1, null, -1, null, -1, 3, 4]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">解释</span></span>
<span class="line"><span style="color:#A6ACCD;">LRUCache lRUCache = new LRUCache(2);</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.put(1, 1); // 缓存是 {1=1}</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.get(1);    // 返回 1</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.get(2);    // 返回 -1 (未找到)</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.get(1);    // 返回 -1 (未找到)</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.get(3);    // 返回 3</span></span>
<span class="line"><span style="color:#A6ACCD;">lRUCache.get(4);    // 返回 4</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-hidden="true">#</a></h3><p>使用<code>Map</code>进行缓存，因为<code>Map</code>的key是按照<code>set</code>的顺序排列的，用<code>Object</code>的话需要配合数组</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">class LRUCache {</span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor(capacity){</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.capacity = capacity</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.cache = new Map()</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  get(key){</span></span>
<span class="line"><span style="color:#A6ACCD;">    let c = this.cache</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(!c.has(key)) return -1</span></span>
<span class="line"><span style="color:#A6ACCD;">    let val = c.get(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    c.delete(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    c.set(key, val)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return val</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  set(key, val){</span></span>
<span class="line"><span style="color:#A6ACCD;">    let c = this.cache</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(c.has(key)) c.delete(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    c.set(key, val)</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(c.size &gt; this.capacity){</span></span>
<span class="line"><span style="color:#A6ACCD;">      c.delete(c.keys().next().value)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,8),c=[p];function r(t,i,o,C,u,b){return n(),a("div",null,c)}const y=s(l,[["render",r]]);export{d as __pageData,y as default};
