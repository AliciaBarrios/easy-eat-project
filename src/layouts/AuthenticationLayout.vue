<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="flex column flex-center q-pa-md" color="secondary">
      <q-img src="../assets/easy-eat-logo-white-tenedor.png" style="max-width: 15%" class="q-pa-xl" />
      <p class="text-italic q-pt-md">Todo empieza en tu despensa</p>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Life+Savers&display=swap');

  p {
    font-size: 24px;
    letter-spacing: 3px;
    font-family: 'Life Savers', cursive;
  }
</style>
