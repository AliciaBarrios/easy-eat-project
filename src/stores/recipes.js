import { defineStore } from 'pinia';
import { supabase } from '../supabase';
 
export const useRecipesStore = defineStore('recipes', {
  state: () => ({
    recipes: null
  }),
  actions: {
    async fetchRecipes () {
      const { data: recipes } = await supabase
        .from('recipes')
        .select('*')
        .order('title', { ascending: true });
      this.recipes = recipes;
      // console.log("ingredients:", this.ingredients);
    },

    async insertRecipe (user, title, ingredients, steps) {
      const { data: recipes, error } = await supabase
        .from('recipes')
        .insert([
          { user_id: user, title: title, ingredients: ingredients, steps: steps },
        ])
        .select('*')
      if (error) throw error;
      this.recipes = recipes;
    },

    async deleteRecipe (id) {
      const { data: recipes, error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id)
      if (error) throw error;
      this.recipes = recipes;
    },

    async updateTitleRecipe (newItem, id) {
      const { data: recipes, error } = await supabase
        .from('recipes')
        .update({ title: newItem })
        .eq('id', id)
      if (error) throw error;
      this.recipes = recipes;
    },

    async updateCookTimeRecipe (newItem, id) {
      const { data: recipes, error } = await supabase
        .from('recipes')
        .update({ cook_time: newItem })
        .eq('id', id)
      if (error) throw error;
      this.recipes = recipes;
    },

    async updateRateRecipe (newItem, id) {
      const { data: recipes, error } = await supabase
        .from('recipes')
        .update({ rate: newItem })
        .eq('id', id)
      if (error) throw error;
      this.recipes = recipes;
    }
  }
});