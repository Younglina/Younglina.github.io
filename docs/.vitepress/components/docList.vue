<script setup>
import { watch, ref } from 'vue'
import { useDocs } from './useDocs.js'

const props = defineProps(['filter', 'type'])

const CLORS = ['#FFB3B3', '#FFDBA4', '#FFE9AE', '#C1EFFF']
const { categories, docData } = useDocs()
const totalData = ref([])
let curPage = ref(1),
  totalPage = ref(1),
  inputPage = ref(null),
  filterData = ref([])
watch(
  () => props.filter,
  (val) => {
    let data = []
    if (props.type === 'tag') {
      data = docData.filter(
        (item) => !val || (item.tags && item.tags.includes(val))
      )
    } else {
      data = docData.filter(
        (item) => !val || (item.categories && item.categories.includes(val))
      )
    }
    totalPage.value = Math.ceil(data.length / 10)
    totalData.value = data
    filterData.value = data.slice(0, 10)
  },
  {
    immediate: true,
  }
)

function changePage(p) {
  if (!isNaN(p) || p >= totalPage.value || p < 1) {
    curPage.value = p > totalPage.value ? totalPage.value : p < 1 ? 1 : +p
  } else {
    if (p == 'prev' || p == 'next') {
      curPage.value += (p === 'prev' ? -1 : 1)
    } else {
      curPage.value = 1
    }
  }
  filterData.value = totalData.value.slice((curPage.value - 1) * 10, curPage.value * 10)
}
</script>

<template lang="">
  <div class="docs-list-wrap">
    <div class="docs-list">
      <a v-for="item in filterData" :key="item.title" :href="item.link" class="docs">
        <div class="docs-title">{{ item.title }}</div>
        <div class="docs-footer">
          <span class="docs-info">✍️{{ item.author }}</span>
          <span class="docs-info">🕐{{ item.date }}</span>
          <span>
            🔗
            <a v-for="tag in item.tags" class="docs-info docs-tag" :style="{color:tag===props.filter?'var(--vp-home-hero-name-color)':'#7f7f7f'}" :key="tag"
              :href="`/categories?tag=${tag}&type=tag`" target="_blank">
              <span >{{ tag }}</span>
            </a>
          </span>
        </div>
      </a>
    </div>
    <div class="page-nation">
      <span>共{{totalPage}}页</span>
      <span>当前第{{curPage}}页</span>
      <button @click="changePage('prev')" :disabled="curPage==1">上一页</button>
      <button @click="changePage('next')" :disabled="curPage==totalPage">下一页</button>
      <span>跳转至</span>
      <input v-model="inputPage" class="input-page" />
      <button @click="changePage(inputPage)">前往</button>
    </div>
    </div>
</template>
<style>
.page-nation {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.page-nation * {
  margin-right: 16px;
  font-size: 14px;
}

.page-nation button {
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0 6px;
}

.input-page {
  width: 60px;
  border-radius: 4px;
  padding: 0 6px;
  border: 1px solid gainsboro;
}
</style>