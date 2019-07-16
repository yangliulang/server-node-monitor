import Vue from 'vue'
import router from '@/router'
import ElementUi from 'element-ui'
import App from '@/App.vue'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)
// Vue.use(router)
// Vue.use(Api)
new Vue({
  name: 'App',
  // router,
  render: h => h(App)
}).$mount('#app')
