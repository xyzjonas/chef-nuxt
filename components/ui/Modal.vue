<template>
  <div ref="mod" class="modal">
    <ui-card :class="modalClasses" class="relative">
      <div class="flex flex-row">
        <ui-button @click="$emit('closed')" class="ml-auto absolute right-2 top-2" icon="i-hugeicons-cancel-01" squared link></ui-button>
      </div>
      <slot class="modal-content"></slot>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'

const props = defineProps<{
  widthClass?: string;
}>()
const modalClasses = computed(() => {
  let res =  "modal-window";
  if (props.widthClass) {
    res += ` ${props.widthClass}`
  } else {
    res += " page"
  }

  return res;
})

const mod = ref(null)
const isLocked = useScrollLock(document.body);

const emit = defineEmits(['closed'])

onMounted(() => {
  isLocked.value = true
})
onUnmounted(() => {
  isLocked.value = false
})

</script>

<style lang="css" scoped>
.modal {
  position: fixed;
  display: grid;
  inset: 0;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.603);
  z-index: 999;
}

.modal-window {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100% - 1rem);
  align-self: center;
  justify-self: center;
}
</style>
