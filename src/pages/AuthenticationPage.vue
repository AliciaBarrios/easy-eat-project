<template>
  <q-page class="flex flex-center">
    <div class="container">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      > 
      <q-item-label>Username *</q-item-label>
      <q-input rounded outlined v-model="email" type="email" placeholder="Enter your email"></q-input>

      <q-item-label>Password *</q-item-label>
      <q-input v-model="password" rounded outlined :type="isPwd ? 'password' : 'text'" placeholder="Enter your password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>

        <q-toggle v-model="accept" label="I accept the license and terms"></q-toggle>

        <div class="flex flex-center">
          <q-btn label="Log In" type="submit" color="primary" />
          <q-btn label="Sign Up" type="submit" color="primary" class="q-ml-md"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'

  export default {
    setup () {
      const $q = useQuasar()

      const name = ref(null)
      const age = ref(null)
      const accept = ref(false)

      return {
        name,
        age,
        accept,

        onSubmit () {
          if (accept.value !== true) {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'You need to accept the license and terms first'
            })
          }
          else {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            })
          }
        },

        onReset () {
          name.value = null
          age.value = null
          accept.value = false
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    border: solid 1px #26A69A;
    border-radius: 25px;
    padding: 2.5rem 1.5rem;
    margin: 2rem;
  }
</style>