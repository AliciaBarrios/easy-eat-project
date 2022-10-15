<template>
    <div class="flex row justify-around q-mt-xl">
        <q-card class="my-card">
            <q-card-section>
                <div class="text-h6 q-mb-xs">What are we eating today?</div>
            </q-card-section>
            <img src="../assets/thinking.png">
        </q-card>
        <q-card class="my-card flex flex-center">
            <img src="../assets/thinking.png">
            <q-card-section>
                <div class="text-h6 q-mb-xs">It's the end of the month and it's time to do the monthly shopping again?</div>
            </q-card-section>
        </q-card>
        <q-card class="my-card flex justify-end">
            <q-card-section>
                <div class="text-h6 q-mb-xs">Oh, man! Now I can't remember if we have any milk left at home.</div>
            </q-card-section>
            <img src="../assets/thinking.png">
        </q-card>
    </div>

    <h3 class="text-center text-grey-6">Feels familiar?</h3>
    <h4 class="text-center q-mb-md">EasyEat is going to make it a little easier for you. </h4>
    <h4 class="text-center q-mt-md">With EasyEat you can manage and organise everything related to the daily menu in a very simple way. </h4>
    
    <q-list class="flex-center row">
        <div class="container q-ma-xl">
            <q-item class="flex-center column">
                <q-item-section>
                    <q-icon name="fastfood" size="xl"/>
                </q-item-section>
                <q-item-section>
                    We provide you with a "Pantry" section where you can enter and manage the food you have at home.
                </q-item-section>
            </q-item>
        </div>
      
        <div class="container">
            <q-item class="flex-center column">
                <q-item-section>
                    <q-icon name="menu_book" size="xl"/>
                </q-item-section>
                <q-item-section>
                    A "Recipe book" section, where you can search for recipes that contain a specific food and which 
                    you can add to your weekly menu. 
                    You can also create your own recipe book!
                </q-item-section>
            </q-item>
        </div>
        <div class="container">
            <q-item class="flex-center column">
                <q-item-section>
                    <q-icon name="restaurant_menu" size="xl"/>
                </q-item-section>
                <q-item-section>
                    And finally, the "Menu" section where you can manage what to eat and which will be displayed weekly. 
                    In addition, by marking the day as consumed, the food in the pantry will be updated automatically.
                </q-item-section>
            </q-item>
        </div>
    </q-list>

    <div>Organising your meals has never been so easy!</div>

</template>

<style scoped>
    img {
        width: 200px;
        height: auto;
    }

    .my-card {
        width: 20%;
    }

    .container {
        width: 20%;
    }
</style>