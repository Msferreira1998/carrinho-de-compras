<template>
    <div class="bg-gray-800 min-h-screen">
        <NavBar :configElements="configNavBarElements" @filter="filterPedidos" />
        <div class="mx-auto max-w-screen-lg my-20 p-4">
            <div v-for="pedido in filteredPedidos" :key="pedido.id" class="m-6 flex-1">
                <CardPedido :pedido="pedido" @exportToXLSX="exportToXLSX" />
            </div>
        </div>
        <FooterBar :config="configFooterElements" />
    </div>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx'
import { computed } from 'vue'
import type { Pedido } from '../interfaces/Products'
import { usePedidoStore } from '../stores/Pedidos'
import { useNotificationStore } from '../stores/Notification'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import CardPedido from '../components/CardPedido.vue'
import FooterBar from '../components/FooterBar.vue'

const router = useRouter()
const pedidoStore = usePedidoStore()
const { setNotification } = useNotificationStore()

const configNavBarElements = computed(() => {
    return {
        isCartIcon: false,
        placeholderSearch: 'Pesquisar id...'
    }
})

const configFooterElements = computed(() => {
    return {
        isButton: true,
        buttonConfig: {
            text: 'Ir para Home',
            action: () => {
                router.push('/')
            }
        }
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