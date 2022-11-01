<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated color="secondary">
      <div class="flex column flex-center q-pa-md" >
        <q-img src="../assets/easy-eat-logo-white-tenedor.png" id="logo"/>
        <p class="text-italic q-pt-md">Everything starts in your pantry</p>
      </div>
      <q-tabs    
        v-model="tab"
        dense
        align="justify"
        class="bg-primary text-white"
        :breakpoint="0"
        v-if="$q.screen.gt.md"
        >
          <q-route-tab :to="{ name: 'landing'}" label="ABOUT US" />
          <q-route-tab :to="{ name: 'signup'}" label="SIGN UP" />
          <q-route-tab :to="{ name: 'signin'}" label="MY ACCOUNT" />
      </q-tabs>
    </q-header>
   
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-tabs    
        v-model="tab"
        dense
        align="justify"
        class="bg-primary text-white"
        :breakpoint="0"
        v-if="$q.screen.xs"
        >
          <q-route-tab :to="{ name: 'landing'}" label="ABOUT US" />
          <q-route-tab :to="{ name: 'signup'}" label="SIGN UP" />
          <q-route-tab :to="{ name: 'signin'}" label="MY ACCOUNT" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
    import { ref } from 'vue'
    import { useQuasar } from 'quasar'

    const tab = ref('navbar');
    const $q = useQuasar();
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Life+Savers&display=swap');

  p {
    font-size: 20px;
    letter-spacing: 3px;
    font-family: 'Life Savers', cursive;
    text-align: center;
  }

  #logo {
    max-width: 50%;
  }

  @media only screen and (min-width: 600px) {
    #logo {
    max-width: 35%;
    }
  }

  @media only screen and (min-width: 768px) {
    #logo {
    max-width: 20%;
    }
  }

  @media only screen and (min-width: 1200px) {
    #logo {
    max-width: 15%;
    }
  }
</style>
