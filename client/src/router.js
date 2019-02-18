import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';

Vue.config.productionTip = false;

Vue.use(Router);

/**
 * exports a router that is linked to a specific component.
 */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterComponent
    }
  ]
});
