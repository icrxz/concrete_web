<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="12" sm="8" md="5">
        <v-card class="py-8 elevation-12">
          <v-row class="mb-6" justify="center">
            <img src="@/assets/logo.png" width="20%">
          </v-row>

          <v-row justify="center">
            <v-toolbar-title>Bem Vindo ao Concrete CC</v-toolbar-title>
          </v-row>

          <v-card-text>
            <v-form ref="form" v-model="formValid">
              <v-text-field
                v-model="user.email"
                label="E-mail"
                :rules="rules.email"
                @keypress="handleKeyEnter"
                type="email"
                required
              />

              <v-text-field
                v-model="user.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Senha"
                :rules="rules.password"
                required
                @click:append="show = !show"
                @keypress="handleKeyEnter"
              />
            </v-form>

            <v-row>
              <v-btn small text>
                Esqueceu a senha?
              </v-btn>
            </v-row>

            <template v-if="errors.length">
              <div id="errors-messages">
                <ul>
                  <li v-for="(errors, field) in errors" :key="(errors, field)">
                    {{ errors }}
                  </li>
                </ul>
              </div>
            </template>
          </v-card-text>

          <div>
            <v-row justify="center">
              <v-btn
                color="success"
                @click="handleSubmit"
                large
                class="mb-5 text-decoration-none"
              >
                Entrar
              </v-btn>
            </v-row>

            <v-row justify="center">
              <div class="text-body-2">
                Novo por aqui?
                <router-link
                  class="text-decoration-none"
                  :to="{name: 'CreateUser'}"
                >
                  Crie uma conta
                </router-link>
              </div>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: '',

  data() {
    return {
      errors: Array<string>(),
      formValid: false,
      show: false,
      user: {
        email: null,
        password: null,
      },
    };
  },

  methods: {
    ...mapActions({
      loginAction: 'authentication/login',
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
          const userDetails = {
            email: this.user.email,
            password: this.user.password,
          };
          await this.loginAction(userDetails);
          this.resetForm();
          this.$router.push({ name: 'Home' });
        } catch (error) {
          this.errors.push(error);
        }
      }
    },
  },

  computed: {
    rules(): object {
      return {
        email: [
          (v: string) => !!v || 'Email é necessário',
        ],
        password: [
          (v: string) => !!v || 'Senha é necessária',
        ],
      };
    },
  },

  beforeCreate() {
    if (localStorage.Authenticated === 'true') {
      this.$router.push({ name: 'Home' });
    }
  },
});
</script>

<style scoped>
#errors-messages li {
  color: red;
  font-size: 1.15em;
}
</style>
