
<script setup>
import { onMounted } from 'vue'
import { MlHeatmap } from 'ml-heatmap'
import DocList from './docList.vue'
import lcData from './lcData.json'
import { useDocs } from './useDocs.js'
import moment from 'moment'
import 'ml-heatmap/dist/style.css'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
// import '/live2d.min.js'
// import '/live2dcubismcore.min.js'
// import * as PIXI from 'pixi.js';
// import { Live2DModel } from 'pixi-live2d-display';
// window.PIXI = PIXI;
// async function initLive2d() {
// const canvasdiv = document.createElement("canvas")
// canvasdiv.id = "canvas"
// canvasdiv.style.position = "absolute"
// canvasdiv.style.bottom = "10px"
// canvasdiv.style.right = "10px"
// document.body.appendChild(canvasdiv)
//   const app = new PIXI.Application({
//     view: document.getElementById('canvas'),
//     autoStart: true,
//     width: 140,
//     height: 140,
//     resolution: 1,
//     transparent: true
//   });
//   const model = await window.PIXI.Live2DModel.from("https://cdn.jsdelivr.net/gh/QiShaoXuan/live2DModel@1.0.0/live2d-widget-model-hijiki/assets/hijiki.model.json");
//   app.renderer.autoResize = true;
//   model.x = 0
//   model.y = 0
//   model.scale.set(0.06, 0.06);
//   app.stage.addChild(model);
//   // model.anchor.set(0.5, 0.5);
//   // 交互
//   model.on('hit', hitAreas => {
//     if (hitAreas.includes('body')) {
//       model.motion('tap_body');
//     }
//   });
// }

// initLive2d();
const CLORS = ['#FFB3B3', '#FFDBA4', '#FFE9AE', '#C1EFFF']
const submissionCalendar = JSON.parse(lcData.userCalendar.submissionCalendar)
const nowDate = new Date()
let calendarData = Object.keys(submissionCalendar).map((key) => {
  let date = new Date(key * 1000)
  return {
    date: moment(date).format('YYYY-MM-DD'),
    count: submissionCalendar[key],
  }
})
const { docData, categories, tags, docNum, tagNum } = useDocs()
// window.VitepressCategories = [...tags]
// fetch('https://api.03c3.cn/zb/text.php').then(res=>{
//   res.text().then(res=>console.log(res))
// })
if(typeof window !==undefined){
  var s_div = document.createElement('div');   // 创建节点
  s_div.setAttribute("id", "gitalk-container");   // 设置属性
  document.body.appendChild(s_div);   // 添加节点
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
  gitment.render('gitalk-container')
}
</script>

<template>
  <div class="home-page">
    <div class="home-top">
      <h1 class="name">littlear</h1>
      <p class="tagline">littlear是一只聪明可爱的猫.</p>
    </div>

    <MlHeatmap id="heat-map" :data="calendarData" :year="2022" locale="cn" />
    <!-- <div class="lcdata">累计提交:{{ lcData.userCalendar.totalActiveDays }} 连续提交:{{ lcData.userCalendar.streak }}</div> -->

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
          <a v-for="(num, k) in categories" :key="k" class="docs-categor docs"
            :href="`/categories?cat=${k}&type=cat`" target="_blank">
            <span>{{ k }}</span>
            <span class="docs-categor-num" :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 3)] }">
              {{ num }}
            </span>
          </a>
        </div>
        <div>
          <h3 class="docs-types">标签</h3>
          <a v-for="t in tags" :key="t" class="docs-tags"
            :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 3)] }"
            :href="`/categories?tag=${t}&type=tag`" target="_blank">
            <div>{{ t }}</div>
          </a>
        </div>
      </div>
    </div>

    <!-- <calendar-heatmap :values="calendarData" :endDate="nowDate" :round="5" :locale="{
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    }" :tooltip-formatter="(v) => `${v.count}个提交, ${moment(v.date).format('YYYY-MM-DD')}`" no-data-text="这天没做题"
    tooltip-unit="" />-->
  </div>
</template>

<style>
</style>