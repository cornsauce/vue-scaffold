<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
            |
            <router-link to="/signIn" v-t="'signIn'"></router-link>
            |
            <router-link to="/signUp" v-t="'signUp'"></router-link>
            |
            <button @click="() => setLocale('zh-cn')">中文</button>
            <button @click="() => setLocale('en-us')">English</button>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {mapActions} from 'vuex';
  import {SET_LOCALE} from '@/store/i18n/action';
  import {Module} from '@vue-ioc/core';
  import {API} from '@/app/api/v1/api';

  @Module({
    providers: [
      {provide: API, useClass: API, providedIn: 'root'}
    ]
  })
  @Component({
    methods: {
      ...mapActions({
        dispatchSetLocale: SET_LOCALE,
      }),
    },
  })
  export default class extends Vue {
    public dispatchSetLocale!: (args: { locale: string }) => Promise<void>;

    public setLocale(locale: string) {
      this.dispatchSetLocale({locale});
    }
  }
</script>

<style lang="stylus">
    #app
        font-family Avenir, Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50
        margin-top 60px
</style>
