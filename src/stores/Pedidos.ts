import { defineStore } from 'pinia'
import type { Pedido, Product } from '../interfaces/Products'

export const usePedidoStore = defineStore('pedido', {
    state: () => ({
        allPedidos: [] as Pedido[],
        filteredPedidos: [] as Pedido[]
    }),
    getters: {
        getAllPedidos(): Pedido[] {
            return this.allPedidos
        },
        getFilteredPedidos(): Pedido[] {
            return this.filteredPedidos
        }
    },
    actions: {
        criaNovoPedido(produtos: Product[]) {
            if (produtos.length > 0) {
                this.allPedidos.push({
                    id: this.allPedidos.length + 1,
                    data_pedido: new Date().toDateString(),
                    total: produtos.reduce(
                        (acc, produto) => acc + produto.price * (produto.quantity || 0),
                        0
                    ),
                    items: produtos
                })
                this.filteredPedidos = this.allPedidos
            }
        },
        filterPedidos(textFilter: string) {
            if (textFilter === '') {
                this.filteredPedidos = this.allPedidos
            } else {
                this.filteredPedidos = this.allPedidos.filter(pedido =>
                    (pedido as Pedido).id.toString().includes(textFilter)
                )
            }
        }
    }
})
