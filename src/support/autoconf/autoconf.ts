import Vue from 'vue';
import {Configurator} from '@/core/configurator';
import {enableRouter} from './router';
import {enableI18n} from './i18n';
import {enableVuex} from './vuex';
import {enableMock} from './api';
import {enableVue} from './vue';


import {assembleRouter} from '@/router';
import {assembleI18n} from '@/i18n';
import {assembleStore} from '@/store';
import {App} from '@/core/app';

type GenConfiguratorsFunc = (config: any) => (provide: (options: any) => Vue) => Configurator[];

function enableEnvironment(rootConfig: any): Configurator {
  return () => (state) => {
    state.autoconf = {};

    return () => {
    };
  };
}

export const genConfigurators: GenConfiguratorsFunc = (config) => (provide) => {
  const configurators = [];

  configurators.push(enableEnvironment(config));

  if (config.router.enabled) {
    configurators.push(enableRouter(config, assembleRouter));
  }

  if (config.i18n.enabled) {
    configurators.push(enableI18n(config, assembleI18n));
  }

  if (config.vuex.enabled) {
    configurators.push(enableVuex(config, assembleStore));
  }

  if (config.api.mock.enabled) {
    configurators.push(enableMock(config));
  }

  configurators.push(enableVue(config, provide));

  return configurators;
};

export const apply: (app: App) => (...configurators: Configurator[]) => void = (app) => {
  return (...configurators) => {
    configurators.forEach((configurator) => {
      app.configure(configurator);
    });
  };
};
