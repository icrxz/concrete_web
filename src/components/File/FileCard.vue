<template>
  <v-card class="card">
    <img :src="fileActive.externalURL" class="titleImage" />
    <v-card-title class="title">
      {{file.name}}
    </v-card-title>

    <v-card-subtitle>
      Ultima atualização em {{file.updatedAt}}
    </v-card-subtitle>

    <v-card-text>
      Descrição: {{file.description}}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { FrontClass as FileFront } from '@/models/file.model';
import { InitialFrontState } from '@/store/states/fileHistory.state';

export default Vue.extend({
  name: 'FileCard',

  data() {
    return {
      fileActive: InitialFrontState,
    };
  },

  props: {
    file: {
      type: FileFront,
      required: true,
    }
  },

  methods: {
    ...mapActions({
      getFileActive: 'files/getFileActive',
    }),

    async fetchItems() {
      this.fileActive = await this.getFileActive(this.file.id);
    },
  },

  mounted() {
    this.fetchItems();
  }
});
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .titleImage {
    min-width: 3rem;
    min-height: 5rem;
    max-width: 50%;
    max-height: 50px;
  }

  .title {
    display: flex;
    text-align: center;
    justify-content: center;
  }
</style>
