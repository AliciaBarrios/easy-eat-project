<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-xl">
        <h6 class="q-mb-lg q-mt-sm">New ingredient</h6>
        <div class="flex row justify-between">  
          <q-input v-model="name" label="Name" style="width: 45%;"/>
          <q-input v-model="caducity" label="Caducity" placeholder="dd/mm/aaaa" style="width: 45%;"/>
          <q-input v-model="quantity" label="Quantity" style="width: 45%;"/>
          <q-select v-model="unit" :options="options" label="Unit" style="width: 45%;"/>
        </div>
        <q-btn class="full-width q-mt-lg" color="primary" @click="onAddClick">Add</q-btn>
    </q-card>
  </q-dialog>
</template>

<script>
  import { ref } from 'vue'
  import { defineComponent } from 'vue'
  import { useDialogPluginComponent } from 'quasar'

  export default defineComponent({
    name: 'DialogAddIngredient',

    emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
    ],

    setup() {
      const name = ref('');
      const caducity = ref('');
      const quantity = ref('');
      const unit = ref(null);
      const options = [
        'Units', 'Kg', 'Liters', 'Pack'
        ];
      
      const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

      const onAddClick = () => {
        onDialogOK()
      }

      return {
        name,
        caducity,
        quantity,
        unit,
        options,
        dialogRef,
        onDialogHide,
        onAddClick
      }
    },
  });
</script>

<style scoped>
</style>
