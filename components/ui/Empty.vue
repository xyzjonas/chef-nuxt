<template>
  <ui-card
    transparent
    :class="{
      empty: true,
      dashed,
      'fixed-height': props.fixedHeight,
      clickable,
      transparent,
    }"
  >
    <ui-spinner v-if="loading" type="roller" />
    <section class="flex flex-col items-center gap-2" v-else>
      <div id="icon" v-show="icon" :class="icon"></div>
      <div>
        <div class="title">{{ title }}</div>
        <div class="subtitle" v-show="subtitle">{{ subtitle }}</div>
        </div>
      <slot></slot>
    </section>
  </ui-card>
</template>
<script setup lang="ts">
interface Props {
  loading?: boolean;
  icon?: string;
  title: string;
  subtitle?: string;
  dashed?: boolean;
  fixedHeight?: string;
  transparent?: boolean;
  clickable?: boolean;
}
const props = defineProps<Props>();

if (props.fixedHeight) {
}
</script>
<style lang="css" scoped>
.empty {
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.title {
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 500;
  text-transform: uppercase;
}

.subtitle {
  font-size: 1.2rem;
  /* filter: opacity(0.6); */
  font-weight: 300;
  text-transform: lowercase;
}

#icon {
  font-size: 3rem;
  color: var(--text-200);
  /* filter: opacity(.6); */
}

h1 {
  text-transform: uppercase;
}

/* @media (min-width: 576px) {
  .empty {
    height: 40rem;
  }
} */

.fixed-height {
  height: v-bind("fixedHeight");
}

.transparent {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}

.clickable {
  transition: border 0.2s ease-in-out;
}

.clickable:hover {
  border-color: var(--primary-100);
  cursor: pointer;
}

.clickable:hover .subtitle {
  text-decoration: underline;
}
</style>
