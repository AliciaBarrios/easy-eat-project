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
        .order('name', { ascending: true });
      this.ingredients = ingredients;
      // console.log("ingredients:", this.ingredients);
    },

    async insertIngredient (user, name, quantity, unit, caducity) {
      const { data: ingredients, error } = await supabase
        .from('ingredients')
        .insert([
          { user_id: user, name: name, quantity: quantity, unit: unit, caducity: caducity  },
        ])
        .select('*')
      if (error) throw error;
      this.ingredients = ingredients;
    },

    async deleteIngredient (id) {
      const { data: ingredients, error } = await supabase
        .from('ingredients')

        .delete()
        .eq('id', id)
      if (error) throw error;
      this.ingredients = ingredients;
    }
  }
});

