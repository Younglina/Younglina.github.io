import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
// import VueCalendarHeatmap from 'vue3-calendar-heatmap'
import './custom.css'
import { h } from 'vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // app.use(VueCalendarHeatmap)
    // register global components=
  }
}