<template>
  <ui-empty
    transparent
    title="Not found"
    class="min-h-full"
    subtitle="there's no such thing in here, sorry..."
    icon="i-hugeicons-search-02"
  >
    <ui-button
      class="mt-10"
      outlined
      @click="navigateTo('/')"
      icon="i-hugeicons-curvy-left-direction"
      >go home</ui-button
    >
  </ui-empty>
</template>

<script setup></script>

<style lang="scss" scoped></style>
