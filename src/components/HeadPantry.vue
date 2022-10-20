<template>
     <div class="flex justify-evenly items-center">
          <q-input
          v-model="filter"
          filled
          placeholder="Search ingredient"
          class="width"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn color="green" glossy @click="addIngredient">
            <q-icon name="add"/>
          </q-btn>
    </div>
</template>

<script>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  import { defineComponent } from 'vue'
  import DialogAddIngredient from '../components/DialogAddIngredient.vue'
    import { watch } from 'vue'

  export default defineComponent({
    name: 'HeadPantry',
    emits: [ 'filterEmit' ],

    setup (props, {emit}) {
        const filter = ref('');
        const $q = useQuasar();

        const addIngredient = () => {
            $q.dialog({
                component: DialogAddIngredient,
            });
        }
        
        watch(() => filter.value, (newValue) => emit('filterEmit', newValue));
        return {
            filter,
            addIngredient,
        }
  }
});
</script>

<style scoped>
  .width {
    width: 85%;
  }
</style>