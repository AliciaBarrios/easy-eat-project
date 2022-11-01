<template>
    <div class="fullscreen bg-primary text-white text-center q-pa-md flex column flex-center display-mobile">
        <h1>Thanks for registering!</h1>
        <h2>Please confirm your account in your email</h2>
        <q-icon name="mark_email_read" size="6rem"/>
        <q-btn 
            to="/signin" 
            label="Go Sign In" 
            class="q-mt-xl"
            color="white"
            text-color="primary"
            unelevated
            glossy
            />
    </div>

    <div class="fullscreen bg-primary text-white text-center flex column flex-center display-mobile">
        <h2>Thanks for registering!</h2>
        <h4>Please confirm your account in your email</h4>
        <q-icon name="mark_email_read" size="6rem"/>
        <q-btn 
            to="/signin" 
            label="Go Sign In" 
            class="q-mt-xl"
            color="white"
            text-color="primary"
            unelevated
            glossy
            />
    </div>
</template>

<style scoped>

  @media only screen and (max-width: 600px) {
    .display-mobile {
      display: flex;
    }
  }

  @media only screen and (min-width: 601px) {
    .display-mobile {
      display: none;
    }
  }

</style>