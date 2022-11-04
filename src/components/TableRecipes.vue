<template>
 <div class="q-pa-md">
    <q-table
      :dense="$q.screen.lt.md"
      title="Recipes"
      :rows="recipes || []"
      :columns="columns"
      row-key="title"
      :filter="filter"
      :sort-method="customSort"
      binary-state-sort
    >
      <template v-slot:body="recipes">
        <q-tr :props="recipes">
          <td key="recipe" auto-width>
            <q-btn icon="visibility" size="sm" color="primary" round dense @click="viewRecipe(recipes.row)" />
          </td>

          <q-td key="title" :props="recipes" :style="{ whiteSpace: 'pre-wrap' }">
              {{ recipes.row.title }}
              <q-popup-edit v-model="recipes.row.title" title="Update title" v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter />
                <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateTitle(scope.value, recipes.row.id)" v-close-popup/>
                <q-btn flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
              </q-popup-edit>
          </q-td>
            
          <q-td key="cook_time" :props="recipes">
              {{ recipes.row.cook_time }}
              <q-popup-edit v-model="recipes.row.cook_time" title="Update Cook Time" v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter />
                <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateCookTime(scope.value, recipes.row.id)" v-close-popup/>
                <q-btn flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
              </q-popup-edit>
          </q-td>

          <q-td key="rate" :props="recipes">
              {{ recipes.row.rate }}
              <q-popup-edit v-model="recipes.row.rate" title="Update rate" v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter />
                <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateRate(scope.value, recipes.row.id)" v-close-popup/>
                <q-btn flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
              </q-popup-edit>
          </q-td>

          <div style="margin-top: 10px; padding-bottom: 10px;" class="flex justify-center items-center">
            <q-btn
              :glossy="$q.screen.gt.xs"
              :flat="$q.screen.xs"
              class="button"
              size="md"
              @click="removeRecipe(recipes.row.id)"
              >
              <q-icon name='remove_circle_outline'></q-icon>
            </q-btn>
           </div>
        </q-tr>
      </template>
    </q-table>
  </div> 
</template>
  
<script>
  import { defineComponent } from 'vue'
  import RecipeComponent from './RecipeComponent.vue'
  
  import { useRecipesStore } from '../stores/recipes'
  import { storeToRefs } from 'pinia'
  import { useQuasar } from 'quasar'
  
  const recipeStore = useRecipesStore();
  const { recipes } = storeToRefs(recipeStore);
  
  const columns = [
    { name: 'recipe', align: 'left', label: 'Full Recipe', field: 'recipe'},
    { 
      name: 'title', 
      style:'max-width: 60px', 
      headerStyle: 'max-width: 60px',
      required: true, 
      label: 'Title', 
      align: 'left', 
      field: recipe => recipe.title, 
      format: val => `${val}`, 
      sortable: true 
    },
    { name: 'cook_time', align: 'center', label: 'Cook Time', field: 'cook_time', sortable: true },
    { name: 'rate', align: 'center', label: 'Rate', field: 'rate', sortable: true },
  ]
  
  export default defineComponent({
      props: { filter: String},
  
      setup (props) {
        const customSort = (recipes, sortBy, descending) => {
          const data = [...recipes]

          if (sortBy) {
            data.sort((a, b) => {
              const x = descending ? b : a
              const y = descending ? a : b

              if (sortBy === 'title') {
                // string sort
                return x[ sortBy ] > y[ sortBy ] ? 1 : x[ sortBy ] < y[ sortBy ] ? -1 : 0
              } else {
                // numeric sort
                return parseFloat(x[ sortBy ]) - parseFloat(y[ sortBy ])
              }
            });
          }
          return data
        }

        const $q = useQuasar();

        const viewRecipe = (recipe) => {
          $q.dialog({
              component: RecipeComponent,
              componentProps: {
                recipe: recipe,
              }
          });
        }

        const fetchRecipes = async() => {
          await recipeStore.fetchRecipes();
        }
  
        fetchRecipes();

        const removeRecipe = async(recipeId) => {
          try {
            await recipeStore.deleteRecipe(recipeId);
            await recipeStore.fetchRecipes();
          } catch (error) {
            console.log('error', error);
          }
        }
  
        const updateTitle = async(newItem, recipeId) => {
          try {
            await recipeStore.updateTitleRecipe(newItem, recipeId);
            await recipeStore.fetchRecipes();
          } catch (error) {
            console.log('error', error);
          }
        }
  
        const updateCookTime = async(newItem, recipeId) => {
          try {
            await recipeStore.updateCookTimeRecipe(newItem, recipeId);
            await recipeStore.fetchRecipes();
          } catch (error) {
            console.log('error', error);
          }
        }

        const updateRate = async(newItem, recipeId) => {
          try {
            await recipeStore.updateRateRecipe(newItem, recipeId);
            await recipeStore.fetchRecipes();
          } catch (error) {
            console.log('error', error);
          }
        }

        return {
          columns,
          recipes,
          customSort,
          removeRecipe,
          updateTitle,
          updateCookTime,
          updateRate,
          viewRecipe
        }
      }
    });
</script>
  
<style scoped>
  @media only screen and (max-width: 849px) {
    .button {
    color: red;
    padding: 0;
    margin-right: 0.5rem;
    }
  }

  @media only screen and (min-width: 850px) {
    .button {
    background-color: rgb(243, 28, 28);
    color: white;
    }
  }
</style>