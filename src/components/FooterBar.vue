<template>
    <footer
        class="fixed bottom-0 left-0 right-0 bg-gray-800 py-4 px-8 text-white justify-start border-t-4 border-red-500"
    >
        <button
            v-if="config.buttonConfig"
            class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
            @click.stop.prevent="config.buttonConfig.action"
        >
            {{ config.buttonConfig.text }}
        </button>
    </footer>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { ConfigFooterBar } from '../interfaces/ConfigElements'

const props = defineProps({
    config: {
        type: Object as () => ConfigFooterBar,
        required: true
    }
})

const config = computed(() => props.config)
</script>