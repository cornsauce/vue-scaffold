import Router from 'vue-router';
import {routes} from './routes';

export const assembleRouter = (config: any) => {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
};
