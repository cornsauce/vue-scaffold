import Vue, {ComponentOptions} from 'vue';
import {App} from '@/core/app';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    app?: App;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $app?: App;
  }
}
