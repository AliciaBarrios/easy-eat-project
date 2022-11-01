<template>
  <q-layout view="hHr lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
            <RouterLink :to="{ name: 'home' }"><img src="../assets/easy-eat-logo-white-tenedor.png" ></RouterLink>
        </q-toolbar-title>
            
        <q-btn dense round flat @click="toggleRightDrawer">
          <q-avatar size="150px">
            <div class="container-img">
                <img src="../assets/ali.jpg" alt="User image" id="user-img">
            </div>
          </q-avatar>
          <q-tooltip>Account</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-tabs    
      v-model="tab"
      dense
      align="justify"
      class="bg-primary text-white desktop-only"
      :breakpoint="0"
      v-if="$q.platform.is.desktop"
      >
        <q-route-tab :to="{ name: 'menu'}" label="Menu" />
        <q-route-tab :to="{ name: 'despensa'}" label="Despensa" />
        <q-route-tab :to="{ name: 'recetario'}" label="Recetario" />
      </q-tabs>
    </q-header>
  
    <q-drawer v-model="rightDrawerOpen" side="right" behavior="mobile" elevated>
      <q-list class="q-pt-xl">
        <q-item clickable v-ripple>
          <q-item-section avatar>
              <q-icon name="manage_accounts" />
          </q-item-section>

          <q-item-section>
              Perfil
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
              <q-icon name="language" />
          </q-item-section>

          <q-item-section>
              Idioma
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple :to="{ name: 'landing' }" @click="userStore.signOut">
          <q-item-section avatar>
              <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
              Log Out
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="$q.platform.is.mobile">
      <q-tabs    
      v-model="tab"
      dense
      align="justify"
      class="bg-primary text-white"
      :breakpoint="0"
      >
        <q-route-tab :to="{ name: 'menu'}" icon="restaurant" label="Menu" />
        <q-route-tab :to="{ name: 'despensa'}" icon="icecream" label="Despensa" />
        <q-route-tab :to="{ name: 'recetario'}" icon="menu_book" label="Recetario" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
    import { ref } from 'vue'
    import { useUserStore } from '../stores/user'
    import { useQuasar } from 'quasar'

    const userStore = useUserStore();
    const $q = useQuasar();

    const tab = ref('navbar');

    const rightDrawerOpen = ref(false);

    function toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
        return rightDrawerOpen;
    };
</script>

<style lang="scss">
  img{
    width: 150px;
    height: auto;
    padding-top: 1rem;
  }

  .container-img {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  #user-img {
    width: 120px;
    height: auto;
  }

  // @media only screen and (max-width: 600px) {
  //   .desktop {
  //     display: none;
  //   }
  // }

  // @media only screen and (min-width: 601px) {
  //   .mobile {
  //     display: none;
  //   }
  // }
</style>