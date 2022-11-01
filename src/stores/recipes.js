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

    async insertRecipe (title, ingredients, steps) {
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

    async updateIngredientsRecipe (newItem, id) {
      const { data: recipes, error } = await supabase
        .from('recipes')
        .update({ ingredients: newItem })
        .eq('id', id)
      if (error) throw error;
      this.recipes = recipes;
    },

    async updateStepsRecipe (newItem, id) {
      const { data: recipes, error } = await supabase
        .from('recipes')
        .update({ steps: newItem })
        .eq('id', id)
      if (error) throw error;
      this.recipes = recipes;
    }
  }
});