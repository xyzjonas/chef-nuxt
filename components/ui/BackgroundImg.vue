<template>
  <div v-if="backgroundImage" class="background"></div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.background {
  background: v-bind('background');
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
</style>