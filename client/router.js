import Vue from 'vue'
import Router from 'vue-router';
import HomeComponent from './src/components/HomeComponent.vue'
import LoginComponent from './src/components/LoginComponent.vue'

Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
                {
                        path: '/',
                        name: 'Home',
                        component: HomeComponent,
                },
                {
                        path: '/Login',
                        name: 'Login',
                        component: LoginComponent,
                }]
        });

export default router;

