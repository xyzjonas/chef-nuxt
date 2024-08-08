<template>
  <div>
    OUTER: {{  recipe  }}
    <recipes-form v-model="recipe" />
  </div>
</template>

<script setup lang="ts">

const { recipe } = useRecipeFormBackup();

// const recipe = ref<Recipe>({
//   id: -1,
//   title: "foobar",
//   subtitle: "",
//   draft: true,
//   favorite: false,
//   tags: [],
//   body: "",
//   ingredients: [],
//   portions: 4,
// })

useHead({
  title: "New Recipe",
})

</script>

<style lang="css" scoped>

</style>