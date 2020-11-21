<template>
    <v-card class="grey lighten-5">
      <v-card-title>
        <span class="headline">Alterar Arquivo</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-file-input
                accept="image/*"
                label="Novo Arquivo"
                v-model="newFile.file"
                required
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-text-field
                v-model="newFile.desc"
                label="Descrição"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          text
          @click="handleCancel"
        >
          Sair
        </v-btn>
        <v-btn
          color="success"
          text
          @click="handleSave"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FileChanger',

  data() {
    return {
      formData: new FormData,
      newFile: {
        file: '',
        desc: '',
      }
    };
  },

  methods: {
    resetForm() {
      this.newFile.file = '';
      this.newFile.desc = '';
    },
    
    handleCancel() {
      this.$emit('cancel');
      this.resetForm();
    },

    handleSave() {
      this.formData.append('file', this.newFile.file);
      this.formData.append('desc', this.newFile.desc);

      this.$emit('save', this.formData);
      this.resetForm();
    }
  },
});
</script>
