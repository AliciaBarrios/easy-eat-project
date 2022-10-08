<template>
    <q-layout view="hHr lpR fFf">
  
      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
            <q-toolbar-title>
                <RouterLink :to="{ name: 'home' }"><img src="../assets/easy-eat-logo-white-tenedor.png" ></RouterLink>
            </q-toolbar-title>
            
            <q-btn dense round flat @click="toggleRightDrawer">
               <q-avatar size="200px">
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
        class="bg-primary text-white"
        :breakpoint="0"
        >
          <q-route-tab :to="{ name: 'menu'}" label="Menu" />
          <q-route-tab :to="{ name: 'despensa'}" label="Despensa" />
          <q-route-tab :to="{ name: 'recetario'}" label="Recetario" />
        </q-tabs>

      </q-header>
  
      <q-drawer v-model="rightDrawerOpen" side="right" behavior="desktop" elevated>
        <q-list class="q-pa-xl">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="" />
                </q-item-section>

                <q-item-section>
                    Perfil
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="" />
                </q-item-section>

                <q-item-section>
                    Idioma
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="" />
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

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
    import { ref } from 'vue'

    const tab = ref('navbar');

    const rightDrawerOpen = ref(false);

    function toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
        return rightDrawerOpen;
    };
</script>

<style lang="scss">
  img{
    width: 200px;
    height: auto;
    padding-top: 2rem;
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
</style>