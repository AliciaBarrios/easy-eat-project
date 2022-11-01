<template>
    <div class="container">
        <q-card 
        v-for="(recipe, index) in recipes" 
        :key="index" 
        class="q-ma-sm card-width" 
        style="height:max-content;"
        >
            <q-card-section>
                <span>Title:</span> {{ recipe.title }}
            </q-card-section>
            <q-card-section>
                <span>Ingredients:</span>
                <q-list 
                v-for="(ingredient, index) in recipe.ingredients" 
                :key="index" 
                style="max-height:30px"
                >
                    <q-item> {{ ingredient }} </q-item>
                </q-list>
            </q-card-section>
            <q-card-section >
                <span>Steps:</span>
                <q-list v-for="(step, index) in recipe.steps" :key="index">
                    <q-item> {{ index + 1}}. {{ step }} </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </div>
   

 <!-- <div class="q-pa-md">
      <q-table
        :dense="$q.screen.lt.md"
        title="Recipes"
        :rows="recipes || []"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :sort-method="customSort"
        binary-state-sort
      >
        <template v-slot:body="recipes">
          <q-tr :props="recipes">
            <q-td key="title" :props="recipes">
                {{ recipes.row.title }}
                <q-popup-edit v-model="recipes.row.title" title="Update title" v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter />
                  <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateTitle(scope.value, recipes.row.id)" v-close-popup/>
                  <q-btn type="" flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
                </q-popup-edit>
            </q-td>
            
            <q-td key="ingredients" :props="recipes">
                <q-list v-for="(ingredient, index) in recipes.row.ingredients" :key="index" class="flex row">
                    <q-item>{{ index + 1 }}. {{ ingredient }}</q-item>
                </q-list>
                <q-popup-edit v-model="recipes.row.ingredients" title="Update ingredients" v-slot="scope">
                <q-input type="number" v-model="scope.value" dense autofocus />
                <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateIngredients(scope.value, recipes.row.id)" v-close-popup/>
                <q-btn type="" flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
                </q-popup-edit>
            </q-td>
            
            <q-td key="steps" :props="recipes">
                <q-list v-for="(step, index) in recipes.row.steps" :key="index">
                    <q-item>{{ index + 1 }}. {{ step }}</q-item>
                </q-list>
                <q-popup-edit v-model="recipes.row.steps" title="Update steps" v-slot="scope">
                  <q-select v-model="scope.value" dense autofocus />
                  <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateSteps(scope.value, recipes.row.id)" v-close-popup/>
                  <q-btn type="" flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
                </q-popup-edit>
            </q-td>

            <div style="margin-top: 10px; padding-bottom: 10px;" class="flex justify-center items-center">
              <q-btn
                :glossy="$q.screen.gt.md"
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
    </div>  -->
 
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  import { useRecipesStore } from '../stores/recipes'
  import { storeToRefs } from 'pinia'
  
  const recipeStore = useRecipesStore();
  const { recipes } = storeToRefs(recipeStore);
  
  const columns = [
    {
      name: 'title',
      required: true,
      label: 'Title',
      align: 'left',
      field: recipe => recipe.title,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'ingredients', align: 'center', label: 'Ingredients', field: 'ingredients', sortable: true },
    { name: 'steps', align: 'left', label: 'Steps', field: 'steps', sortable: true },
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
                  }
                  else {
                  // numeric sort
                  return parseFloat(x[ sortBy ]) - parseFloat(y[ sortBy ])
                  }
              });
              }
              return data
          }
        
          const fetchRecipes = async() => {
            await recipeStore.fetchRecipes();
          }
  
          fetchRecipes();
  
          const removeRecipe = async(recipeId) => {
            try {
              await recipeStore.deleteIngredient(recipeId);
              await recipeStore.fetchIngredients();
            } catch (error) {
              console.log('error', error);
            }
          }
  
          const updateTitle = async(newItem, recipeId) => {
            try {
              await recipeStore.updateNameIngredient(newItem, recipeId);
              await recipeStore.fetchIngredients();
            } catch (error) {
              console.log('error', error);
            }
          }
  
          const updateIngredients = async(newItem, recipeId) => {
            try {
              await recipeStore.updateQuantityIngredient(newItem, recipeId);
              await recipeStore.fetchIngredients();
            } catch (error) {
              console.log('error', error);
            }
          }
  
          const updateSteps = async(newItem, recipeId) => {
            try {
              await recipeStore.updateUnitIngredient(newItem, recipeId);
              await recipeStore.fetchIngredients();
            } catch (error) {
              console.log('error', error);
            }
          }
  
          console.log('ingredients2:', recipes);
  
          return {
            columns,
            // rows: reactive(rows),
            recipes,
            customSort,
            removeRecipe,
            updateTitle,
            updateIngredients,
            updateSteps
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
      .card-width{
        width: 100%;
      }
    }
  
    @media only screen and (min-width: 850px) {
      .button {
      background-color: rgb(243, 28, 28);
      color: white;
      }
      .card-width{
        width: 30%;
      }
    }
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
  </style>