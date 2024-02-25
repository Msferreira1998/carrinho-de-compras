<template>
    <transition name="fade">
        <div
            v-if="isLoading"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div class="loading-xs text-red-500">
                <div class="loading loading-spinner loading-lg"></div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LoadingOverlayStore } from '../stores/LoadingOverlay'

const isLoadingStore = LoadingOverlayStore()

const isLoading = computed(() => isLoadingStore.getIsLoading)
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
