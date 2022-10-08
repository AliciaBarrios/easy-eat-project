<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="flex flex-center" color="secondary">
      <img src="../assets/easy-eat-logo-white-tenedor.png">
      <p>Come sano en poco tiempo</p>
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
  img{
    width: 300px;
    height: auto;
  }
</style>
