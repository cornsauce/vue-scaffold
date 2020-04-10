import Vue, {ComponentOptions} from 'vue';
import {Application} from '@/core/application';
import {$vueIocContainer} from '@vue-ioc/core/dist/common/magicFields';
import {Container} from 'inversify';
import {IModuleOptions} from '@vue-ioc/core/dist/decorators/Module';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    app?: Application;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $app?: Application;
  }
}
