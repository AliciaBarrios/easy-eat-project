<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated color="secondary">
      <div class="flex column flex-center q-pa-md" >
        <q-img src="../assets/easy-eat-logo-white-tenedor.png" style="max-width: 8%" class="q-pa-xl" />
        <p class="text-italic q-pt-md">Everything starts in your pantry</p>
      </div>
      <q-tabs    
        v-model="tab"
        dense
        align="justify"
        class="bg-primary text-white"
        :breakpoint="0"
        >
          <q-route-tab :to="{ name: 'landing'}" label="ABOUT US" />
          <q-route-tab :to="{ name: 'signup'}" label="SIGN UP" />
          <q-route-tab :to="{ name: 'signin'}" label="MY ACCOUNT" />
      </q-tabs>
    </q-header>
   
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
    import { ref } from 'vue'

    const tab = ref('navbar');

    const rightDrawerOpen = ref(false);

    function toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
        return rightDrawerOpen;
    };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Life+Savers&display=swap');

  p {
    font-size: 20px;
    letter-spacing: 3px;
    font-family: 'Life Savers', cursive;
  }
</style>
