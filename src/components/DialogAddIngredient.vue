<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-xl">
        <h6 class="q-mb-lg q-mt-sm">New ingredient</h6>
        <div class="flex row justify-between">  
          <q-input v-model="row.name" label="Name" style="width: 45%;"/>
          <q-input v-model="row.caducity" label="Caducity" placeholder="dd/mm/aaaa" style="width: 45%;"/>
          <q-input v-model="row.quantity" label="Quantity" style="width: 45%;"/>
          <q-select v-model="row.unit" :options="options" label="Unit" style="width: 45%;"/>
        </div>
        <q-btn class="full-width q-mt-lg" color="primary" @click="onAddClick">Add</q-btn>
    </q-card>
  </q-dialog>
</template>

<script>
  import { reactive } from 'vue'
  import { defineComponent } from 'vue'
  import { useDialogPluginComponent } from 'quasar'

  // import { useIngredientsStore } from '../stores/ingredients'
  // import { storeToRefs } from 'pinia'

  export default defineComponent({
    name: 'DialogAddIngredient',

    emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
    ],

    setup() {
      const options = [
        'Units', 'Kg', 'Litres', 'Pack'
        ];

     
      const row = reactive({
        name: '',
        quantity: '',
        unit: '',
        caducity: null
      });

      // const ingredientsStore = useIngredientsStore();
      // const { ingredients } = storeToRefs(ingredientsStore);
      const rows = reactive([]);

      const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

      const onAddClick = () => {
        rows.push(row);
        onDialogOK()
        // const store = useIngredientsStore();
        // store.fetchIngredients();
      };

      

      return {
        options,
        row,
        rows,
        dialogRef,
        onDialogHide,
        onAddClick
      }
    },
  });
</script>

<style scoped>
</style>
