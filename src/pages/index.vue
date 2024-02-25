<template>
    <div class="bg-gray-800 min-h-screen">
        <NavBar :configElements="configElements" @filter="filtrarProdutos" />
        <SideBar
            :cartItems="cartItems"
            @removeItem="removeCartItem"
            @finalizarCompra="finalizarCompra"
        />
        <div class="mx-auto max-w-screen-lg my-16 p-4">
            <div
                class="flex flex-wrap justify-center md:justify-between md:grid md:grid-cols-3 md:gap-6"
            >
                <div
                    v-for="product in products"
                    :key="product.id"
                    class="grid justify-items-center m-6 flex-1"
                >
                    <card-produto :product="product" @addProductToCart="AddProductToCart" />
                </div>
            </div>
        </div>
        <FooterBar :config="ConfigFooterBar" />
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted } from 'vue'
import { useAllProductsStore } from '../stores/AllProducts'
import { useCartStore } from '../stores/CartStore'
import { usePedidoStore } from '../stores/Pedidos'
import { LoadingOverlayStore } from '../stores/LoadingOverlay'
import { useNotificationStore } from '../stores/Notification'
import { useRouter } from 'vue-router'
import type { Product } from '../interfaces/Products'
import CardProduto from '../components/CardProduto.vue'
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'
import FooterBar from '../components/FooterBar.vue'

const router = useRouter()

const productsStore = useAllProductsStore()
const cartStore = useCartStore()
const { criaNovoPedido } = usePedidoStore()
const { setLoading } = LoadingOverlayStore()
const { setNotification } = useNotificationStore()

const products = computed(() => productsStore.getFilteredProducts)
const cartItems = computed(() => cartStore.getCart)

async function requestProducts() {
    try {
        setLoading(true)
        const response = await axios.get('https://fakestoreapi.com/products')
        productsStore.setAllProducts(response.data)
        setLoading(false)
    } catch (error) {
        setNotification({
            class: 'border-2 border-white bg-red text-white',
            message: 'Erro ao buscar produtos!',
            duration: 5000
        })
    }
}

const configElements = computed(() => {
    return {
        isCartIcon: true,
        itensInCart: cartItems.value.length,
        placeholderSearch: 'Pesquisar pelo nome...'
    }
})

const ConfigFooterBar = computed(() => {
    return {
        isButton: true,
        buttonConfig: {
            text: 'Ir para Dashboard',
            action: () => router.push('/dashboard')
        }
    }
})

function filtrarProdutos(search: string) {
    productsStore.filterProducts(search)
}

function AddProductToCart(product: Product) {
    cartStore.addToCart(product)
    setNotification({
        class: 'border-2 border-red-500 bg-gray-800 text-red-500',
        message: 'Produto Adicionado ao Carrinho!',
        duration: 3000
    })
}

function removeCartItem(item: Product) {
    cartStore.removeFromCart(item.id)
}

function finalizarCompra(produtos: Product[]) {
    criaNovoPedido(produtos)
    cartStore.cleanCart()
    setNotification({
        class: 'border-2 border-red-500 bg-gray-800 text-red-500',
        message: 'Pedido Realizado com Sucesso!',
        duration: 5000
    })
}

onMounted(() => {
    requestProducts()
})
</script>
