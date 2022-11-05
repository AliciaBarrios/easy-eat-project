<template>
    <div class="fullscreen bg-primary text-white text-center q-pa-md flex column flex-center display-mobile">
        <h1>Page under construction</h1>
        <q-icon name="engineering" size="6rem"/>
        <h2>Thanks for your patience, we hope to see you soon!</h2>
        <q-btn 
            to="/" 
            label="Go home" 
            class="q-mt-xl"
            color="white"
            text-color="orange-5"
            unelevated
            glossy
            />
    </div>

    <div class="fullscreen bg-orange-3 text-white text-center flex column flex-center display-mobile">
        <h2>Page under construction</h2>
        <q-icon name="engineering" size="6rem"/>
        <h4 class="q-pa-sm">Thanks for your patience, we hope to see you soon!</h4>
        <q-btn 
            to="/" 
            label="Go home" 
            class="q-mt-xl"
            color="white"
            text-color="orange-5"
            unelevated
            glossy
            />
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UnderConstructionPage'
});
</script>

<style scoped>

  @media only screen and (max-width: 600px) {
    .display-mobile {
      display: flex;
    }
  }

  /* @media only screen and (min-width: 601px) {
    .display-mobile {
      display: none;
    }
  } */

</style>