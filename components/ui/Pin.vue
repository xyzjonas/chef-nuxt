<template>
  <div class="pin" :class="{
    pin: true,
    clickable,
    small: size === 'small',
  }">
    <slot name="start"></slot>
    <span v-if="text">{{ text }}</span>
    <slot v-else></slot>
    <slot name="end"></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text?: string;
  color?: string;
  clickable?: boolean;
  size?: "small" | "normal"
}>();

const bg = computed(() => props.color ?? 'transparent')
const border = computed(() => props.color ?? 'var(--border-100)')
const textColor = computed(() => {
  if (!props.color) {
    return 'var(--text-100)';
  }

  return shouldInvert(props.color) ? 'black' : 'white';
})
</script>

<style lang="css" scoped>
.pin {
  width: fit-content;
  min-width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .2rem;
  font-size: small;
  border: 1px solid v-bind('border');
  padding: .1rem .4rem;
  border-radius: 2rem;
  transition: .1s ease-in-out;

  background-color: v-bind('bg');
  color: v-bind('textColor');
}

.small {
  font-size: x-small;
  font-weight: 500;
}

.clickable {
  cursor: pointer;
  &:hover {
    border-color: var(--primary-100);
  }
}
</style>