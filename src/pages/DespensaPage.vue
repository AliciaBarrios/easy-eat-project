<template>
    <q-page padding>
        <h2>Pantry</h2>
        <div class="flex justify-evenly items-center">
          <q-input
          v-model="filter"
          filled
          placeholder="Search ingredient"
          class="width"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn color="green" glossy @click="addIngredient">
          <q-icon name="add"/>
        </q-btn>

        <div class="container flex justify-center">
          <h6 class="q-mb-lg q-mt-sm">New ingredient</h6>
          <div class="flex row justify-between">  
            <q-input v-model="name" label="Name" :dense="dense" style="width: 45%;"/>
            <q-input v-model="caducity" label="Caducity" placeholder="dd/mm/aaaa" :dense="dense" style="width: 45%;"/>
            <q-input v-model="quantity" label="Quantity" :dense="dense" style="width: 45%;"/>
            <q-select v-model="unit" :options="options" label="Unit" :dense="dense" style="width: 45%;"/>
          </div>
          <q-btn class="full-width q-mt-lg">Add</q-btn>
        </div>
      </div>
      
      <div class="q-pa-md">
        <q-table
          :dense="$q.screen.lt.md"
          title="Ingredients"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :filter="filter"
          :sort-method="customSort"
          binary-state-sort
        />
      </div>
    </q-page>
</template>

<script>
  import { ref } from 'vue'

  const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true },
  { name: 'units', label: 'Units', field: 'units', sortable: true },
  { name: 'caducity', label: 'Caducity', field: 'caducity', sortable: true },
]

const rows = [
  {
    name: 'Frozen Yogurt',
    quantity: 159,
    units: 6.0,
    caducity: 24
  },
  {
    name: 'Ice cream sandwich',
    quantity: 237,
    units: 9.0,
    caducity: 37
  },
  {
    name: 'Eclair',
    quantity: 262,
    units: 16.0,
    caducity: 23
  },
  {
    name: 'Cupcake',
    quantity: 305,
    units: 3.7,
    caducity: 67
  },
  {
    name: 'Gingerbread',
    quantity: 356,
    units: 16.0,
    caducity: 49
  },
  {
    name: 'Jelly bean',
    quantity: 375,
    units: 0.0,
    caducity: 94
  },
  {
    name: 'Lollipop',
    quantity: 392,
    units: 0.2,
    caducity: 98
  },
  {
    name: 'Honeycomb',
    quantity: 408,
    units: 3.2,
    caducity: 87
  },
  {
    name: 'Donut',
    quantity: 452,
    units: 25.0,
    caducity: 51
  },
  {
    name: 'KitKat',
    quantity: 518,
    units: 26.0,
    caducity: 65
  }
]


  export default {
    setup () {
      return {
      filter: ref(''),
      columns,
      rows,
      name: ref(''),
      caducity: ref(''),
      quantity: ref(''),
      model: ref(null),
      options: [
        'units', 'Kg', 'l', 'pack'
      ],

      sortByName () {
        // console.log('Clicked on an Item')
      },

      sortByCaducity () {
        // console.log('Clicked on an Item')
      },

      sortByQuantity () {
        // console.log('Clicked on an Item')
      },

      addIngredient () {

      },

      customSort (rows, sortBy, descending) {
        const data = [...rows]

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
          })
        }
        return data
      }
    }
  }
}
</script>

<style scoped>
  .width {
    width: 85%;
  }
  .container {
    max-width: 30%; 
    border: 2px solid #26A69A;
    border-radius: 15px;
    padding: 2rem;
  }
</style>





      
      