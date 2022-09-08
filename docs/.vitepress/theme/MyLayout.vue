<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme

const { frontmatter } = useData()
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
    <!-- <template #doc-footer-before>
      <span>doc-footer-before</span>
    </template>
    <template #doc-after>
      <span>doc-after</span>
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