<template>
  <v-container text-center>
    <v-col cols="8">
      <v-card class="py-4 px-3">
        <v-card-title>
          Upload de Arquivo
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-file-input
              accept="image/*"
              label="Novo Arquivo"
              v-model="file.file"
              required
            />

            <v-text-field
              v-model="file.desc"
              label="Descrição"
              :rules="rules.description"
              @keypress="handleKeyEnter"
              required
            />
          </v-form>

          <template v-if="errors.length">
            <ErrorLabel 
              :errors="errors"
            />
          </template>
        </v-card-text>

        <v-card-actions class="mb-3">
          <div class="flex-grow-1"></div>
          <v-btn color="warning" @click="handleCancel" class="mr-4">Voltar</v-btn>
          <v-btn color="success" @click="handleSubmit" class="mr-4">Criar Arquivo</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ErrorLabel from '@/components/atomics/Labels/ErrorLabel.vue';

export default Vue.extend({
  data() {
     return {
       errors: Array<string>(),
       formValid: false,
       file: {
         file: '',
         desc: '',
       },
    };
  },

  components: {
    ErrorLabel: ErrorLabel,
  },

  computed: {
    projectId(): string {
      return this.$route.params.projectId;
    },

    rules(): object {
      return {
        description: [
          (v: string) => !!v || 'Descrição é necessária',
        ],
      };
    },
  },

  methods: {
    ...mapActions({
      uploadFile: 'projects/uploadFile',
    }),

    resetForm() {
      (this.$refs.form as HTMLFormElement).reset();
    },

    handleKeyEnter(value: KeyboardEvent) {
      if (value.key === 'Enter') {
        this.handleSubmit();
      }
    },

    handleCancel() {
      this.resetForm();
      this.$router.push({ name: 'ShowProject', params: {projectId: this.projectId } });
    },

    async handleSubmit() {
      this.errors = [];
      if (this.formValid) {
        try {
          const formData = new FormData();
          formData.append('file', this.file.file);
          formData.append('desc', this.file.desc);

          this.uploadFile({projectId: this.projectId, formData: formData});
          this.resetForm();
          this.$router.push({ name: 'ShowProject', params: {projectId: this.projectId } });
        } catch (error) {
          this.errors.push(error);
        }
      }
    },
  },
});
</script>
