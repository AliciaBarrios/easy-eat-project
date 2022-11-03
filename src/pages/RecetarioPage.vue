<template>
  <q-page padding>
      <h2>Recipes</h2>
      <HeadRecipes @filterEmit='sendInfo'/>
      <TableRecipes :filter='info'/>
    </q-page>
</template>

<script>
  import HeadRecipes from '../components/HeadRecipes.vue'
  import TableRecipes from '../components/TableRecipes.vue'
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    components: { HeadRecipes, TableRecipes },

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