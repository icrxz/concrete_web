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
            <v-form ref="form" v-model="formValid">
              <v-text-field v-model="user.name" label="Nome" :rules="rules.name" required />
              <v-text-field v-model="user.email" label="Email" type="email" :rules="rules.email" required />
              <v-text-field v-model="user.phone" label="Telefone" />
              <v-text-field v-model="user.role" label="Cargo" :rules="rules.role" required />
              <v-select
                v-model="user.profile"
                :items="profiles"
                item-text="label"
                item-value="role"
                label="Perfil"
                :rules="rules.profile"
              />

              <v-text-field
                v-model="user.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                :rules="rules.password"
                required
                @click:append="showPassword = !showPassword"
              />

              <v-text-field
                v-model="user.passwordConfirmation"
                :append-icon="showConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmation ? 'text' : 'password'"
                label="Confirme sua senha"
                :rules="rules.passwordConfirmation"
                required
                @click:append="showConfirmation = !showConfirmation"
              />
            </v-form>

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

          <v-card-actions class="mb-3">
            <div class="flex-grow-1"></div>
            <v-btn color="warning" @click="handleCancel" class="mr-4">Voltar</v-btn>
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
      errors: Array<string>(),
      formValid: false,
      showPassword: false,
      showConfirmation: false,
      user: UserFrontState,
      profiles: [{
        label: 'Administrador',
        role: 'admin'
      },
      {
        label: 'Designer',
        role: 'design',
      },
      {
        label: 'Leitor',
        role: 'reader'
      }
      ]
    };
  },

  methods: {
    ...mapActions({
      createAction: "users/create"
    }),

    resetForm() {
      (this.$refs.form as HTMLFormElement).reset();
    },

    handleCancel() {
      this.resetForm();
      this.$router.push("/login");
    },

    handleSubmit() {
      if (
        this.user.password === this.user.passwordConfirmation &&
        this.formValid
      ) {
        this.createAction(this.user)
          .then(() => {
            this.resetForm();
            this.$router.push("/login");
          })
          .catch(error => {
            console.log(error);
            this.errors.push(error);
            // this.resetForm();
          });
      }
    },
  },

  computed: {
    rules(): object {
        return {
          name: [
            (v: string) => !!v || 'Nome é necessário',
          ],
          email: [
            (v: string) => !!v || 'Email é necessário',
          ],
          password: [
            (v: string) => !!v || 'Senha é necessária',
          ],
          passwordConfirmation: [
            (v: string) => !!v || 'Confirmação da senha é necessária',
          ],
          role: [
            (v: string) => !!v || 'Cargo é necessário',
          ],
          profile: [
            (v: string) => !!v || 'Perfil é necessário',
          ],
        };
      },
  }
});
</script>

<style scoped>
</style>
