<template>
  <q-page padding>
    <h2>Menu</h2>
      <div>
        <q-splitter
          v-model="splitterModel"
          style="height: 450px"
        >

          <template v-slot:before>
            <div class="q-pa-md">
              <q-date
                v-model="date"
                :events="events"
                event-color="orange"
              />
            </div>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="date"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
              v-for="(event, index) in events" :key="index"
            >
              <q-tab-panel :name="event">
                <div class="text-h4 q-mb-md">{{ event }}</div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'MenuPage',


  setup () {
    return {
      splitterModel: ref(50),
      date: ref('2022/11/05'),
      events: [ '2022/11/05', '2022/11/06', '2022/11/07' ]
    }
  }

});
</script>