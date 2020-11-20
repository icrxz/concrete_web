<template>
  <v-card class="py-4">
    <img src="@/assets/logo.png" class="titleImage" />
    <v-card-title class="title">
      Concrete CC
    </v-card-title>

    <v-card-text class="infoText">
      <span>
        Seja bem-vindo à Home do Concrete! Aqui você pode visualizar os seus últimos 5 projetos, acessar
      as suas organizações e ter rápido acesso às configurações da sua conta.
      </span>
      <br />
      <br />
      <span>
      Com o Concrete você pode salvar as versões dos seus projetos a cada passo que avança nos seus trabalhos 
      e compartilhá-los com quem quiser que você tenha acesso. Caso deseja saber mais, visite a nossa documentação!
      </span>
    </v-card-text>
    <span style="font-size: 12px;">&copy; By Modular Company</span>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'InfoCard',
});
</script>

<style scoped>
  .titleImage {
    width: 50%;
  }

  .title {
    display: flex;
    text-align: center;
    justify-content: center;
  }

  .infoText {
    font-size: 14px;
    justify-items: left;
  }
</style>
