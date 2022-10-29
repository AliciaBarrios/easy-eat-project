<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-xl">
        <h6 class="q-mb-lg q-mt-sm">New ingredient</h6>
        <div class="flex row justify-between">  
          <q-input v-model="name" label="Name" style="width: 45%;"/>
          <q-input v-model="date" label="Caducity"  mask="####-##-##" placeholder="aaaa-mm-dd" style="width: 45%;"> 
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

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

      const name = ref('');
      const quantity= ref('');
      const unit= ref('');
      const caducity = ref('');
      
      // const date = '';
     
      // const row = reactive({
      //   name: '',
      //   quantity: '',
      //   unit: '',
      //   caducity: '',
      // });

      const ingredientStore = useIngredientsStore();
      const { ingredients } = storeToRefs(ingredientStore);

      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);

      // const rows = reactive([]);

      const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
      
      const newIngredient = async() => {
          await userStore.fetchUser();
          await ingredientStore.insertIngredient(user.value.id, name, quantity, unit, caducity);
          await ingredientStore.fetchIngredients();
      }

      const onAddClick = () => {
        newIngredient()
        onDialogOK()
        console.log(user.value.id)
      };

      return {
        options,
        // row,
        // rows,
        dialogRef,
        onDialogHide,
        onAddClick,
        newIngredient,
        ingredients,
        user,
        name,
        quantity,
        caducity,
        unit,
        date: ref(''),
      }
    },
  });
</script>

<style scoped>
</style>
