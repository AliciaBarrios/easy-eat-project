<template>
    <q-page padding>
        <h2>Hello *User*</h2>
        <div class="flex column items-center">
          <h4 
          class="text-weight-light text-center" 
          style="width:70%;"
          >
            Today we will leave your food to chance, click the button 
            to see what the EasyEat holds for you...
          </h4>
          <q-btn :loading="loading" color="primary" @click="showRandomRecipe()" style="width: 150px">
            Good Luck
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Good luck...
            </template>
          </q-btn>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RecipeComponent from '../components/RecipeComponent.vue'
  
import { useRecipesStore } from '../stores/recipes'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
  
const recipeStore = useRecipesStore();
const { recipes } = storeToRefs(recipeStore);

export default defineComponent({
  name: 'HomePage',

  setup () {
    const loading = ref(false)

    const progress = ref(false)

    const $q = useQuasar();

    const fetchRecipes = async() => {
      await recipeStore.fetchRecipes();
    }

    fetchRecipes();

    const random = ref('');

    function getRandomInt(length) {
      return Math.floor(Math.random() * length);
    }
    
    function showRandomRecipe () {
      // we set loading state
      loading.value = true;

      random.value = getRandomInt(recipes.value.length);
      const recipe = recipes.value[random.value];

      // simulate a delay to create expectation
      setTimeout(() => {
        // we're done, we reset loading state
        loading.value = false

        $q.dialog({
          component: RecipeComponent,
          componentProps: {
            recipe: recipe,
          }
        });   
      }, 3000)
    }

    return {
      loading,
      progress,
      showRandomRecipe,
      fetchRecipes,
      recipes,
      getRandomInt,
      random,
    }
  }


});
</script>