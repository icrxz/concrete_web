<template>
  <v-container fluid class="text-left px-10 pt-5">
    <v-card class="pa-4">
      <v-row>
        <v-col cols="3">
          <v-img :src="fileActive.externalURL" />
        </v-col>

        <v-col cols="9">
          <v-container class="pa-2">
            <span>Título: {{file.name}}</span>
            <br />
            <span>Descrição: {{file.description}}</span>
            <br />
            <span>Extensão do arquivo: {{file.fileType}}</span>
            <br />
            <span>Número da versão: {{fileActive.versionNumber}}</span>
            <br />
            <a :href="fileActive.externalURL">Download do arquivo</a> 
            <br />
            <span>Alterado pela ultima vez por {{lastUser.name}} no dia {{fileActive.updatedAt}}</span>
            <br />
            <br />
            <span>Historico de arquivos</span>

            <v-data-table
              :headers='historyHeaders'
              :items='fileHistory'
              sort-by="updatedAt"
              hide-default-footer
            >
              <template v-slot:item.isActive="{item}">
                <v-simple-checkbox
                  v-model="item.isActive"
                  disabled
                />
              </template>

              <template v-slot:item.externalURL="{item}">
                <a :href="item.externalURL">Visualizar versão {{item.versionNumber}}</a>
              </template>
            </v-data-table>
          </v-container>
        </v-col>
      </v-row>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="warning" @click="handleCancel" class="mr-4">Voltar</v-btn>
        <v-btn color="success" @click="handleSubmit" class="mr-4">Alterar Arquivo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import * as Project from '@/models/project.model';
import * as User from '@/models/user.model';
import * as File from '@/models/file.model';

export default Vue.extend({
  name: 'ShowProject',
  data() {
     return {
       historyHeaders: [
        { text: '', value: 'icon', sortable: false },
        { text: 'Nome', align: 'start', value: 'externalURL', sortable: false },
        { text: 'Ativo', value: 'isActive', sortable: false },
        { text: 'Atualizado em', value: 'updatedAt', sortable: false },
      ],
    };
  },

  computed: {
    fileId(): string {
      return this.$route.params.fileId;
    },

    projectId(): string {
      return this.$route.params.projectId;
    },

    project(): Project.Front {
      return this.$store.state.projects.currentProject;
    },

    file(): File.Front {
      return this.$store.state.files.currentFile;
    },

    fileActive(): File.Front {
      return this.$store.state.files.fileHistoryActive;
    },

    fileHistory(): Array<File.Front> {
      return this.$store.state.files.currentFileHistory;
    },

    lastUser(): User.Front {
      return this.$store.state.users.currentUser;
    }
  },

  methods: {
    ...mapActions({
      showFile: 'files/show',
      showUser: 'users/show',
      showProject: 'projects/show',
      getFileHistory: 'files/getFileHistory',
      getFileActive: 'files/getFileActive',
    }),

    handleCancel() {
      this.$router.push({ name: 'ShowProject', params: {projectId: this.projectId } });
    },

    async fetchItems() {
      try {
        await this.showFile(this.fileId);
        await this.showProject(this.projectId);
        await this.getFileActive(this.fileId);
        await this.getFileHistory(this.fileId);
        await this.showUser(this.fileActive.lastModifiedById);
      } catch (error) {
        console.log(error);
      }
    }
  },

  created() {
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
