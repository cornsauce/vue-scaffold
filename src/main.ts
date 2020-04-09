import '@/core/init';
import Vue from 'vue';
import {store} from './store';
import {router} from './router';
import {i18n} from './support/i18n';
import {App, useVue} from '@/core/app';
import {config} from '@/app/config';
import Entry from './Entry.vue';

Vue.config.productionTip = false;

function runApp() {
  const app = new App(config);

  app.configure(useVue(() => {
    return new Vue({
      store,
      router,
      i18n,
      app,
      render: (h) => h(Entry),
    }).$mount('#app');
  }));

  app.run();
}

runApp();


