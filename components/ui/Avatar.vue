<template>
  <ClientOnly>
    <ui-button
      v-if="!isLoggedIn"
      color="primary"
      rounded
      icon="i-hugeicons-anonymous"
      @click="navigateTo('/login')"
    ></ui-button>
    <ui-button v-if="isLoggedIn" color="primary" class="uppercase" @click="logout">
      <span>{{ username }}</span>
      <i class="i-hugeicons-logout-02"></i>
    </ui-button>
  </ClientOnly>
</template>

<script setup lang="ts">
const { isLoggedIn, username, logout } = useLogin();
</script>

<style lang="css" scoped></style>
