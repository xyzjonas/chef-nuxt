<template>
  <header>
      <div class="page flex p-2 items-center">
        <ui-button color="primary" @click="navigateTo('/')">
          <img src="/favicon.ico">
        <span class="transform-translate-y-[2px]">App</span>
        </ui-button>
        <span class="ml-auto text-xs">{{ VERSION }}</span>
        <div class="ml-5 flex gap-2 items-center">
          <ui-theme-toggle />
          <ui-avatar />
        </div>
      </div>
    </header>
</template>

<script setup lang="ts">
import { VERSION } from '@/_version';
</script>

<style lang="css" scoped>
header {
  background-color: var(--primary-100);
  color: var(--text-over-primary)
}
</style>