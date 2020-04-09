import Vue from 'vue';
import {App} from '@/core/app';
import {config} from '@/app/config';
import Entry from './Entry.vue';
import {apply, genConfigurators} from '@/support/autoconf';

function runApp() {
  const app = new App({});

  const provideVue = (options: any) => {
    return new Vue({
      ...options,
      render: (h) => h(Entry),
    }).$mount('#app');
  };

  apply(app)(...genConfigurators(config)(provideVue));

  app.run();
}

runApp();


