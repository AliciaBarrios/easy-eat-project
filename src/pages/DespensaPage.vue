<template>
    <q-page padding>
      <h2>Pantry</h2>
      <HeadPantry @filterEmit='sendInfo'/>
      <TableIngredients :filter='info'/>
    </q-page>
</template>

<script>
  import HeadPantry from '../components/HeadPantry.vue'
  import TableIngredients from '../components/TableIngredients.vue'
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    components: { HeadPantry, TableIngredients },

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






      
      