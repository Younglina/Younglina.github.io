import{_ as s,o as n,c as a,h as l}from"./app.f8544706.js";const A=JSON.parse('{"title":"143.重排链表","description":"","frontmatter":{"title":"143.重排链表","author":"Younglina","date":"2022-07-04","showAccessNumber":true,"categories":["算法"],"tags":["双指针","链表","中等"]},"headers":[{"level":2,"title":"题目描述","slug":"题目描述","link":"#题目描述","children":[{"level":3,"title":"示例 1：","slug":"示例-1","link":"#示例-1","children":[]},{"level":3,"title":"示例 2：","slug":"示例-2","link":"#示例-2","children":[]}]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"题解","slug":"题解","link":"#题解","children":[]}],"relativePath":"write/algorithms/leetCode143.md","lastUpdated":1662613821000}'),p={name:"write/algorithms/leetCode143.md"},e=l(`<h2 id="题目描述" tabindex="-1">题目描述 <a class="header-anchor" href="#题目描述" aria-hidden="true">#</a></h2><p><a href="https://leetcode.cn/problems/reorder-list/" target="_blank" rel="noreferrer">143.重排链表</a><br> 给定一个单链表 L 的头节点 head ，单链表 L 表示为：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">L0 → L1 → … → Ln - 1 → Ln</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>请将其重新排列后变为：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="示例-1" tabindex="-1">示例 1： <a class="header-anchor" href="#示例-1" aria-hidden="true">#</a></h3><p>1-&gt;2-&gt;3-&gt;4<br> 1-&gt;4-&gt;2-&gt;3</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：head = [1,2,3,4]  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：[1,4,2,3]  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="示例-2" tabindex="-1">示例 2： <a class="header-anchor" href="#示例-2" aria-hidden="true">#</a></h3><p>1-&gt;2-&gt;3-&gt;4-&gt;5<br> 1-&gt;5-&gt;2-&gt;4-&gt;3</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：head = [1,2,3,4,5]  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：[1,5,2,4,3]  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p>链表的长度范围为 [1, 5 * 104]<br> 1 &lt;= node.val &lt;= 1000</p></div><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-hidden="true">#</a></h2><p>需要知道反转链表的知识，<img src="https://leetcode.cn/problems/reverse-linked-list/" alt="原题"><br> 题意可理解为，将链表后半部反转，然后依次与前半部分拼接</p><ol><li>用快慢指针(l、r)来分割前后两部分，l每次走一步，r每次走两步，当r到达链表尾部时，l就是中间节点</li><li>将l.next赋值给r，此时r就是后半部分的头节点</li><li>l.next = null即断开前后两部分，此时让l回到头节点l=head，l就是前半部分的头节点</li><li>将r进行反转，然后依次拼接即可</li></ol><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-hidden="true">#</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> reorderList </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">head</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">l</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">head</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">head</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//获取中点</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">r</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//获取前后两部分的头节点</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">=null</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">head</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//反转后半部分链表</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prev</span><span style="color:#89DDFF;">=null,</span><span style="color:#A6ACCD;">cur</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">r</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">cur</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">cur</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">cur</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">prev</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">prev</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">cur</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">cur</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">prev</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//依次拼接</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">l</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">r</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">lnext</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">rnext</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">r</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">lnext</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">l</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">rnext</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div>`,17),o=[e];function r(t,c,i,y,D,C){return n(),a("div",null,o)}const b=s(p,[["render",r]]);export{A as __pageData,b as default};
