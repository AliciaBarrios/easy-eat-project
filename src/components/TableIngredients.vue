<template>
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
                    <q-td key="units" :props="props">
                        <div class="text-pre-wrap">{{ props.row.units }}</div>
                        <q-popup-edit v-model="props.row.units" title="Update units" buttons v-slot="scope">
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
import { defineComponent, ref } from 'vue'

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
    units: 'Litres',
    caducity: 24
  },
  {
    name: 'Ice cream sandwich',
    quantity: 237,
    units: 'Units',
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

const options = [
        'Units', 'Kg', 'Litres', 'Pack'
        ];

export default defineComponent({
    props: { filter: String},

    setup (props) {
        const customSort = (rows, sortBy, descending) => {
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
            });
            }
            return data
        }

        return {
        columns,
        rows: ref(rows),
        customSort,
        options
        }
        }
    });
</script>