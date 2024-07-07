<template>
  <ui-empty
    icon="i-hugeicons-wifi-disconnected-01"
    class="min-h-full"
    title="500"
    subtitle="something wrong happened"
    transparent
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
