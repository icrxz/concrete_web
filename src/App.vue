<template>
  <v-app id="app">
    <template v-if="hasHeader">
      <Header v-on:sidebarAction="sidebarAction"/>
      <Sidebar ref="sidebar"/>
    </template>

    <v-main id="concrete-content" class="pt-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Layout/Header.vue';
import Sidebar from '@/components/Layout/Sidebar.vue';

export default Vue.extend({
  name: 'App',

  data: () => ({ hasHeader: true }),

  components: { Header, Sidebar },

  methods: {
    sidebarAction() {
      (this.$refs.sidebar as Sidebar).handleSidebarSize();
    },
  },

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
