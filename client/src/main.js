import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import 'mdbvue/src/components/Waves.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
