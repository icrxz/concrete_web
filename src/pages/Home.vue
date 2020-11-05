<template>
  <v-container>

    <v-row>
      <v-col cols=9>
        <h1 text-left>Projetos</h1>
        <v-data-table
          :headers='tableHeaders'
          :items='items'
          sort-by="name"
        />
      </v-col>

      <v-col cols=3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import * as Project from '@/models/project.model';

export default Vue.extend({
  name: 'Home',

  data: function() {
    return {
      tableHeaders: [
        { text: '', value: 'icon', sortable: false },
        { text: 'Nome', align: 'start', value: 'name' },
        { text: 'Ativo', value: 'isActive', sortable: false },
        { text: 'Descrição', value: 'description', sortable: true },
      ],
    };
  },

  computed: {
    items(): Array<Project.Front> {
      return this.$store.state.projects.projectList;
    },
  },

  methods: {
    fetchItems() {
      this.$store.dispatch('projects/index');
    },
  },

  mounted() {
    this.fetchItems();
  }
});
</script>
