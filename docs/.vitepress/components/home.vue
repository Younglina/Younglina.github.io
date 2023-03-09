
<script setup>
import { MlHeatmap } from 'ml-heatmap'
import DocList from './docList.vue'
import lcData from './lcData.json'
import { useDocs } from './useDocs.js'
import moment from 'moment'
import 'ml-heatmap/dist/style.css'
import 'gitalk/dist/gitalk.css'

const CLORS = ['#FFB3B3', '#FFDBA4', '#FFE9AE', '#C1EFFF']
const submissionCalendar = JSON.parse(lcData.userCalendar.submissionCalendar)
let calendarData = Object.keys(submissionCalendar).map((key) => {
  let date = new Date(key * 1000)
  return {
    date: moment(date).format('YYYY-MM-DD'),
    count: submissionCalendar[key],
  }
})
const { categories, tags, docNum, tagNum } = useDocs()
</script>

<template>
  <div class="home-page">
    <div class="home-top">
      <h1 class="name">littlear</h1>
      <p class="tagline">littlear是一只聪明可爱的猫.</p>
    </div>

    <MlHeatmap id="heat-map" :data="calendarData" :year="2022" locale="cn" />
    <div class="docs-wrap">
      <DocList />
      <div class="docs info-wrapper">
        <div class="info-person">
          <img class="info-avatar" src="/littlear.jpg" />
          <div class="info-name">littlear</div>
          <div class="info-num">
            <div>
              <h3>{{ docNum }}</h3>
              <h6>文章</h6>
            </div>
            <div>
              <h3>{{ tagNum }}</h3>
              <h6>标签</h6>
            </div>
          </div>
          <div class="social-links">
            <a href="https://github.com/Younglina" target="_blank">
              <img class="svg-img" src="/github.svg" />
            </a>
            <a href="https://leetcode.cn/u/younglina/" target="_blank">
              <img class="svg-img" src="/leetcode.svg" />
            </a>
            <a href="https://juejin.cn/user/817692381290190" target="_blank">
              <img class="svg-img" src="/juejin.svg" />
            </a>
          </div>
        </div>
        <div>
          <h3 class="docs-types">分类</h3>
          <a v-for="(num, k) in categories" :key="k" class="docs-categor docs" :href="`/categories?cat=${k}&type=cat`"
            target="_blank">
            <span>{{ k }}</span>
            <span class="docs-categor-num" :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 4)] }">
              {{ num }}
            </span>
          </a>
        </div>
        <div>
          <h3 class="docs-types">标签</h3>
          <a v-for="t in tags" :key="t" class="docs-tags"
            :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 4)] }" :href="`/categories?tag=${t}&type=tag`"
            target="_blank">
            <div>{{ t }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>