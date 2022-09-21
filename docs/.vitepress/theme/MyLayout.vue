<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { onMounted } from 'vue'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

const { Layout } = DefaultTheme

const { frontmatter } = useData()

onMounted(() => {
  if(typeof window !==undefined){
    var s_div = document.createElement('div');   // 创建节点
    s_div.setAttribute("id", "gitalk-page-container");   // 设置属性
    document.querySelector('.content-container').appendChild(s_div);   // 添加节点
    var gitment = new Gitalk({
      id: location.pathname, // 可选。默认为 location.href
      owner: 'Younglina',
      repo: 'Younglina.github.io',
      clientID: '91a579be5a403288bdb7',
      admin: ['Younglina'],
      labels: ['Gitalk'],
      proxy: "https://vercel.younglina.top/github_access_token",
      createIssueManually: true,
      clientSecret: '6af31ca2f5dfc7bc7feed23a8642d23993dcc9c3',
    })
    gitment.render('gitalk-page-container')
  }
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <span class="page-info">✍️{{ frontmatter.author }}</span>
      <span class="page-info">🕐{{ frontmatter.date }}</span>
      <span>
        🔗
        <span class="page-info" v-for="item in frontmatter.tags" :key="item">{{ item }}</span>
      </span>
    </template>
    <template #doc-after>
      <div id="doc-after"></div>
    </template>
    <!-- <template #doc-footer-before>
      <span>doc-footer-before</span>
    </template>
    <template #aside-top>
      <span>aside-top</span>
    </template>
    <template #aside-bottom>
      <span>aside-bottom</span>
    </template>
    <template #aside-outline-before>
      <span>aside-outline-before</span>
    </template>
    <template #aside-outline-after>
      <span>aside-outline-after</span>
    </template>
    <template #aside-ads-before>
      <span>aside-ads-before</span>
    </template>
    <template #aside-ads-after>
      <span>aside-ads-after</span>
    </template> -->
  </Layout>
</template>

<style>
  .page-info{
    font-size: 13px;
    color: #7f7f7f;
    margin-right: 10px;
  }
</style>