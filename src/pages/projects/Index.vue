<template>
  <v-container fluid>
      <v-row>
    <template v-for="project in projectItems">
      <v-col cols="3" :key="project.id">
        <v-card>
          <v-card-title>
            {{project.name}}
          </v-card-title>

          <v-card-subtitle class="text-left">
            Projeto criado em: {{project.createdAt}}
          </v-card-subtitle>

          <v-card-text>
            {{project.description}}
          </v-card-text>

          <v-card-actions style="justify-content: right;">
            <v-btn 
              :to="{
                name: 'ShowProject',
                params: { projectId: project.id },
              }"
              style="text-transform: none;"
            >
              Visualizar Projeto
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
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
    };
  },

  computed: {
    projectItems(): Array<Project.Front> {
      return this.$store.state.projects.projectList;
    },
  },

  methods: {
    fetchItems() {
      try {
        this.$store.dispatch('projects/index');
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.fetchItems();
  }
});
</script>
