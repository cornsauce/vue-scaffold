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
import {Beans} from '@/scaffold/core/beans';
import {AuthManagerInterface} from '@/scaffold/auth';
import {JWTSecret} from '@/scaffold/support/auth/jwt';
import {Log} from '@/scaffold/log';

@Component({})
export default class extends Vue {
  @Inject()
  public api!: API;

  @Inject(Beans.AUTH_MANAGER)
  public am!: AuthManagerInterface;

  public async mounted() {
    Log.l(this.am.getCurrentUser());
    const user = await this.am.resolve(new JWTSecret({
      token: '',
      allowRenew: false,
      expiredAt: new Date(7226582400000),
    }));
    Log.l('user', user);
    Log.l('authorize for guest with permission "article.view"', await this.am.getCurrentUser().authorize('article.view'));
    Log.l('authorize for user with permission "article.view"', await user.authorize('article.view'));

    this.api.signIn('admin', '123456')(signIn).then((res) => {
      Log.l(res);
    }, (error) => {
      Log.w(error);
    });
  }
}
</script>

<style scoped>

</style>
