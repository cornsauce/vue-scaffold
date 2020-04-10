import Router from 'vue-router';
import {routes} from './routes';
import {RootState} from '@/app/store/state';

export const assembleRouter: Scaffold.AssembleRouter = (app, state, rootConfig) => (config: any) => {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
};
