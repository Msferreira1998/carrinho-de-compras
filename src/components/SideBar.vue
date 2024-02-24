<template>
    <transition name="sidebar-slide">
        <div
            v-if="sidebarOpen"
            class="sidebar bg-gray-800 border border-red-500 fixed inset-y-0 right-0 w-96 z-50 overflow-hidden"
        >
            <button @click="closeSidebar" class="absolute top-4 right-4 text-white">
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
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <div v-if="cartItems && cartItems.length > 0" class="text-white">
                <h2 class="text-lg font-semibold mb-4">Carrinho de Compras</h2>
                <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="flex items-center mb-6 border-b border-gray-700 pb-4"
                >
                    <img
                        :src="item.image"
                        alt="Product Image"
                        class="w-20 h-20 object-cover mr-4 rounded-md shadow-md"
                    />
                    <div class="flex-grow flex flex-col justify-between">
                        <div>
                            <p class="font-semibold text-red-500 text-base truncate max-w-[200px]">
                                {{ item.title }}
                            </p>
                            <p class="text-red-500 text-sm">R$ {{ item.price.toFixed(2) }}</p>
                        </div>
                        <div class="flex items-center mt-2">
                            <button @click="decrementQuantity(item)" class="text-red-500 ml-4">
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
                                        d="M20 12H4"
                                    />
                                </svg>
                            </button>
                            <span class="text-red-500 text-sm mx-4">{{ item.quantity }}</span>
                            <button @click="incrementQuantity(item)" class="text-red-500">
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
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </button>
                            <button @click.stop="removeItem(item)" class="text-red-500">
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p class="text-red-500 text-sm mt-1">
                            Total: R$
                            {{ (item.price * (item.quantity ? item.quantity : 0)).toFixed(2) }}
                        </p>
                    </div>
                </div>
                <div class="w-full sticky bottom-0 bg-gray-800 p-5 fixed border-t-4 border-red-500">
                    <div class="flex justify-between mt-4">
                        <p class="font-semibold text-red-500 text-sm">Total do Pedido:</p>
                        <p class="text-red-500 text-sm">R$ {{ totalCart.toFixed(2) }}</p>
                    </div>
                    <button
                        @click.stop="finalizarCompra"
                        class="bg-red-500 text-white px-4 py-2 rounded-md mt-4 w-full"
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
            <div v-else class="text-white">Seu carrinho está vazio.</div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
import { useDrawerStore } from '../stores/Drawer'
import type { Product } from '../interfaces/Products'

const emit = defineEmits()
const store = useDrawerStore()
const sidebarOpen = computed(() => store.getIsActive)

const props = defineProps({
    cartItems: {
        type: Array as () => Product[],
        required: true
    }
})

const cartItems = computed(() => props.cartItems)
const totalCart = computed(() => {
    return cartItems.value.reduce(
        (total, item) => total + item.price * (item.quantity ? item.quantity : 0),
        0
    )
})

function closeSidebar() {
    store.setIsActive()
}

function handleClickOutside(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar')
    if (sidebar && !sidebar.contains(event.target as Node)) {
        closeSidebar()
    }
}

function removeItem(item: Product) {
    emit('removeItem', item)
}

function finalizarCompra() {
    emit('finalizarCompra', cartItems.value)
    store.setIsActive()
}

function incrementQuantity(item: Product) {
    item.quantity ? item.quantity++ : 0
}

function decrementQuantity(item: Product) {
    if (item.quantity && item.quantity > 1) {
        item.quantity--
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
    transition: transform 0.3s;
}
.sidebar-slide-enter,
.sidebar-slide-leave-to {
    transform: translateX(100%);
    transition: transform 0.3s;
}
.sidebar {
    padding: 20px;
    overflow-y: auto;
}
</style>
