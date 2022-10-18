<template>
  <q-page class="flex flex-center">
    <div class="container">
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
      > 
      <q-item-label>Email *</q-item-label>
      <q-input rounded outlined v-model="email" type="email" placeholder="Enter your email"></q-input>

      <q-item-label>Password *</q-item-label>
      <q-input v-model="password" rounded outlined :type="isPwd ? 'password' : ''" placeholder="Enter your password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>

        <div class="flex column flex-center">
          <q-btn label="Sign In" type="submit" color="primary" class="q-ma-md"/>
          <q-item-label>You don't have an Account?</q-item-label>
          <q-item clickable class="text-primary" :to="{ name: 'signup' }">Sign Up</q-item>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  // import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user'

  export default {
    setup () {
      const $q = useQuasar()

      const email = ref('');
      const password = ref('');
      const isPwd = ref(true);

      const router = useRouter()
      const userStore = useUserStore()
      const { user } = storeToRefs(userStore)

      async function onSubmit() {
        try {
          await userStore.signIn(email.value, password.value);
          await userStore.fetchUser();
          console.log(user.value.email);
          console.log(email.value);
          if (!user.value) {
            // redirect them to logout if the user is not there
            // router.push({ path: '/' });
            router.push({ path: '/signup' });
          } else {
            // continue to dashboard
            router.push({ path: '/home' });
          }
        } catch (e) {
          console.log(e)
        }
      }
 
      // onMounted(async () => {
      //   try {
      //     await userStore.fetchUser() // here we call fetch user
      //     if (!user.value) {
      //       // redirect them to logout if the user is not there
      //       // router.push({ path: '/' });
      //       await userStore.signUp(email.value, password.value);
      //     } else {
      //       // continue to dashboard
      //       router.push({ path: '/home' });
      //     }
      //   } catch (e) {
      //     console.log(e)
      //   }
      // });

      return {
        email,
        password,
        isPwd,
        onSubmit
      }
    }
  }
</script>

<style scoped>
  .container {
    border: solid 1px #26A69A;
    border-radius: 25px;
    padding: 2em 1.5em;
    margin: 2em;
  }
</style>