import Vue from 'vue';
import Router from 'vue-router';
import store from './store'
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import AdminLoginComponent from '@/components/AdminLoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import UserProfileComponent from '@/components/UserProfileComponent.vue';
import AdminProfileComponent from '@/components/AdminProfileComponent.vue';

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
      path: '/loginadmin',
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
    {
      path: '/admin',
      name: 'Admin',
      component: AdminProfileComponent

    }
    /*{ 
      path: '*', 
      redirect: '/' 
    }*/
  ]
});


router.beforeEach( async(to, from, next) => {
  let loggedIn = store.state.user.name !== null;
  let role = store.state.user.role;
  if (to.fullPath === '/login' || to.fullPath === '/register' || to.fullPath === '/login/admin' || to.fullPath === "/") {
    if (loggedIn) {
      router.push('/');
    }
    next();
  } else {
    if(!loggedIn){
      //router.push('/login');
    }
    if (to.path == '/user' && loggedIn && role != 'applicant') {
      store.dispatch('logout');
      router.push('/login');
    }
    if (to.path == '/admin' && loggedIn && role != 'recruiter'){
      store.dispatch('logout');
      router.push('/login/admin');
    }
  }
  next();
});

export default router;
