import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import 'mdbvue/src/components/Waves.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
Vue.config.productionTip = false

Vue.use(store);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
