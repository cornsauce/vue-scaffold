import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import {Store} from 'vuex';
import {Application} from './core/application';

type AssembleComponent<T> = (app: Application, state: any, rootConfig: any) => T;

declare global {
  namespace Scaffold {
    type AssembleRouter = AssembleComponent<(config: any) => VueRouter>;
    type AssembleStore<StateType> = AssembleComponent<(config: any) => Store<StateType>>;
    type AssembleI18n = AssembleComponent<(config: any) => VueI18n>;
  }
}

