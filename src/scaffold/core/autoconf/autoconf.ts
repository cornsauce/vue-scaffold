import Vue from 'vue';
import {Configurator} from '@/scaffold/core/configurator';
import {Application} from '@/scaffold/core/application';
import {configureEnvironment} from './environment';
import {configureApplication} from './application';
import {configureAxios, configureAPIAxios} from './axios';
import {configureEventBus} from './eventBus';
import {configureIoc, configureRouter, configureI18n, configureVuex, configureVue} from './vue';
import {configureMock} from './api';
import {assembleRouter} from '@/app/router';
import {assembleI18n} from '@/app/i18n';
import {assembleStore} from '@/app/store';

type GenConfiguratorsFunc = (config: any) => (provideVue: (options: any) => Vue) => Configurator[];

export const genConfigurators: GenConfiguratorsFunc = (config) => (provideVue) => {
  const configurators = [];

  configurators.push(configureEnvironment(config));
  configurators.push(configureApplication(config));
  configurators.push(configureIoc(config));
  configurators.push(configureAxios(config));
  configurators.push(configureAPIAxios(config));
  configurators.push(configureEventBus(config));
  configurators.push(configureRouter(config, assembleRouter));
  configurators.push(configureI18n(config, assembleI18n));
  configurators.push(configureVuex(config, assembleStore));
  configurators.push(configureMock(config));
  configurators.push(configureVue(config, provideVue));

  return configurators;
};

export const apply: (app: Application) => (...configurators: Configurator[]) => void = (app) => {
  return (...configurators) => {
    configurators.forEach((configurator) => {
      app.configure(configurator);
    });
  };
};
