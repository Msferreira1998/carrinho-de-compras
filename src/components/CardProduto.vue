<template>
    <div
        class="card w-64 h-96 bg-gray-900 border border-red-800 shadow-xl flex flex-col justify-between overflow-hidden transition-all duration-300"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        :style="{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }"
    >
        <figure class="h-60 bg-white">
            <img class="h-full w-full object-scale-down" :src="product.image" />
        </figure>
        <div class="card-body p-4 flex flex-col justify-between">
            <h2 class="card-title h-16 text-lg text-red-500 font-semibold mb-4">
                {{ product.title.substring(0, 40) + (product.title.length > 40 ? '...' : '') }}
            </h2>
            <p class="text-sm text-gray-300 mb-4">
                {{
                    product.description.substring(0, 60) +
                    (product.description.length > 60 ? '...' : '')
                }}
            </p>
            <div class="flex justify-between items-center mb-2">
                <h2 class="card-price text-sm text-red-500 font-semibold">
                    R$ {{ product.price.toFixed(2) }}
                </h2>
                <div class="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-1 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 2.237l1.308 3.992h4.23a.502.502 0 0 1 .394.812l-3.416 2.494 1.307 3.992a.502.502 0 0 1-.77.595L10 12.796l-4.062 2.437a.502.502 0 0 1-.77-.595l1.307-3.992-3.415-2.494a.502.502 0 0 1 .394-.812h4.23L10 2.237z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span class="text-sm text-gray-400">{{ product.rating.rate }}</span>
                </div>
            </div>
            <div>
                <button
                    class="w-full btn btn-primary bg-red-800 border border-red-500 hover:bg-red-700 hover:border-red-700 hover:text-white text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    @click.stop="AddProductToCart(product)"
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
                            d="M9 19c0 1.1.9 2 2 2s2-.9 2-2M6.964 5.14a2 2 0 011.922-1.356L18.983 4.5a1 1 0 01.989.822l1 10a1 1 0 01-1.332.955l-.052-.021M6 9H4a2 2 0 00-2 2v2a2 2 0 002 2h16a2 2 0 002-2v-2a2 2 0 00-2-2h-1"
                        />
                    </svg>
                    Carrinho
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue'
import type { Product } from '../interfaces/Products'

const emit = defineEmits()

defineProps({
    product: {
        type: Object as () => Product,
        required: true
    }
})

const AddProductToCart = (product: Product) => {
    emit('addProductToCart', product)
}

const isHovered = ref(false)
</script>
  
<style scoped>
.card-body > *:not(:last-child) {
    margin-bottom: 1rem;
}
</style>
  