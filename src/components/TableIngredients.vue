<template>
  <div class="q-pa-md">
        <q-table
          :dense="$q.screen.lt.md"
          title="Ingredients"
          :rows="ingredients || []"
          :columns="columns"
          row-key="name"
          :filter="filter"
          :sort-method="customSort"
          binary-state-sort
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">
                        {{ props.row.name }}
                        <q-popup-edit v-model="props.row.name" title="Update name" buttons v-slot="scope">
                        <q-input v-model="scope.value" dense autofocus counter />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="quantity" :props="props">
                        {{ props.row.quantity }}
                        <q-popup-edit v-model="props.row.quantity" title="Update quantity" buttons v-slot="scope">
                        <q-input type="number" v-model="scope.value" dense autofocus />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="unit" :props="props">
                        <div class="text-pre-wrap">{{ props.row.unit }}</div>
                        <q-popup-edit v-model="props.row.unit" title="Update units" buttons v-slot="scope">
                        <q-select :options='options' v-model="scope.value" dense autofocus />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="caducity" :props="props">{{ props.row.caducity }}</q-td>
                </q-tr>
            </template>
        </q-table>

    </div>
    
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue'

import { useIngredientsStore } from '../stores/ingredients'
import { storeToRefs } from 'pinia'

const ingredientStore = useIngredientsStore();
const { ingredients } = storeToRefs(ingredientStore);
const rows = [];

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: ingredient => ingredient.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true },
  { name: 'unit', label: 'Unit', field: 'unit', sortable: true },
  { name: 'caducity', label: 'Caducity', field: 'caducity', sortable: true },
]

const options = [
        'Units', 'Kg', 'Litres', 'Pack'
        ];

export default defineComponent({
    props: { filter: String},

    setup (props) {
        const customSort = (ingredients, sortBy, descending) => {
            const data = [...ingredients]

            if (sortBy) {
            data.sort((a, b) => {
                const x = descending ? b : a
                const y = descending ? a : b

                if (sortBy === 'name') {
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
      
        const fetchIngredients = async() => {
          await ingredientStore.fetchIngredients();
          console.log(ingredients, "#### Esto es el fetch")
          // rows = ingredients;
        }

        fetchIngredients();

        console.log('ingredients2:', ingredients);
        console.log('rows:', rows);

        return {
        columns,
        rows: reactive(rows),
        customSort,
        options,
        // getTable,
        ingredients,
        }
        }
    });
</script>