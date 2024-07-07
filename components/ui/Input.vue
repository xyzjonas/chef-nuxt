<template>
  <div :class="clazz">
    <label :for="uniqueId">{{ label }}</label>
    <input
      ref="inputRef"
      :id="uniqueId"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :name="label"
      :required="required"
    />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue: any;
  label: string;
  type?: string;
  required?: boolean;
  size?: ["md", "lg"];
}>();

const clazz = computed(() => {
  return `input-box input-group-${props.size ?? "md"}`;
});

const emit = defineEmits(["update:modelValue"]);

const uniqueId = Math.random().toString(16).substring(2);
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (props.modelValue != undefined && props.modelValue !== "") {
    document.querySelector(`[for='${inputRef.value?.id}']`)?.classList?.add("active");
  }

  inputRef.value?.addEventListener("focus", () => {
    document.querySelector(`[for='${inputRef.value?.id}']`)?.classList?.add("active");
  });

  inputRef.value?.addEventListener("focusout", () => {
    if (!inputRef.value?.value) {
      document.querySelector(`[for='${inputRef.value?.id}']`)?.classList?.remove("active");
    }
  });
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/base";
@import "@/assets/css/custom_components";

.input-group-md {
  @include input-group(10px, 16px, 10px);
}

.input-group-lg {
  @include input-group(16px, 16px, 10px);
}

input {
  width: 100%;
  font-size: medium;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px var(--bg-200) inset !important;
    -webkit-text-fill-color: var(--color-font-light);
}
</style>
