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
  import {Component, Vue} from 'vue-property-decorator';
  import {mapActions} from 'vuex';
  import {SET_LOCALE} from '@/store/i18n/action';

  @Component({
    mounted() {
      console.log(this);
    },
    methods: {
      ...mapActions({
        _setLocale: SET_LOCALE,
      }),
    },
  })
  export default class extends Vue {
    public _setLocale!: (args: { locale: string }) => Promise<void>;

    public setLocale(locale: string) {
      this._setLocale({locale});
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
