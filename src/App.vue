<template>
  <v-app id="app">
    <template v-if="hasHeader">
      <Header />
    </template>

    <v-main id="concrete-content">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Layout/Header.vue';

export default Vue.extend({
  name: 'App',

  data: () => ({ hasHeader: true }),

  components: { Header },

  watch: {
    $route() {
      this.hasHeader = !this.$route.meta.noHeader;
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
