import type { Product } from './../interfaces/Products'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [] as Product[]
    }),
    getters: {
        getCart: state => state.cart
    },
    actions: {
        addToCart(product: Product) {
            if (this.cart.some(item => item.id === product.id)) {
                this.cart.find(item => item.id === product.id)!.quantity!++
            } else {
                this.cart.push({ ...product, quantity: 1 })
            }
        },
        removeFromCart(id: number) {
            this.cart.splice(
                this.cart.findIndex(product => product.id === id),
                1
            )
        },
        cleanCart() {
            this.cart = []
        }
    }
})
