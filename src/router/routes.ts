import {RouteConfig} from 'vue-router';

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signIn" */ '@/views/SignIn.vue'),
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signUp" */ '@/views/SignUp.vue'),
  },
];
