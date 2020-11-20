<template>
  <v-container fluid>
    <v-col cols="10">
      <v-card>
        <v-card-title>
          Nova Organização
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="organization.name"
              label="Nome"
              :rules="rules.name"
              @keypress="handleKeyEnter"
              required
            />

            <v-text-field
              v-model="organization.description"
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
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ErrorLabel from '@/components/atomics/Labels/ErrorLabel.vue';
import * as OrganizationState from '@/store/states/organization.state';

export default Vue.extend({
  data() {
     return {
       errors: Array<string>(),
       formValid: false,
       organization: OrganizationState.InitialFrontState,
    };
  },

   components: {
    ErrorLabel: ErrorLabel,
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

    async handleSubmit() {
      this.errors = [];
      if (this.formValid) {
        try {
          await this.createProject(this.organization);
          this.resetForm();
          this.$router.push({ name: 'IndexOrganization' });
        } catch (error) {
          this.errors.push(error);
        }
      }
    },
  },

  computed: {
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
});
</script>
