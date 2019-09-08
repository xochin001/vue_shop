import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/override-element-ui.css'
import 'normalize.css'
//封装公共组件的入口函数
import './components/install' //切换菜单动态显示菜单名
import Loading from './components/MyLoading'
import myFilter from './utils/myFilter'
Vue.use(ElementUI)
Vue.use(Loading)


for(let key in myFilter) {
  Vue.filter(key, myFilter[key])
}
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
