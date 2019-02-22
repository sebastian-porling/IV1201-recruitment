import Vue from 'vue';
import Router from 'vue-router';
import store from './store'
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import AdminLoginComponent from '@/components/AdminLoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import UserProfileComponent from '@/components/UserProfileComponent.vue';

Vue.config.productionTip = false;

Vue.use(Router);

/**
 * exports a router that is linked to a specific component.
 */
const router = new Router({
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
      path: '/login/admin',
      name: 'AdminLogin',
      component: AdminLoginComponent
    },

    {
      path: '/register',
      name: 'Register',
      component: RegisterComponent
    },
    {
      path: '/user',
      name: 'User',
      component: UserProfileComponent
    },
    /*{ 
      path: '*', 
      redirect: '/' 
    }*/
  ]
});


router.beforeEach( async(to, from, next) => {
  let loggedIn = store.state.user.name !== null;
  if (to.fullPath === '/login' || to.fullPath === '/register' || to.fullPath === '/login/admin') {
    if (loggedIn) {
      router.push('/');
    }
    next();
  } else {
    if (!loggedIn) {
      router.push('/login');
    }
  }
  next();
});

export default router;
