<template>
  <div :class="`notification ${level}`">
    <div class="notification-row">
      <i v-if="icon" :class="icon"></i>
      <div>
        <h2 class="text-md" v-if="notification.title">{{ notification.title }}</h2>
        <p class="text-xs">{{ notification.text }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Notification } from '@/composables/useNotifications';
const props = defineProps<{
  notification: Notification
}>()

const level = computed(() => props.notification.level ?? 'info')

const icon = computed(() => {
  if (props.notification.icon) {
    return props.notification.icon
  }

  switch (level.value) {
    case 'error':
      return 'i-hugeicons-no-internet'
    case 'success':
      return 'i-hugeicons-ok-finger'
    case 'warning':
      return 'i-ic-round-warning-amber'
  }
  
  return undefined
})

</script>
<style lang="css" scoped>
.notification {
  padding: .8rem;
}

.notification-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .7rem;
}


.info {
  color: var(--bg-200);
  background-color: var(--text-200);
}

.success {
  background-color: var(--success-100);
  color: var(--text-over-primary);
}

.error {
  background-color: var(--error-100);
  color: var(--text-over-primary);
}

.warning {
  background-color: #FDB750;
  color: var(--bg-200);
}

i {
  font-size: 1.5rem;
}
</style>