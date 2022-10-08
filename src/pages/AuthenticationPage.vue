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
          <q-btn label="Log In" type="submit" color="primary"/>
          <q-btn label="Sign Up" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthenticationPage'
});
</script>

<style scoped>
  .container {
    border: solid 1px #26A69A;
    border-radius: 25px;
    padding: 2.5rem 1.5rem;
  }
</style>