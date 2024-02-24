import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
    state: () => ({
        isActive: false
    }),
    getters: {
        getIsActive: state => state.isActive
    },
    actions: {
        setIsActive() {
            this.isActive = !this.isActive
        }
    }
})
