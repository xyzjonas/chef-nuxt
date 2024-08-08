import type { Ingredient } from "@/types/recipe";

const _tags = ref<Ingredient[]>([])

export const useTags = () => {

  const getTags = async () => {
    if (_tags.value.length === 0) {
      const data = await wrappedFetch<Ingredient[]>('/api/tags')
      if (data) {
        _tags.value = data
      }
    }
    return _tags.value;
  }

  return {
    getTags,
  }

}