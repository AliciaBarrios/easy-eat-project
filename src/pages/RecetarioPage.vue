<template>
  <q-page padding>
      <h2>Recipes</h2>
      <HeadPantry @filterEmit='sendInfo'/>
      <TableRecipes :filter='info'/>
    </q-page>
</template>

<script>
  import HeadPantry from '../components/HeadPantry.vue'
  import TableRecipes from '../components/TableRecipes.vue'
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    components: { HeadPantry, TableRecipes },

    setup() {
      const info = ref('');
      const sendInfo = (searchedWord) => {
        info.value = searchedWord;
      }

      return {
        info,
        sendInfo,
      }
    }
  });
</script>