import Vue from 'vue'
import Router from 'vue-router';
import App from './src/App.vue'
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
                        path: '/login',
                        name: 'Login',
                        component: LoginComponent,
                }]
        });

export default router;

