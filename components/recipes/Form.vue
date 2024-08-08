<template>
  <div>
    <ClientOnly v-if="recipe">
      <Vueform ref="form$" v-model="recipe" sync>
        <template #empty>
          <FormSteps ref="steps">
            <FormStep
              name="details"
              :elements="[
                'title',
                'subtitle',
                'source',
                'source_name',
                'counter',
                'tags',
              ]"
              >Details</FormStep
            >
            <FormStep name="ingredients" :elements="['ingredients']" enabled
              >Ingredients</FormStep
            >
            <FormStep
              name="body"
              :elements="['body']"
              :buttons="{ finish: false }"
              :conditions="[]"
              >Recipe</FormStep
            >
          </FormSteps>
          <FormElements>
            <TextElement
              size="lg"
              name="title"
              placeholder="title"
              :rules="['required']"
            />
            <TextElement size="lg" name="subtitle" placeholder="subtitle" />
            <TextElement size="lg" name="source" placeholder="link URL" />
            <TextElement size="lg" name="source_name" placeholder="link text" />
            <TextElement
              hidden
              type="number"
              name="portions"
              placeholder="portions"
              :rules="['integer']"
            />
            <StaticElement name="counter">
              <ui-portions-counter
                v-model="recipe.portions"
                class="vf-col-12 portions"
              />
            </StaticElement>

            <TagsElement
              name="tags"
              size="lg"
              placeholder="tags"
              object
              value-prop="name"
              label-prop="name"
              create
              search
              :strict="false"
              :native="false"
              :items="getTagsOptions"
            />
            <ListElement name="ingredients" :sort="true">
              <template #default="{ index }" addClass="content">
                <ObjectElement :name="index" class="card">
                  <TextElement
                    size="lg"
                    name="amount"
                    required
                    placeholder="amount"
                    :columns="{ sm: 4, md: 2 }"
                    :rules="['required', 'integer']"
                  />
                  <ObjectElement name="unit" :columns="{ sm: 12, md: 2 }">
                    <SelectElement
                      size="lg"
                      name="name"
                      default="ks"
                      :items="['g', 'ml', 'ks', 'pcs', 'lžíce', 'lžičky']"
                      :native="false"
                      :columns="{ sm: 6, md: 10 }"
                      allowAbsent
                    />
                  </ObjectElement>
                  <ObjectElement name="ingredient" :columns="{ sm: 12, md: 8 }">
                    <SelectElement
                      name="name"
                      size="lg"
                      placeholder="ingredient"
                      create
                      search
                      :rules="['required']"
                      :native="false"
                      :items="getIngredientsOptions"
                    />
                  </ObjectElement>
                  <TextElement size="lg" name="note" placeholder="comment" />
                </ObjectElement>
              </template>
            </ListElement>

            <EditorElement
              name="body"
              :hide-tools="['attach', 'code']"
              :add-class="'content font-sans'"
            />
          </FormElements>
        </template>
      </Vueform>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useSwipe } from "@vueuse/core";
import type { Recipe } from "~/types";

const recipe = defineModel<Recipe>();

const form$ = ref<any>(null);
const steps = ref<any>(null);

const nextStep = () => {
  if (steps.value.current$ === steps.value.last$) {
    return;
  }
  steps.value?.current$?.complete();
  steps.value?.next();
};

const previousStep = () => {
  if (steps.value.current$ === steps.value.first$) {
    return;
  }
  steps.value?.previous();
};

const validate = async () => {
  return await form$.value.validate();
};

const hasErrors = () => {
  return form$.value.hasErrors;
};

defineExpose({ validate, hasErrors, nextStep, previousStep });

const { getIngredients } = useIngredients();
const getIngredientsOptions = async () => {
  return (await getIngredients()).map((i) => i.name);
};

const { getTags } = useTags();
const getTagsOptions = async () => {
  return (await getTags()).map((t) => t.name);
};

onMounted(() => {
  if (recipe.value?.ingredients) {
    recipe.value.ingredients.forEach((ing) => {
      ing.ingredient = { name: ing.ingredient.name, id: ing.id };
    });
  }
});

const fillInIngredientIds = async (rec: Recipe | undefined) => {
  const allIngredients = await getIngredients();
  for (const item of rec?.ingredients ?? []) {
    const match = allIngredients.find(
      (ing) => ing.name === item.ingredient.name
    );
    if (match) {
      item.ingredient.id = match.id;
    } else {
      delete item.ingredient.id;
    }
  }
};

const fillInTagsIds = async (rec: Recipe | undefined) => {
  const allTags = await getTags();
  for (const item of rec?.tags ?? []) {
    const match = allTags.find((tag) => tag.name === item.name);
    if (match) {
      item.id = match.id;
    } else {
      delete item.id;
    }
  }
};

watch(recipe, async (rec: Recipe | undefined) => {
  await Promise.all([fillInTagsIds(rec), fillInIngredientIds(rec)]);
});

</script>

<style lang="css" scoped>
.portions {
  border: 1px solid var(--border-100);
  padding: 1rem;
  border-radius: 0.5rem;
}

.card {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--bg-200);
  box-sizing: border-box;
  border: 1px solid var(--border-100);
  box-shadow: 0 10px 40px -12px var(--border-100);
}
</style>
