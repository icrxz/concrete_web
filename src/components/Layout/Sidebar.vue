<template>
  <v-navigation-drawer
  v-model="drawer"
  :mini-variant="miniVariant"
  app
  clipped>
    <v-list dense>
      <template v-for="item in sideBarItems">
        <v-list-group
          v-bind:key="item.title"
          v-if="item.subItems != undefined"
          :group="item.group"
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(subItem, i) in item.subItems"
            :key="i"
            :to="subItem.to"
            :exact="subItem.exact"
            link
          >

          <v-list-item-action>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item v-else v-bind:key="item.title" :to="item.to" :exact="item.exact" link>
          <v-list-item-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import Vue from 'vue';

export default class Sidebar extends Vue.extend({
  name: 'Sidebar',
  props: ['toggle'],
  data: () => ({
    screenSize: window.innerWidth,
    drawer: !(window.innerWidth < 1280),
    miniVariant: true,
    sideBarItems: [
      {
        icon: 'mdi-home', title: 'Home', to: { name: 'Home' }, exact: true,
      },
      {
        icon: 'mdi-office-building',
        title: 'Organizações',
        to: { name: 'IndexOrganization' },
        exact: false,
      },
      {
        icon: 'mdi-folder-home-outline', title: 'Projetos', to: { name: 'IndexProject' }, exact: true,
      },
    ],
  }),
  methods: {
    handleSidebarSize() {
      this.screenSize = window.innerWidth;
      if (this.screenSize <= 1280) {
        this.drawer = !this.drawer;
        this.miniVariant = false;
      } else {
        this.drawer = true;
        this.miniVariant = !this.miniVariant;
      }
      this.$emit('sidebarActive');
    },
  },
}) {}
</script>
