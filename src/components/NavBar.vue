<template>
    <nav
        class="navbar bg-gray-800 border-b-2 border-red-500 text-white p-4 flex justify-between items-center fixed w-full top-0 z-50"
    >
        <div class="container mx-auto">
            <div class="flex items-center">
                <div class="rounded-full p-1 mr-4">
                    <img :src="logo" alt="Logo" class="h-10 w-auto" />
                </div>
                <input
                    v-model="search"
                    type="text"
                    :placeholder="
                        config.placeholderSearch ? config.placeholderSearch : 'Pesquisar...'
                    "
                    class="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none"
                />
            </div>
        </div>

        <div class="relative" v-if="config.isCartIcon">
            <button @click.stop="toggleSidebar" class="flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 21a2 2 0 01-2-2v-9a2 2 0 012-2h18a2 2 0 012 2v9a2 2 0 01-2 2H3zm9-10a3 3 0 100-6 3 3 0 000 6z"
                    />
                </svg>
            </button>
            <div
                class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center text-xs"
            >
                {{ config.itensInCart ? config.itensInCart : 0 }}
            </div>
        </div>
    </nav>
</template>
  
<script setup lang="ts">
import logo from '../assets/images/logo.png'
import type { ConfigNavBar } from '../interfaces/ConfigElements'
import { ref, watch, defineProps, defineEmits, computed } from 'vue'
import { useDrawerStore } from '../stores/Drawer'

const emit = defineEmits()
const props = defineProps({
    configElements: {
        type: Object as () => ConfigNavBar,
        required: true
    }
})

const config = computed(() => props.configElements)

const search = ref('')
const storeDrawer = useDrawerStore()

const toggleSidebar = () => {
    storeDrawer.setIsActive()
}

watch(search, newValue => {
    emit('filter', newValue)
})
</script>
  