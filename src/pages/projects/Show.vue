<template>
  <v-container fluid class="text-left px-10 pt-5">
    <v-row>
      <h1 style="color: #232323;">
        Projeto {{project.name}}
      </h1>
    </v-row>

    <v-row>
      <p v-if="project.organization" class="organizationText">
        Organização: {{organization.name}}
      </p>
      <v-spacer />
      <v-btn
        class="mr-10"
        :to="{
          name: 'CreateFile',
          params: {
            projectId: projectId,
          },
        }"
      >
        <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>
        <b>arquivo</b>
      </v-btn>
    </v-row>
    <p class="managerText">
      Gerenciado por: {{manager.name}}
    </p>

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

    files(): Array<File.FrontClass> {
      return this.$store.state.projects.projectFilesList as Array<File.FrontClass>;
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

<style scoped>
  .organizationText {
    font-size: 20px;
    margin-top: 10px;
    color: #545454;
  }

  .managerText {
    font-size: 16px;
    color: #6C6C6C;
  }
</style>
