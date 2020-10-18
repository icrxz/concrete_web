<template>
  <v-text-field
    v-model="model"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    label="Password"
    required
    @click:append="show = !show"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    model: {
      required: true,
      type: String,
    }
  }
});
</script>
