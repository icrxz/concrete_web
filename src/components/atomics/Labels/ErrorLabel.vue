<template>
  <div id="errors-messages">
    <ul>
      <li v-for="(errors, field) in errors" :key="(errors, field)">
        {{ errors }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'ErrorLabel',

  props: {
    errors: {
      type: String,
      required: true,
    },

    title: String,
  },
});
</script>

<style scoped>
#errors-messages li {
  color: red;
  font-size: 1.15em;
}
</style>
