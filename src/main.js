import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')


Vue.use(VueRouter); //挂载属性