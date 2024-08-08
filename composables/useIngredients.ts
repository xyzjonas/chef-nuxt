import type { Ingredient } from "@/types/recipe";

const _ingredients = ref<Ingredient[]>([])

export const useIngredients = () => {

  const getIngredients = async () => {
    if (_ingredients.value.length === 0) {
      const data = await wrappedFetch<Ingredient[]>('/api/ingredients')
      if (data) {
        _ingredients.value = data
      }
    }
    return _ingredients.value;
  }

  return {
    getIngredients,
  }

}