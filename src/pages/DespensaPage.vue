<template>
    <q-page padding>
        <h1>Pantry</h1>
        <div class="flex justify-center items-center">
          <q-input
          v-model="filter"
          filled
          placeholder="Search ingredient"
          class="width"
        >
          <template v-slot:append>
            <q-btn flat rounded>
              <q-icon name="search" />
            </q-btn>
          </template>
        </q-input>

        <div class="q-pa-md">
          <q-btn-dropdown color="primary" label="Sort">
            <q-list>
              <q-item clickable v-close-popup @click="sortByName">
                <q-item-section>
                  <q-item-label>By Name</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="sortByCaducity">
                <q-item-section>
                  <q-item-label>By Caducity</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="sortByQuantity">
                <q-item-section>
                  <q-item-label>By Quantity</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

        <q-btn color="green" glossy @click="addIngredient">
          <q-icon name="add"/>
        </q-btn>
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
  { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
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
    width: 80%;
  }
</style>





      
      