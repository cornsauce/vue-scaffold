import Vue from 'vue';
import {Application} from '@/core/application';
import {config} from '@/app/config';
import Entry from './Entry.vue';
import {apply, genConfigurators} from '@/support/autoconf';

function runApp() {
  const app = new Application({});

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


