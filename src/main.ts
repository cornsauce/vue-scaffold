import Vue from 'vue';
import {Application} from '@/scaffold/core/application';
import {config} from '@/app/config';
import App from '@/app/App.vue';
import {apply, genConfigurators} from '@/scaffold/core/autoconf';

function runApp() {
  const app = new Application({});

  const provideVue = (options: any) => {
    return new Vue({
      ...options,
      render: (h) => h(App),
    }).$mount('#app');
  };

  apply(app)(...genConfigurators(config(app))(provideVue));

  app.run();
}

runApp();


