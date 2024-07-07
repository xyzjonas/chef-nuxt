<template>
  <div class="card">
    <div v-if="backgroundImage" class="background"></div>
    <div :class="{
      'body': true,
      'h-full' : true,
      transparent,
    }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  backgroundImage?: string;
  transparent?: boolean;
}

const props = defineProps<Props>();
const background = computed(() => `url('${props.backgroundImage}')`);
</script>

<style lang="css" scoped>
.card {
  border-radius: .5rem;
  background-color: var(--bg-200);
  box-sizing: border-box;
  box-shadow: 0 10px 40px -12px var(--border-100);
  border: 1px solid var(--border-100);
  overflow: hidden;
}

.background {
  min-height: 5rem;
  aspect-ratio: 1.5;
  background: v-bind('background');
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.body {
  background-color: var(--bg-200);
  padding: 1rem;
}

.transparent {
  background-color: transparent;
}
</style>