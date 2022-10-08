<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="flex column flex-center" color="secondary">
      <q-img src="../assets/easy-eat-logo-white-tenedor.png" style="max-width: 15%" class="q-ma-md"/>
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