<template>
    <div class="bg-gray-800 min-h-screen">
        <NavBar :configElements="configElements" @filter="filterPedidos" />
        <div class="mx-auto max-w-screen-lg mt-20 p-4">
            <div v-for="pedido in filteredPedidos" :key="pedido.id" class="m-6 flex-1">
                <CardPedido :pedido="pedido" @exportToXLSX="exportToXLSX" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx'
import { computed } from 'vue'
import type { Pedido } from '../interfaces/Products'
import { usePedidoStore } from '../stores/Pedidos'
import { useNotificationStore } from '../stores/Notification'
import NavBar from '../components/NavBar.vue'
import CardPedido from '../components/CardPedido.vue'

const pedidoStore = usePedidoStore()
const { setNotification } = useNotificationStore()

const configElements = computed(() => {
    return {
        isCartIcon: false,
        placeholderSearch: 'Pesquisar id...'
    }
})

const filteredPedidos = computed(() => pedidoStore.getFilteredPedidos)

function filterPedidos(textFilter: string) {
    pedidoStore.filterPedidos(textFilter)
}

function exportToXLSX(pedido: Pedido) {
    setNotification({
        class: 'border-2 border-gray-800 bg-red-800 text-white',
        message: 'Exportando Arquivo, aguarde o download...',
        duration: 5000
    })
    const wb = XLSX.utils.book_new()
    const data = pedido.items.map(item => [item.id, item.title, item.price, item.quantity])
    const ws = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, 'Pedido')
    XLSX.writeFile(wb, `pedido #${pedido.id}.xlsx`)
}
</script>