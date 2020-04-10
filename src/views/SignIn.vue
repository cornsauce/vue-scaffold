<template>
    <div>
        用户登录
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {API} from '@/app/api/v1/api';
  import {Inject} from '@vue-ioc/core';
  import {signIn} from '@/app/api/v1/path';


  @Component({})
  export default class extends Vue {
    @Inject()
    public api!: API;

    public mounted() {
      this.api.signIn('admin', '123456')(signIn).then((res) => {
        alert(res.data.toString());
      });
    }
  }
</script>

<style scoped>

</style>
