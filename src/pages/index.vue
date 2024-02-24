<template>
    <div class="bg-gray-800 min-h-screen">
        <NavBar :configElements="configElements" @filter="filterProducts" />
        <SideBar
            :cartItems="cartItems"
            @removeItem="removeCartItem"
            @finalizarCompra="finalizarCompra"
        />
        <div class="mx-auto max-w-screen-lg mt-16 p-4">
            <div class="flex flex-wrap justify-between md:grid md:grid-cols-3 md:gap-6">
                <div v-for="product in products" :key="product.id" class="m-6 flex-1">
                    <card-produto :product="product" @addProductToCart="AddProductToCart" />
                </div>
            </div>
        </div>
        <footer class="bg-gray-700 py-4 px-8 text-white flex justify-start">
            <button class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md" @click="goToDashboard">
                Ir para Dashboard
            </button>
        </footer>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted } from 'vue'
import { useAllProductsStore } from '../stores/AllProducts'
import { useCartStore } from '../stores/CartStore'
import { usePedidoStore } from '../stores/Pedidos'
import CardProduto from '../components/CardProduto.vue'
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'
import type { Product } from '../interfaces/Products'
import { useRouter } from 'vue-router'

const router = useRouter()

const productsStore = useAllProductsStore()
const cartStore = useCartStore()
const pedidoStore = usePedidoStore()

const products = computed(() => productsStore.getFilteredProducts)
const cartItems = computed(() => cartStore.getCart)

async function requestProducts() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products')
        productsStore.setAllProducts(response.data)
    } catch (error) {
        console.error('Erro ao buscar dados:', error)
    }
}

const configElements = computed(() => {
    return {
        isCartIcon: true,
        itensInCart: cartItems.value.length,
        placeholderSearch: 'Pesquisar pelo nome...'
    }
})

function filterProducts(search: string) {
    productsStore.filterProducts(search)
}

function AddProductToCart(product: Product) {
    cartStore.addToCart(product)
}

function removeCartItem(item: Product) {
    cartStore.removeFromCart(item.id)
}

function finalizarCompra(produtos: Product[]) {
    pedidoStore.criaNovoPedido(produtos)
    cartStore.cleanCart()
}

function goToDashboard() {
    router.push('/dashboard')
}

onMounted(() => {
    requestProducts()
})
</script>
