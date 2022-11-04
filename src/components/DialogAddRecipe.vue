<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-xl">
        <h6 class="q-mb-lg q-mt-sm">New recipe</h6>
        <div class="flex row justify-between">  
          <q-input v-model="row.title" label="Title" style="width: 45%;"/>
          <q-input v-model="row.ingredients" label="Ingredients" style="width: 45%;"/> 
          <q-input v-model="row.steps" label="Steps" style="width: 45%;"/>
        </div>
        <q-btn class="full-width q-mt-lg" color="primary" @click="onAddClick">Add</q-btn>
    </q-card>
  </q-dialog>
</template>

<script>
  import { reactive, ref } from 'vue'
  import { defineComponent } from 'vue'
  import { useDialogPluginComponent } from 'quasar'
  import { useRecipesStore } from '../stores/recipes'
  import { useUserStore } from '../stores/user'
  import { storeToRefs } from 'pinia'

  export default defineComponent({
    name: 'DialogAddRecipe',

    emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
    ],

    setup() {

      const row = reactive({
        title: '',
        ingredients: '',
        steps: '',
      });

      const recipeStore = useRecipesStore();
      const { recipes } = storeToRefs(recipeStore);

      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);

      const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
      
      const newRecipe= async() => {
          await userStore.fetchUser();
          await recipeStore.insertRecipe(user.value.id, row.title, row.ingredients, row.steps);
          await recipeStore.fetchRecipes();
      }

      const onAddClick = () => {
        newRecipe()
        onDialogOK()
        console.log(user.value.id)
      };

      return {
        row,
        dialogRef,
        onDialogHide,
        onAddClick,
        newRecipe,
        recipes,
        user
      }
    },
  });
</script>
