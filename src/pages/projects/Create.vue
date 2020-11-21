<template>
  <v-container text-center>
    <v-col cols="8">
      <v-card class="py-4 px-3">
        <v-card-title>
          Novo Projeto
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="project.name"
              label="Nome"
              :rules="rules.name"
              @keypress="handleKeyEnter"
              required
            />

            <v-text-field
              v-model="project.description"
              label="Descrição"
              :rules="rules.description"
              @keypress="handleKeyEnter"
              required
            />

            <v-select
              v-model="project.organization"
              :items="organizations"
              item-text="name"
              item-value="id"
              label="Organização"
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
          <v-btn color="success" @click="handleSubmit" class="mr-4">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ErrorLabel from '@/components/atomics/Labels/ErrorLabel.vue';
import * as Organization from '@/models/organization.model';
import * as ProjectState from '@/store/states/project.state';

export default Vue.extend({
  data() {
     return {
       errors: Array<string>(),
       formValid: false,
       project: ProjectState.InitialFrontState,
    };
  },

  components: {
    ErrorLabel: ErrorLabel,
  },

  computed: {
    organizations(): Array<Organization.Front> {
      return this.$store.state.organizations.organizationList;
    },

    rules(): object {
      return {
        name: [
          (v: string) => !!v || 'Nome é necessário',
        ],
        description: [
          (v: string) => !!v || 'Descrição é necessária',
        ],
      };
    },
  },

  methods: {
    ...mapActions({
      createProject: 'projects/create',
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
      this.$router.push({ name: 'Home' });
    },

    async handleSubmit() {
      this.errors = [];
      if (this.formValid) {
        try {
          await this.createProject(this.project);
          this.resetForm();
          this.$router.push({ name: 'IndexProject' });
        } catch (error) {
          this.errors.push(error);
        }
      }
    },

    async fetchItems() {
      try {
        this.$store.dispatch('organizations/index');
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
