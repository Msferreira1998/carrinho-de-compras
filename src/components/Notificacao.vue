<template>
    <transition name="fade">
        <div v-if="isNotification" class="fixed w-full grid justify-items-center bottom-20">
            <div
                role="alert"
                class="alert border-2 border-red-500 bg-gray-800 text-red-500 w-96"
                :class="config.class ? config.class : ''"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="stroke-current shrink-0 w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <span>{{ config.message }}</span>
            </div>
        </div>
    </transition>
</template>
  
<script setup lang="ts">
import { useNotificationStore } from '../stores/Notification'
import { watch, computed } from 'vue'

const notificationStore = useNotificationStore()

const config = computed(() => notificationStore.getNotificationConfig)
const isNotification = computed(() => notificationStore.getIsNotification)

watch(
    isNotification,
    () => {
        if (isNotification) {
            setTimeout(() => {
                notificationStore.closeNotification()
            }, notificationStore.getNotificationConfig.duration)
        }
    },
    { deep: true }
)
</script>
  
  <style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
  