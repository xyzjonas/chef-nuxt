import { useLocalStorage } from "@vueuse/core";
import type { Recipe } from "~/types";

const EMPTY_RECIPE: Recipe = {
  id: -1,
  title: "foobar",
  subtitle: "",
  draft: true,
  favorite: false,
  tags: [],
  body: "",
  ingredients: [],
  portions: 4,
}

const recipe = useLocalStorage("recipe-draft", EMPTY_RECIPE)

export const useRecipeFormBackup = () => {
  return {
    recipe,
  }
}