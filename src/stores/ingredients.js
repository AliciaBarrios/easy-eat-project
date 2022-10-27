import { defineStore } from 'pinia';
import { supabase } from '../supabase';
 
export const useIngredientsStore = defineStore('ingredients', {
  state: () => ({
    ingredients: null
  }),
  actions: {
    async fetchIngredients () {
      const { data: ingredients } = await supabase
        .from('ingredients')
        .select('*')
        .order('id', { ascending: false });
      this.ingredients = ingredients;
      // console.log("ingredients:", this.ingredients);
    }
  }
});

