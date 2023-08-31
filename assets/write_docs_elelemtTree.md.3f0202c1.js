import{_ as s,o as n,c as a,h as l}from"./app.f8544706.js";const d=JSON.parse('{"title":"element el-tree 拖拽的使用","description":"","frontmatter":{"title":"element el-tree 拖拽的使用","author":"Younglina","date":"2022-03-15","categories":["文档"],"tags":["记录"]},"headers":[{"level":2,"title":"常规","slug":"常规","link":"#常规","children":[]},{"level":2,"title":"是否能被拖拽、放置","slug":"是否能被拖拽、放置","link":"#是否能被拖拽、放置","children":[]},{"level":2,"title":"设置被拖拽节点样式","slug":"设置被拖拽节点样式","link":"#设置被拖拽节点样式","children":[]},{"level":2,"title":"拖拽时的光标异常","slug":"拖拽时的光标异常","link":"#拖拽时的光标异常","children":[]}],"relativePath":"write/docs/elelemtTree.md","lastUpdated":1662613821000}'),p={name:"write/docs/elelemtTree.md"},e=l(`<p>最近在项目中使用到了element el-tree拖拽的相关功能，记录一下一些使用场景</p><h2 id="常规" tabindex="-1">常规 <a class="header-anchor" href="#常规" aria-hidden="true">#</a></h2><p>设置<code>draggable</code>属性开启拖拽功能</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">el-tree</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">draggable</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  &gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">el-tree</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="是否能被拖拽、放置" tabindex="-1">是否能被拖拽、放置 <a class="header-anchor" href="#是否能被拖拽、放置" aria-hidden="true">#</a></h2><p>通过<code>allowDrop</code>控制能否被放置<br> 通过<code>allowDrag</code>控制能否被拖拽</p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">el-tree</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">draggable</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">:allow-drop</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">allowDrop</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">:allow-drag</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">allowDrag</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  &gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">el-tree</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#676E95;font-style:italic;">/** </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">       * dragNode 对应被拖拽的节点</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">       * dropNode 对应被放置的目标节点</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">       * type 对应 &#39;prev&#39;目标节点上方,&#39;inner&#39;作为目标节点子节点,&#39;next&#39;目标节点下方</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">      */</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">allowDrop</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">dragNode</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dropNode</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//项目中要求我只能同级拖拽，且不能有inner的情况</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dgData</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dragNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">dpData</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dropNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#676E95;font-style:italic;">/** </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">         * level 对应层级，保证同一级</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">         * parentId 对应节点的父节点，保证不能跨父节点同级拖拽</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">         * type 不能是 inner</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        */</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dgData</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">level</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dpData</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">level</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dpData</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">parentId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dgData</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">parentId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">inner</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">//dragNode对应被拖拽的节点</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">allowDrag</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">dragNode</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">dragNode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">notDrag</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h2 id="设置被拖拽节点样式" tabindex="-1">设置被拖拽节点样式 <a class="header-anchor" href="#设置被拖拽节点样式" aria-hidden="true">#</a></h2><p>项目需求是要求我，拖拽时，高亮显示被拖拽的节点，即加背景色、文字色等。<br> 我的做法是，通过监听拖拽开始和拖拽结束的事件，设置当前被拖拽的节点id, 控制节点的样式<br><img src="https://raw.githubusercontent.com/Younglina/images/master/dragNode.png" alt=""></p><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">el-tree</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">draggable</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">@node-drag-start</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dragStart</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">@node-drag-end</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">dragEnd</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">...</span></span>
<span class="line"><span style="color:#89DDFF;">  &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">custom-tree-node</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">slot-scope</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ node, data }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ color: node.data.id===currentId?&#39;#1f5aff&#39;:&#39;&#39; }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">{{node.label}}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">el-tree</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">data</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        currentId</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#FFCB6B;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">dragStart</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">node</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">currentId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">dragEnd</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">currentId</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h2 id="拖拽时的光标异常" tabindex="-1">拖拽时的光标异常 <a class="header-anchor" href="#拖拽时的光标异常" aria-hidden="true">#</a></h2><p>在节点数据过多，有滚动条的情况时，会出现下面这种情况 <img src="https://raw.githubusercontent.com/Younglina/images/master/dragLine.png" alt=""><br> 在查看<a href="https://github.com/ElemeFE/element/blob/dev/packages/tree/src/tree.vue#L413" target="_blank" rel="noreferrer">源码</a>后发现，光标定位的高度并未加上滚动的高度 <img src="https://raw.githubusercontent.com/Younglina/images/master/elTree.png" alt=""><br> 修改后 <img src="https://raw.githubusercontent.com/Younglina/images/master/elTreeC.png" alt=""><br><img src="https://raw.githubusercontent.com/Younglina/images/master/dragLineC.png" alt=""></p>`,12),o=[e];function r(t,c,F,y,D,i){return n(),a("div",null,o)}const u=s(p,[["render",r]]);export{d as __pageData,u as default};
