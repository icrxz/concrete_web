<template>
  <v-container fluid class="text-left">
    <h1>Projeto {{project.name}}</h1>
    <h3 v-if="project.organization">
      Organização: {{organization.name}}
    </h3>
    <h4>
      Gerenciado por: {{manager.name}}
    </h4>

    <v-container class="pa-3 mt-3">
      <h2>Arquivos</h2>
      <v-row>
        <template v-for="file in files">
          <v-col cols="6" :key="file.id">
            <FileCard
              :file="file"
            />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import FileCard from '@/components/File/FileCard.vue';
import * as Project from '@/models/project.model';
import * as User from '@/models/user.model';
import * as File from '@/models/file.model';
import * as Organization from '@/models/organization.model';

export default Vue.extend({
  name: 'ShowProject',
  data() {
     return {
       
    };
  },

  components: {
    FileCard: FileCard,
  },

  computed: {
    projectId(): string {
      return this.$route.params.projectId;
    },

    project(): Project.Front {
      return this.$store.state.projects.currentProject;
    },

    organization(): Organization.Front {
      return this.$store.state.organizations.currentOrganization;
    },

    manager(): User.Front {
      return this.$store.state.users.currentUser;
    },

    files(): Array<File.Front> {
      return this.$store.state.projects.projectFilesList;
    },
  },

  methods: {
    ...mapActions({
      showProject: 'projects/show',
      getFileList: 'projects/getFileList',
      showOrganization: 'organizations/show',
      showManager: 'users/show',
    }),

    async fetchItems() {
      try {
        await this.showProject(this.projectId);
        await this.showOrganization(this.project.organization);
        await this.showManager(this.project.manager);
        await this.getFileList(this.projectId);
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    this.fetchItems();
  }
});
</script>
