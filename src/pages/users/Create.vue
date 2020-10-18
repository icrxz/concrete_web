<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark flat>
            <v-toolbar-title>Criar Usuário</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-tooltip bottom></v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field v-model="user.name" label="Nome" required />
              <v-text-field v-model="user.email" label="Email" type="email" required />
              <v-text-field v-model="user.phone" label="Telefone" />
              <v-text-field v-model="user.role" label="Cargo" />
              <v-text-field v-model="user.profile" label="Perfil" />

              <v-text-field
                v-model="user.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                required
                @click:append="showPassword = !showPassword"
              />

              <v-text-field
                v-model="user.confirmPassword"
                :append-icon="showConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmation ? 'text' : 'password'"
                label="Confirme sua senha"
                required
                @click:append="showConfirmation = !showConfirmation"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="mb-3">
            <div class="flex-grow-1"></div>
            <v-btn color="warning" :to="{name: 'Login'}" class="mr-4">Voltar</v-btn>
            <v-btn color="success" @click="handleSubmit" class="mr-4">Criar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import UserFrontState from '@/store/states/user.state';

export default Vue.extend({
  data() {
    return {
      showPassword: false,
      showConfirmation: false,
      user: UserFrontState,
    };
  },
  methods: {
    ...mapActions({
      createAction: "users/create"
    }),

    resetForm() {
      (this.$refs.form as HTMLFormElement).reset();
    },

    handleSubmit() {
      this.createAction(this.user)
        .then(() => {
          this.resetForm();
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error);
          // this.resetForm();
        });
    }
  }
});
</script>

<style scoped>
</style>
