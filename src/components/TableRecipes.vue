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
            <q-td auto-width>
              <q-btn size="sm" color="primary" round dense @click="recipes.expand = !recipes.expand" :icon="recipes.expand ? 'remove' : 'add'" />
            </q-td>

            <q-td key="title" :props="recipes">
                {{ recipes.row.title }}
                <q-popup-edit v-model="recipes.row.title" title="Update title" v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter />
                  <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateTitle(scope.value, recipes.row.id)" v-close-popup/>
                  <q-btn type="" flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
                </q-popup-edit>
            </q-td>
            
            <q-td key="cook_time" :props="recipes">
                {{ recipes.row.cook_time }}
                <q-popup-edit v-model="recipes.row.cook_time" title="Update Cook Time" v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter />
                  <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateCookTime(scope.value, recipes.row.id)" v-close-popup/>
                  <q-btn type="" flat color="primary" class="q-mt-md" label="Close" v-close-popup/>
                </q-popup-edit>
            </q-td>

            <q-td key="rate" :props="recipes">
                {{ recipes.row.rate }}
                <q-popup-edit v-model="recipes.row.rate" title="Update rate" v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter />
                  <q-btn flat color="primary" class="q-mt-md" label="Save" @click="updateRate(scope.value, recipes.row.id)" v-close-popup/>
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

          <q-tr v-show="recipes.expand" :props="recipes">
            <q-td colspan="100%">
              <div class="container">
                <q-card 
                class="q-ma-sm card-width" 
                style="height:max-content;"
                >
                  <q-card-section>
                    <q-item-label 
                    overline 
                    class="text-center text-primary"
                    >
                    {{ recipes.row.title }}
                  </q-item-label>

                  </q-card-section>

                  <q-separator spaced />
                  <q-card-section>
                      <span :props="recipes" class="text-primary">Ingredients:</span>
                      <q-list padding v-for="(ingredient, index) in recipes.row.ingredients" :key="index" class="flex row">
                        <q-item-label>{{ index + 1 }}. {{ ingredient }}</q-item-label>
                      </q-list>
                  </q-card-section>
                  <q-card-section style="max-width: 350px">
                      <span :props="recipes" class="text-primary">Steps:</span>
                      <q-list v-for="(step, index) in recipes.row.steps" :key="index">
                        <q-item-label style="width:max-content">{{ index + 1 }}. {{ step }}</q-item-label>
                      </q-list>
                  </q-card-section>
                </q-card>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div> 
 
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  import { useRecipesStore } from '../stores/recipes'
  import { storeToRefs } from 'pinia'
  
  const recipeStore = useRecipesStore();
  const { recipes } = storeToRefs(recipeStore);
  
  const columns = [
    { name: '', align: 'center', label: 'Full Recipe', field: ''},
    {
      name: 'title',
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
  
          console.log('recipes2:', recipes);
  
          return {
            columns,
            recipes,
            customSort,
            removeRecipe,
            updateTitle,
            updateCookTime,
            updateRate
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
    }
    .card-width{
        width: 90%;
      }
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
  </style>