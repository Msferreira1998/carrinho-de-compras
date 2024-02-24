import type { Product } from '../interfaces/Products'
import { defineStore } from 'pinia'

export const useAllProductsStore = defineStore('allProducts', {
    state: () => ({
        allProducts: [] as Product[],
        filteredProducts: [] as Product[]
    }),
    getters: {
        getAllProducts(): Product[] {
            return this.allProducts
        },
        getFilteredProducts(): Product[] {
            return this.filteredProducts
        }
    },
    actions: {
        setAllProducts(products: Product[]) {
            this.allProducts = products
            this.filteredProducts = products
        },
        filterProducts(textFilter: string) {
            if (textFilter === '') {
                this.filteredProducts = this.allProducts
            } else {
                this.filteredProducts = this.allProducts.filter(product =>
                    (product as Product).title.toLowerCase().includes(textFilter.toLowerCase())
                )
            }
        }
    }
})
