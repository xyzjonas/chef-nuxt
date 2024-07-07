<template>
  <div>
    <div v-if="recipes && recipes.length > 0">
      <recipes-grid :recipes="recipes" />
    </div>
    <div v-else>
      <ui-empty
        class="min-h-md lg:min-h-2xl"
        transparent
        icon="i-hugeicons-license-no"
        title="Goodness Gracious!"
        subtitle="The recipe list seems to have taken a tea break. Why not take charge and add your culinary masterpieces?"
      >
      <ui-button link class="underline mt-5" icon="i-hugeicons-resources-add">add a new recipe</ui-button>
    </ui-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipeListItem } from "@/types";
import { handleError } from "vue";

const { data: recipes, error } = await useFetch<RecipeListItem[]>("/api/recipes")

if (error.value) {
  handleErrorRedirect(error.value)
}
</script>

<style lang="scss" scoped></style>
