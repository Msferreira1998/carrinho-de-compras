<template>
    <div
        class="card bg-gray-900 border border-red-800 shadow-xl flex flex-col justify-between overflow-hidden"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        :style="{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }"
    >
        <div class="card-body p-6">
            <div class="flex justify-between mb-4">
                <h2 class="text-xl font-bold text-red-500">Pedido #{{ pedido.id }}</h2>
                <div class="text-right">
                    <p class="text-sm text-gray-300">Data do Pedido: {{ pedido.data_pedido }}</p>
                </div>
            </div>
            <div
                v-for="item in pedido.items"
                :key="item.id"
                class="flex items-center justify-between mt-4"
            >
                <div>
                    <p class="font-semibold">{{ item.title }}</p>
                    <p class="text-sm text-gray-500">{{ item.description }}</p>
                </div>
                <div class="flex items-center">
                    <p class="font-semibold mr-2">Quantidade: {{ item.quantity }}</p>
                    <p class="font-semibold">Preço: R$ {{ item.price }}</p>
                </div>
            </div>
            <div class="mt-4 flex justify-between">
                <p class="font-semibold">Total do Pedido:</p>
                <p class="font-semibold">R$ {{ pedido.total.toFixed(2) }}</p>
            </div>
        </div>
        <div class="px-6 py-4">
            <button
                @click.stop.prevent="exportToXLSX"
                class="btn btn-primary bg-red-800 border border-red-500 hover:bg-red-700 hover:border-red-700 hover:text-white text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 14a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 10H3a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-4 0v-5M12 10v-5M9 10V5"
                    />
                </svg>
                Exportar para XLSX
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import type { Pedido } from '../interfaces/Products'

const props = defineProps({
    pedido: {
        type: Object as () => Pedido,
        required: true
    }
})

const emit = defineEmits()

const pedido = computed(() => props.pedido)

const exportToXLSX = () => {
    emit('exportToXLSX', pedido.value)
}

let isHovered = false
</script>
