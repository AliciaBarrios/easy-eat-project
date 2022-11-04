<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card 
        class="q-ma-sm q-pa-md" 
        style="height: max-content; width:1200px; max-width:1500px"
        >
            <div style="width:100%" class="flex row justify-end">
                <q-btn flat round color="primary" icon="close" @click="onCloseClick"/>
            </div>
            
            <q-card-section>
                <q-item-label 
                overline 
                class="text-center text-primary text-weight-light text-title"
                >
                    {{ recipe.title }}
                </q-item-label>
            </q-card-section>

            <q-separator spaced />
            
            <q-card-section>
                <span class="text-primary text-h6 text-weight-light">Ingredients:</span>
                <q-list padding v-for="(ingredient, index) in recipe.ingredients" :key="index">
                    <q-item-label class="text-steps text-weight-light">{{ index + 1 }}. {{ ingredient }}</q-item-label>
                </q-list>
            </q-card-section>
            <q-card-section>
                <span class="text-primary text-h6 text-weight-light">Steps:</span>
                <q-list padding v-for="(step, index) in recipe.steps" :key="index">
                    <p class="text-steps text-weight-light">{{ index + 1 }}. {{ step }}</p>
                </q-list>
            </q-card-section>
        </q-card> 
    </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useRecipesStore } from '../stores/recipes'
import { storeToRefs } from 'pinia'

export default defineComponent({
    name: 'RecipeComponent',
    props: { recipe: Object },

    emits: [
        // REQUIRED; need to specify some events that your
        // component will emit through useDialogPluginComponent()
        ...useDialogPluginComponent.emits
    ],

    setup(props) {
        const recipeStore = useRecipesStore();
        const { recipes } = storeToRefs(recipeStore);

        const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

        const onCloseClick = () => {
            onDialogOK()
        };

        return {
            dialogRef,
            onDialogHide,
            onCloseClick,
            recipes,
        }
    },
});
</script>

<style scoped>
    .text-steps {
        line-height: 1.5rem;
        font-size: 1rem;
        text-align: justify;
    }
    .text-title {
        font-size: 3rem;
    }
</style>
