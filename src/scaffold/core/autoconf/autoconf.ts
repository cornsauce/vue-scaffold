import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {Application} from '@/scaffold/core/application';
import {enableEnvironment} from './environment';
import {enableApplication} from './application';
import {enableAxios, enableAPIAxios} from './axios';
import {enableEventBus} from './eventBus';
import {enableIoc, enableRouter, enableI18n, enableVuex, enableVue} from './vue';
import {enableMock} from './api';
import {assembleRouter} from '@/app/router';
import {assembleI18n} from '@/app/i18n';
import {assembleStore} from '@/app/store';

type GenConfiguratorsFunc = (config: any) => (provideVue: (options: any) => Vue) => Configurator[];

export const genConfigurators: GenConfiguratorsFunc = (config) => (provideVue) => {
  const configurators = [];

  configurators.push(enableEnvironment(config));
  configurators.push(enableApplication(config));
  configurators.push(enableIoc(config));
  configurators.push(enableAxios(config));
  configurators.push(enableAPIAxios(config));
  configurators.push(enableEventBus(config));
  configurators.push(enableRouter(config, assembleRouter));
  configurators.push(enableI18n(config, assembleI18n));
  configurators.push(enableVuex(config, assembleStore));
  configurators.push(enableMock(config));
  configurators.push(enableVue(config, provideVue));

  return configurators;
};

export const apply: (app: Application) => (...configurators: Configurator[]) => void = (app) => {
  return (...configurators) => {
    configurators.forEach((configurator) => {
      app.configure(configurator);
    });
  };
};
