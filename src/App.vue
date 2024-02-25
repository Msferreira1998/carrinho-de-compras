<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loading from './components/Loading.vue'
import Notificacao from '../src/components/Notificacao.vue'
</script>

<template>
    <div>
        <Loading />
        <RouterView />
        <Notificacao />
    </div>
</template>