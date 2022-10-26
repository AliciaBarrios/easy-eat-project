<template>
  <q-page class="flex flex-center">
    <div class="container">
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-lg"
      > 
          <p>Please fill in this form to create an account.</p>
     
        <div class="row q-gutter-md">
          <div class="col q-gutter-md">
            <q-item-label>Username *</q-item-label>
            <q-input 
            rounded outlined 
            v-model="username" 
            type="name" 
            placeholder="Enter an username" 
            :rules="[(val) => (val && val.length > 0) || 'Name must be filled in.']"
            >
            </q-input>
          </div>
          <div class="col q-gutter-md">
            <q-item-label>Email *</q-item-label>
            <q-input 
            rounded outlined 
            v-model="email" 
            type="email" 
            placeholder="Enter your email"
            :rules="[(val) => validateEmail(val) || 'Must be a valid email.']"
            >
            </q-input>
          </div>
        </div>
        
        <div class="row q-gutter-md">
          <div class="col q-gutter-md">
            <q-item-label>Password *</q-item-label>
            <q-input 
            rounded outlined 
            v-model="password" 
            :type="isPwd ? 'password' : ''" 
            placeholder="Enter a password"
            :rules="[(val) => validatePassword(val) || 'Password must meet all criteria.']"
            >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  ></q-icon>
                </template>
            </q-input>
          
            <div class="password-criteria q-pa-sm">
              <div class="text-subtitle2 q-mb-sm">Password Criteria:</div>
                <div>
                  <q-icon
                    :name="isLength ? 'check_circle' : 'cancel'"
                    :color="isLength ? 'positive' : 'negative'"
                  ></q-icon>
                  Must be at least 12 characters long.
                </div>
                <div>
                  <q-icon
                    :name="isCapital ? 'check_circle' : 'cancel'"
                    :color="isCapital ? 'positive' : 'negative'"
                  ></q-icon>
                  Must contain at least one capital letter.
                </div>
                <div>
                  <q-icon
                    :name="isNumber ? 'check_circle' : 'cancel'"
                    :color="isNumber ? 'positive' : 'negative'"
                  ></q-icon>
                  Must contain at least one number.
                </div>
                <div>
                  <q-icon
                    :name="isSymbol ? 'check_circle' : 'cancel'"
                    :color="isSymbol ? 'positive' : 'negative'"
                  ></q-icon>
                  Must contain at least one special character: !@#$%^&*()-_+=
                </div>
            </div>
          </div>

          <div class="col q-gutter-md">
            <q-item-label>Repeat Password *</q-item-label>
            <q-input 
              rounded outlined 
              v-model="repeatedPassword"  
              :type="isPwd2 ? 'password' : ''" 
              placeholder="Repeat your password"
              :rules="[(val) => (val && val === password) || 'Must match password.']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                  ></q-icon>
                </template>
            </q-input>
          </div>
        </div>

        <p>By creating an account you agree to our Terms & Privacy</p>
        <q-toggle v-model="accept" label="I accept the license and terms"></q-toggle>
      
        <div class="flex column flex-center">
          <q-btn label="Sign Up" type="submit" color="primary" class="q-mb-md"/>
          <q-item-label>Already have an Account?</q-item-label>
          <q-item clickable class="text-primary text-" :to="{ name: 'authentication' }" >Sign In</q-item>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
  import { useQuasar } from 'quasar'
  import { ref, computed } from 'vue'
  // import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../stores/user'

  export default {
    setup () {
      const $q = useQuasar()

      const username = ref('');
      const email = ref('');
      const password = ref('');
      const isPwd = ref(true);
      const repeatedPassword = ref('');
      const isPwd2 = ref(true);
      
      const isLength = ref(false);
      const isCapital = ref(false);
      const isNumber = ref(false);
      const isSymbol = ref(false);
      const accept = ref(false);

      const router = useRouter();
      const userStore = useUserStore();
      const { user } = storeToRefs(userStore);
    
      const validateEmail = (email) => {
        const regExEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        return regExEmail.test(email);
      };

      const validatePassword = (password) => {
        // Test length
        isLength.value = password.length >= 6;
        // Test capital
        isCapital.value = /^(?=.*[A-Z]).*$/.test(password);
        // Test number
        isNumber.value = /^(?=.*[0-9]).*$/.test(password);
        // Test symbol
        isSymbol.value = /^(?=.*[!@#$%^&*()\-_+=]).*$/.test(password);
        return (
          isLength.value &&
          isCapital.value &&
          isNumber.value &&
          isSymbol.value
        );
      };

      const validateTerms = computed(() => {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          });
          return false;
        }
        else {
          return true;
        }
      });

      async function onSubmit() {
        if (validateTerms.value) {
          try {
            await userStore.fetchUser() // here we call fetch user
            if (!user.value) {
              // redirect them to logout if the user is not there
              // router.push({ path: '/' });
              await userStore.signUp(email.value, password.value);
              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Thanks for registering! Please confirm your account in your email'
              });
              router.push({ path: '/signin' }); // una vez confirmado te reedirecciona a la página de login
            } else {
              // continue to dashboard
              router.push({ path: '/signin' });
            }
          } catch (e) {
            console.log(e)
          }
        }
      };

      return {
        username,
        email,
        password,
        isPwd,
        repeatedPassword,
        isPwd2,
        isLength,
        isNumber,
        isSymbol,
        isCapital,
        accept,
        validateEmail,
        validatePassword,
        validateTerms,
        onSubmit
      }
    }
  }
</script>

<style scoped>
  .container {
    border: solid 1px #26A69A;
    border-radius: 25px;
    padding: 2.5em 1.5em;
    margin: 2em;
    width: 75%;
  }

  p {
    margin-top: 2rem;
    margin-bottom: 0;
  }
  .password-criteria {
  background-color: #efefef;
  border-radius: 0.5rem;

  }
</style>