<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-xl">
        <h6 class="q-mb-lg q-mt-sm">New ingredient</h6>
        <div class="flex row justify-between">  
          <q-input v-model="row.name" label="Name" style="width: 45%;"/>
          <q-input v-model="row.caducity" label="Caducity" placeholder="aaaa/mm/dd" mask="date" style="width: 45%;"> 
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="row.caducity">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Done" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
  import { useIngredientsStore } from '../stores/ingredients'
  import { useUserStore } from '../stores/user'
  import { storeToRefs } from 'pinia'

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
        caducity: '',
      });

      //modificación para cuadrar formato fecha supabase
      row.caducity.replace('/','-');

      const ingredientStore = useIngredientsStore();
      const { ingredients } = storeToRefs(ingredientStore);

      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);

      const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
      
      const newIngredient = async() => {
          await userStore.fetchUser();
          await ingredientStore.insertIngredient(user.value.id, row.name, row.quantity, row.unit, row.caducity);
          await ingredientStore.fetchIngredients();
      }

      const onAddClick = () => {
        newIngredient()
        onDialogOK()
        console.log(user.value.id)
      };

      return {
        options,
        row,
        dialogRef,
        onDialogHide,
        onAddClick,
        newIngredient,
        ingredients,
        user,
      }
    },
  });
</script>

<style scoped>
</style>
