<template>
     <div class="flex display-direction justify-evenly items-center">
          <q-input
          v-model="filter"
          filled
          placeholder="Search ingredient"
          class="width q-mb-sm"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn color="green" class="q-mb-sm" glossy @click="addIngredient">
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

  @media only screen and (max-width: 600px) {
    .display-direction {
      display: flex;
      flex-direction: column;
    }
  }

  @media only screen and (min-width: 601px) {
    .display-direction {
      display: flex;
      flex-direction: row;
    }
  }
</style>