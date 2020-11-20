<template>
  <v-app-bar app clipped-left flat dark id="header">
    <v-app-bar-nav-icon @click.stop="handleSidebar"/>
    <v-toolbar-title>
      <v-img src="@/assets/logo.png" width="5%" />
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn text @click="logout" style="text-transform: none">Sair</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',
  methods: {
    handleSidebar() {
      this.$emit('sidebarAction');
    },

    logout() {
      localStorage.Authenticated = 'false';
      localStorage.jwt = '';
      this.$router.push({ name: 'Login' });
    },
  },
});
</script>
