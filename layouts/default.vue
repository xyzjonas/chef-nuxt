<template>
  <div class="app-wrapper font-sans">
    <layout-head />

    <main class="page mt-2 mb-10">
      <slot></slot>
    </main>

    <layout-foot class="footer" />

    <div class="notification-drawer">
      <TransitionGroup name="slide">
        <div v-for="notif in notifications" :key="notif.created.toISOString()">
          <ui-notification :notification="notif" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNotifications } from "@/composables/useNotifications";
const { notifications } = useNotifications();
</script>

<style lang="css" scoped>
.app-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.page {
  flex: 1;
}

.footer {
  margin-top: auto;
}

.notification-drawer {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  bottom: 0;
  width: 100%;
  z-index: 9999;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
.slide-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
