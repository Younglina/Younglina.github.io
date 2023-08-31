import{_ as s,o as a,c as n,h as l}from"./app.f8544706.js";const D=JSON.parse('{"title":"1208.尽可能使字符串相等","description":"","frontmatter":{"title":"1208.尽可能使字符串相等","author":"Younglina","date":"2022-02-24","showAccessNumber":true,"categories":["算法"],"tags":["滑动窗口","中等"]},"headers":[{"level":2,"title":"题目描述","slug":"题目描述","link":"#题目描述","children":[{"level":3,"title":"示例 1：","slug":"示例-1","link":"#示例-1","children":[]},{"level":3,"title":"示例 2：","slug":"示例-2","link":"#示例-2","children":[]},{"level":3,"title":"示例 3：","slug":"示例-3","link":"#示例-3","children":[]}]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"题解","slug":"题解","link":"#题解","children":[]}],"relativePath":"write/algorithms/leetCode1208.md","lastUpdated":1662613821000}'),e={name:"write/algorithms/leetCode1208.md"},p=l(`<h2 id="题目描述" tabindex="-1">题目描述 <a class="header-anchor" href="#题目描述" aria-hidden="true">#</a></h2><p><a href="https://leetcode-cn.com/problems/get-equal-substrings-within-budget/" target="_blank" rel="noreferrer">1208.尽可能使字符串相等</a><br> 给你两个长度相同的字符串，<code>s</code> 和 <code>t</code>。</p><p>将 <code>s</code> 中的第 <code>i</code> 个字符变到 t 中的第 <code>i</code> 个字符需要 <code>|s[i] - t[i]|</code> 的开销（开销可能为 0），也就是两个字符的 <code>ASCII</code> 码值的差的绝对值。</p><p>用于变更字符串的最大预算是 <code>maxCost</code>。在转化字符串时，总开销应当小于等于该预算，这也意味着字符串的转化可能是不完全的。</p><p>如果你可以将 <code>s</code> 的子字符串转化为它在 <code>t</code> 中对应的子字符串，则返回可以转化的最大长度。</p><p>如果 <code>s</code> 中没有子字符串可以转化成 <code>t</code> 中对应的子字符串，则返回 <code>0</code>。</p><h3 id="示例-1" tabindex="-1">示例 1： <a class="header-anchor" href="#示例-1" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：s = &quot;abcd&quot;, t = &quot;bcdf&quot;, maxCost = 3  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：3  </span></span>
<span class="line"><span style="color:#A6ACCD;">解释：s 中的 &quot;abc&quot; 可以变为 &quot;bcd&quot;。开销为 3，所以最大长度为 3。  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="示例-2" tabindex="-1">示例 2： <a class="header-anchor" href="#示例-2" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：s = &quot;abcd&quot;, t = &quot;cdef&quot;, maxCost = 3  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：1  </span></span>
<span class="line"><span style="color:#A6ACCD;">解释：s 中的任一字符要想变成 t 中对应的字符，其开销都是 2。因此，最大长度为 1。  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="示例-3" tabindex="-1">示例 3： <a class="header-anchor" href="#示例-3" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：s = &quot;abcd&quot;, t = &quot;acde&quot;, maxCost = 0  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：1  </span></span>
<span class="line"><span style="color:#A6ACCD;">解释：a -&gt; a, cost = 0，字符串未发生变化，所以最大长度为 1。  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p>1 &lt;= s.length, t.length &lt;= 10^5<br> 0 &lt;= maxCost &lt;= 10^6<br> s 和 t 都只含小写英文字母。</p></div><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-hidden="true">#</a></h2><p>滑动窗口，维护两个指针 <code>l,r</code>为滑动窗口的左右边界，<code>diff</code>为<code>s[r]-t[r]</code>对应字符串的差值，<code>c</code>为<code>diff</code>的总和，为了决定如何移动指针。</p><ol><li>遍历字符串累加<code>diff</code>至<code>c</code></li><li>当<code>c&gt;maxCost</code>时，需要缩小滑动窗口左边界<code>l</code>，且<code>c</code>需要减去<code>s,t</code>所在<code>l</code>对应的字符串的<code>diff</code>值</li><li>记录最大值为<code>r-l+1</code></li></ol><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-hidden="true">#</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight has-diff" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> equalSubstring </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">s</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">t</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">maxCost</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">len</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">diff</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">len</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">diff</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">abs</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">r</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">charCodeAt</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">t</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">r</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">charCodeAt</span><span style="color:#F07178;">())</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">+=</span><span style="color:#A6ACCD;">diff</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">maxCost</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">c</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">abs</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">s</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">l</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">charCodeAt</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">t</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">l</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">charCodeAt</span><span style="color:#F07178;">())</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Math</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">max</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">   </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,18),o=[p];function c(t,r,i,d,y,F){return a(),n("div",null,o)}const A=s(e,[["render",c]]);export{D as __pageData,A as default};