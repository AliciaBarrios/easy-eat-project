<template>
    <div class="flex row justify-around q-mt-xl" v-if="$q.screen.gt.md">
        <q-card class="container-card flex justify-center items-end margin-cards">
            <q-card-section>
                <div class="text-h6 text-center">What are we eating today?</div>
            </q-card-section>
            <q-img src="../assets/comida.jpg" style="height: 250px;"/>
        </q-card>
        <q-card class="container-card flex justify-center items-start margin-cards">
            <q-img src="../assets/calendario.jpg" />
            <q-card-section>
                <div class="text-h6 text-center">It's the end of the month and it's time to do the monthly shopping again?</div>
            </q-card-section>
        </q-card>
        <q-card class="container-card flex justify-center items-end margin-cards">
            <q-card-section>
                <div class="text-h6 text-center">Oh, man! Now I can't remember if we have any milk left at home.</div>
            </q-card-section>
            <q-img src="../assets/leche.jpg" />
        </q-card>
    </div>

    <q-carousel
    animated
    v-model="slide"
    transition-prev="slide-right"
    transition-next="slide-left"
    arrows
    swipeable
    navigation
    infinite
    height="500px"
    control-color="primary"
    v-if="$q.screen.lt.md"
    >
        <q-carousel-slide :name="1" class="flex-center column">
            <q-card class="container-card flex justify-center items-end margin-cards">
                <q-card-section>
                    <div class="text-h6 text-center">What are we eating today?</div>
                </q-card-section>
                <q-img src="../assets/comida.jpg" style="height: 250px;"/>
            </q-card>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="flex-center column">
            <q-card class="container-card flex justify-center items-start margin-cards">
                <q-img src="../assets/calendario.jpg" />
                <q-card-section>
                    <div class="text-h6 text-center">It's the end of the month and it's time to do the monthly shopping again?</div>
                </q-card-section>
            </q-card>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="flex-center column">
            <q-card class="container-card flex justify-center items-end margin-cards">
                <q-card-section>
                    <div class="text-h6 text-center">Oh, man! Now I can't remember if we have any milk left at home.</div>
                </q-card-section>
                <q-img src="../assets/leche.jpg" />
            </q-card>
        </q-carousel-slide>
    </q-carousel>


    <h3 class="text-center text-grey-6" style="margin: 5rem 0">Feels familiar?</h3>
    <div class="container-text">
        <h4 class="text-center" style="line-height: 3rem;">EasyEat is going to make it a little easier for you. </h4>
        <div class="flex row justify-around items-center">
            <div class="text-center width">
                <q-list class="flex column items-center phrases">
                    <h5 style="line-height: 3rem;">With EasyEat you can manage and organise everything related to the daily menu in a very simple way. You can do this from your:</h5>
                    <q-item class="flex-center">
                        <q-icon name="phone_android" />
                        <q-item-section class="flex content-start q-pl-md" style="width:6rem;">
                            Phone
                        </q-item-section>
                    </q-item>
                    <q-item class="flex-center">
                        <q-icon name="tablet_android"/>
                        <q-item-section class="flex content-start q-pl-md" style="width:6rem;">
                            Tablet
                        </q-item-section>
                    </q-item>       
                    <q-item class="flex-center">
                        <q-icon name="laptop_mac" />
                        <q-item-section class="flex content-start q-pl-md" style="width:6rem;">
                            Laptop
                        </q-item-section>
                    </q-item>   
                </q-list> 
            </div>
            <q-img src="https://cdn.quonomy.com/3845/conversions/como-encender-tu-movil-android-tocando-la-pantalla-h-lg.jpg" style="width: 600px; height: auto; margin-top: 3rem;" alt="persona tocando pantalla" />
        </div>
    </div>
   
    
    <q-list class="display bg-green-1 q-pt-xl q-pb-xl">
        <div class="container-card">
            <q-item class="full-height flex-center column">
                <q-item-section>
                    <q-icon name="fastfood" size="6rem" color="grey-6"/>
                </q-item-section>
                <q-item-section class="text">
                    We provide you with a "Pantry" section where you can enter and manage the food you have at home.
                </q-item-section>
            </q-item>
        </div>
      
        <div class="container-card">
            <q-item class="full-height flex-center column">
                <q-item-section>
                    <q-icon name="menu_book" size="6rem" color="grey-6"/>
                </q-item-section>
                <q-item-section class="text">
                    A "Recipe book" section, where you can search for recipes that contain a specific food and which 
                    you can add to your weekly menu. 
                    You can also create your own recipe book!
                </q-item-section>
            </q-item>
        </div>
        <div class="container-card">
            <q-item class="full-height flex-center column">
                <q-item-section>
                    <q-icon name="restaurant_menu" size="6rem" color="grey-6"/>
                </q-item-section>
                <q-item-section class="text">
                    And finally, the "Menu" section where you can manage what to eat and which will be displayed weekly. 
                    In addition, by marking the day as consumed, the food in the pantry will be updated automatically.
                </q-item-section>
            </q-item>
        </div>
    </q-list>

    <div class="flex-center row justify-around q-ma-xl">
        <img src="https://idisciple.blob.core.windows.net/idm/Mujer-que-planifica-OriginalWithCut-774x1376-90-CardBanner.Jpeg" alt="chica organizando"/>
        <h4 class="width">Organising your meals has never been so easy!</h4>
    </div>

    <div class="bg-grey-4 footer" >
        <q-item :to="{ name: 'contact' }" class="text-grey-8 link">Contact us</q-item>
        <q-item :to="{ name: 'work' }" class="text-grey-8 link">Work with us</q-item>
        <q-item :to="{ name: 'faqs' }" class="text-grey-8 link">FAQs</q-item>
    </div>

</template>

<script>
    import { ref } from 'vue'
    import { useQuasar } from 'quasar'

    const $q = useQuasar();

    export default {
    setup () {
        return {
        slide: ref(1)
        }
    }
    }
</script>

<style scoped>
    .text {
        line-height: 2rem;
        font-size: 1rem;
        text-align: justify;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .link {
        align-items: center;
    }
    .link:hover {
        font-weight: bolder;
        cursor: pointer;
    }

    @media only screen and (max-width: 600px) {
        .container-text {
            width: 90%;
            margin: 10rem auto;
        }
        .phrases {
            font-size: 1.2rem;
            line-height: 2rem;
            text-align: justify;
        }
        img {
            width: 100vw;
            height: auto;
            margin: 0;
        }
        .width {
            width: 100%;
            text-align: center;
            line-height: 3rem;
        }
        .container-card {
            width: 80%;
            height: auto;
            text-align: justify;
        }
        .text {
            margin: 2rem 0 4rem;
        }
        .margin-cards {
            margin: 2rem 0;
        }
        .display {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .footer {
            display: flex;
            justify-content: center;
        }
    }

    @media only screen and (min-width: 601px) {
        .container-text {
            width: 80%;
            margin: 10rem auto;
        }
        .phrases {
            font-size: 1.5rem;
            line-height: 2rem;
            text-align: justify;
        }

        img {
            width: 600px;
            height: auto;
            margin: 0;
        }
        .width {
            width: 30%;
            text-align: center;
            line-height: 3rem;
        }
        .container-card {
            width: 25%;
            height: 400px;
        }
        .display {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
        .footer {
            display: flex;
            justify-content: flex-end;
        }
    }
</style>