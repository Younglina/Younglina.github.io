import{_ as s,o as n,c as a,h as p}from"./app.f8544706.js";const A=JSON.parse('{"title":"only-allow","description":"","frontmatter":{"title":"only-allow","author":"Younglina","date":"2021-12-09","categories":["源码阅读"],"tags":["学习"]},"headers":[{"level":2,"title":"原理","slug":"原理","link":"#原理","children":[]},{"level":2,"title":"process.argv","slug":"process-argv","link":"#process-argv","children":[]},{"level":2,"title":"npm_config_user_agent","slug":"npm-config-user-agent","link":"#npm-config-user-agent","children":[{"level":3,"title":"npm","slug":"npm","link":"#npm","children":[]},{"level":3,"title":"yarn","slug":"yarn","link":"#yarn","children":[]},{"level":3,"title":"pnpm","slug":"pnpm","link":"#pnpm","children":[]}]},{"level":2,"title":"which-pm-runs","slug":"which-pm-runs","link":"#which-pm-runs","children":[]}],"relativePath":"write/sourceRead/only-allow.md","lastUpdated":1662613821000}'),l={name:"write/sourceRead/only-allow.md"},o=p(`<h2 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-hidden="true">#</a></h2><p>使用npm生命周期钩子preinstall，在用户进行包下载时，执行package.json中对应的命令<code>&quot;preinstall&quot;: &quot;npx only-allow pnpm&quot;</code>，通过process.argv.slice(2)获取启动 Node.js 进程时传入的命令行参数限制的包管理器与p<wbr>rocess.env.npm_config_user_agent进行对比匹配，不匹配直接输出信息并退出程序 ​</p><h2 id="process-argv" tabindex="-1">process.argv <a class="header-anchor" href="#process-argv" aria-hidden="true">#</a></h2><p>返回数组，其中包含启动 Node.js 进程时传入的命令行参数。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">//以如下方式启动 Node.js 进程：</span></span>
<span class="line"><span style="color:#A6ACCD;">node process</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js one two</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">three four</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//将生成输出：</span></span>
<span class="line"><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">usr</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">local</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">bin</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">node </span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">Users</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">mjr</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">work</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js </span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">: one </span></span>
<span class="line"><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">: two</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">three </span></span>
<span class="line"><span style="color:#F78C6C;">4</span><span style="color:#A6ACCD;">: four</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>所以 npx only-allow pnpm 对应的 process.argv.slice(2) 就是 pnpm ​</p><h2 id="npm-config-user-agent" tabindex="-1">npm_config_user_agent <a class="header-anchor" href="#npm-config-user-agent" aria-hidden="true">#</a></h2><p>通过源码可以发现在获取了规定的包管理器以后会与p<wbr>rocess.env.npm_config_user_agent这个字段进行匹配， 在nodejs源码中搜索发现它的定义如下</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">user-agent</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">default</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">npm/{npm-version} </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span></span>
<span class="line"><span style="color:#A6ACCD;">           </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">node/{node-version} </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span></span>
<span class="line"><span style="color:#A6ACCD;">           </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{platform} </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span></span>
<span class="line"><span style="color:#A6ACCD;">           </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{arch} </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span></span>
<span class="line"><span style="color:#A6ACCD;">           </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">workspaces/{workspaces} </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span></span>
<span class="line"><span style="color:#A6ACCD;">           </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{ci}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> String</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">    Sets the User-Agent request header.  The following fields are replaced</span></span>
<span class="line"><span style="color:#C3E88D;">    with their actual counterparts:</span></span>
<span class="line"><span style="color:#C3E88D;">    * </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">{npm-version}</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> - The npm version in use</span></span>
<span class="line"><span style="color:#C3E88D;">    * </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">{node-version}</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> - The Node.js version in use</span></span>
<span class="line"><span style="color:#C3E88D;">    * </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">{platform}</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> - The value of </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">process.platform</span><span style="color:#A6ACCD;">\\\`</span></span>
<span class="line"><span style="color:#C3E88D;">    * </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">{arch}</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> - The value of </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">process.arch</span><span style="color:#A6ACCD;">\\\`</span></span>
<span class="line"><span style="color:#C3E88D;">    * </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">{workspaces}</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> - Set to </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">true</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> if the </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">workspaces</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> or </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">workspace</span><span style="color:#A6ACCD;">\\\`</span></span>
<span class="line"><span style="color:#C3E88D;">      options are set.</span></span>
<span class="line"><span style="color:#C3E88D;">    * </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">{ci}</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> - The value of the </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">ci-name</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> config, if set, prefixed with</span></span>
<span class="line"><span style="color:#C3E88D;">      </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">ci/</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">, or an empty string if </span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;">ci-name</span><span style="color:#A6ACCD;">\\\`</span><span style="color:#C3E88D;"> is empty.</span></span>
<span class="line"><span style="color:#C3E88D;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">flatten</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">obj</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">flatOptions</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ciName</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ci-name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">inWorkspaces</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">workspaces</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">workspace</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">workspace</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">inWorkspaces</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">flatOptions</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">userAgent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\{</span><span style="color:#C3E88D;">node-version</span><span style="color:#A6ACCD;">\\}</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">gi</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">node-version</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\{</span><span style="color:#C3E88D;">npm-version</span><span style="color:#A6ACCD;">\\}</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">gi</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">obj</span><span style="color:#F07178;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">npm-version</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\{</span><span style="color:#C3E88D;">platform</span><span style="color:#A6ACCD;">\\}</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">gi</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">platform</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\{</span><span style="color:#C3E88D;">arch</span><span style="color:#A6ACCD;">\\}</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">gi</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">arch</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\{</span><span style="color:#C3E88D;">workspaces</span><span style="color:#A6ACCD;">\\}</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">gi</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">inWorkspaces</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\{</span><span style="color:#C3E88D;">ci</span><span style="color:#A6ACCD;">\\}</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">gi</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ciName</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">ci/</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">ciName</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">trim</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// We can&#39;t clobber the original or else subsequent flattening will fail</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// (i.e. when we change the underlying config values)</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// obj[key] = flatOptions.userAgent</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// user-agent is a unique kind of config item that gets set from a template</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// and ends up translated.  Because of this, the normal &quot;should we set this</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// to p<wbr>rocess.env also doesn&#39;t work</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">npm_config_user_agent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">flatOptions</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">userAgent</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h3 id="npm" tabindex="-1">npm <a class="header-anchor" href="#npm" aria-hidden="true">#</a></h3><p>所以在以npm运行时 p<wbr>rocess.env.npm_config_user_agent对应的就是 npm/6.14.11 node/v14.16.0 darwin x64 npm/npmVersion node/process.version process.platform process.arch</p><h3 id="yarn" tabindex="-1">yarn <a class="header-anchor" href="#yarn" aria-hidden="true">#</a></h3><p>yarn对应的会通过this.registries.yarn.getOption(&#39;user-agent&#39;)从yarn-registry.js中获取 <img src="https://cdn.nlark.com/yuque/0/2021/png/191608/1639031500187-d4b3036a-ca19-462c-971e-3d72a553ecb2.png#clientId=u17123bbe-6e8b-4&amp;crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;from=paste&amp;height=219&amp;id=u3a4658fa&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=219&amp;originWidth=245&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=18144&amp;status=done&amp;style=none&amp;taskId=uc1f6eb37-05b2-43b3-b16f-ede5b2955af&amp;title=&amp;width=245" alt="image.png"><img src="https://cdn.nlark.com/yuque/0/2021/png/191608/1639031629814-d750e611-cdd9-4bf7-b213-bf8d78e7125c.png#clientId=u17123bbe-6e8b-4&amp;crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;from=paste&amp;height=381&amp;id=u46b9401f&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=381&amp;originWidth=862&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=60574&amp;status=done&amp;style=none&amp;taskId=u06d694ec-4c81-4de4-bf2f-b8dc1a3737c&amp;title=&amp;width=862" alt="image.png"></p><h3 id="pnpm" tabindex="-1">pnpm <a class="header-anchor" href="#pnpm" aria-hidden="true">#</a></h3><p>pnpm也是类似的会把user-agent重新赋值 <img src="https://cdn.nlark.com/yuque/0/2021/png/191608/1639031827501-08e59738-eaba-42c6-9a2d-11e305e18aaf.png#clientId=u17123bbe-6e8b-4&amp;crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;from=paste&amp;height=32&amp;id=uc799a39e&amp;margin=%5Bobject%20Object%5D&amp;name=image.png&amp;originHeight=32&amp;originWidth=965&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=16560&amp;status=done&amp;style=none&amp;taskId=ue54e6005-ba9b-4ba9-bcc1-db4120d41cb&amp;title=&amp;width=965" alt="image.png"></p><h2 id="which-pm-runs" tabindex="-1">which-pm-runs <a class="header-anchor" href="#which-pm-runs" aria-hidden="true">#</a></h2><p>这个插件功能就是把获取到的npm_config_user_agent格式化，最终与package.json中用户规定的包管理器对比，达到规范的统一</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">npm_config_user_agent</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">pmFromUserAgent</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">env</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">npm_config_user_agent</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">pmFromUserAgent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">userAgent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">pmSpec</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">userAgent</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">split</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">separatorPos</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">pmSpec</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">lastIndexOf</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">pmSpec</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">separatorPos</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    version</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">pmSpec</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">separatorPos</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,18),e=[o];function r(c,t,y,D,i,F){return n(),a("div",null,e)}const m=s(l,[["render",r]]);export{A as __pageData,m as default};
