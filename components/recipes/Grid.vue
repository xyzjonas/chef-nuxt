<template>
  <div class="wrapper">
    <!-- RECIPE COUNT -->
    <div v-if="recipes.length > 0">
      <h1 id="r-count">{{ displayedRecipes.length }} Recipes</h1>
    </div>

    <!-- TAGS -->
    <div class="tags">
      <ui-pin
        v-for="tag in tagNames"
        :text="tag"
        :color="activeTags.includes(tag) ? 'var(--primary-100)' : undefined"
        clickable
        @click="toggleFilter(tag)"
      />
    </div>

    <!-- SEARCH -->
    <input id="search" v-if="recipes.length > 0" v-model="search" placeholder="search" />

    <div class="recipe-list" v-show="displayedRecipes.length > 0">
      <!-- <TransitionGroup name="page"> -->
      <recipes-grid-item
        v-for="recipe in displayedRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
      <!-- </TransitionGroup> -->
    </div>
    <ui-empty
      v-show="displayedRecipes.length === 0"
      title="No matches"
      subtitle="no items match the search criteria"
      icon="i-hugeicons-search-02"
      transparent
      class="min-h-xs md:min-h-md"
    />
  </div>
</template>

<script setup lang="ts">
import type { RecipeListItem } from "@/types";

interface Props {
  recipes: RecipeListItem[];
}
const props = defineProps<Props>();

const activeTags = ref<string[]>([]);
const search = ref<string>();

const tagNames = computed<string[]>(() => {
  return [
    ...new Set(
      props.recipes.map((recipe) => recipe.tags.map((tag) => tag.name)).flat()
    ),
  ];
});

const filteredByTag = computed<RecipeListItem[]>(() => {
  return props.recipes
    .filter((r) => {
      var recipeTags = r.tags.map((t) => t.name);
      if (!recipeTags) return true; // if a recipe has no tags, always show
      for (let i = 0; i < activeTags.value.length; i++) {
        const tag = activeTags.value[i];
        if (!recipeTags.includes(tag)) {
          return false;
        }
      }
      return true;
    })
})

const displayedRecipes = computed<RecipeListItem[]>(() => {
  const recipes = filteredByTag.value;
  if (!search.value || search.value === "") {
    return recipes;
  }

  const re = new RegExp(replaceUnicode(search.value.toLowerCase()));
  return recipes.filter((r) => {
    if (re.exec(replaceUnicode(r.title.toLowerCase()))) {
      return true;
    }
    return false;
  });
});

const toggleFilter = (tagName: string) => {
  // filter based on tags
  if (activeTags.value.indexOf(tagName) !== -1) {
    activeTags.value = activeTags.value.filter((t) => t != tagName);
  } else {
    activeTags.value.push(tagName);
  }
};
</script>
<style scoped lang="css">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.recipe-list {
  display: grid;
  gap: 0.3em;
  grid-template-columns: 1fr 1fr;
}

@media (min-width: 768px) {
  .recipe-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 992px) {
  .recipe-list {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.tags {
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  flex-wrap: wrap;
}

#r-count {
  font-size: 3rem;
  font-weight: 300;
  text-transform: uppercase;
}

.empty-box {
  min-height: 65dvh;
  display: flex;
  flex-direction: column;
}

#search {
  font-size: large;
  padding: 1rem;
  border: 1px solid var(--text-100);
  border-radius: 0.4rem;
  outline: none;
  box-shadow: none;
  font-weight: 400;
  caret-color: var(--text-100);
  color: var(--text-100);
  background-color: #ffffff13;
}
</style>
