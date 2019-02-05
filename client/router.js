import Vue from 'vue'
import Router from 'vue-router';
import App from './src/App.vue'
import HomeComponent from './src/components/HomeComponent.vue'
import LoginComponent from './src/components/LoginComponent.vue'

Vue.config.productionTip = false

Vue.use(Router);

const router = new Router({
        mode: 'history',
        base: 'https://localhost:8080',
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

