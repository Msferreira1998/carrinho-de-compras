import { defineStore } from 'pinia'

export const LoadingOverlayStore = defineStore('LoadingOverlay', {
    state: () => ({
        isLoading: false
    }),
    getters: {
        getIsLoading(): boolean {
            return this.isLoading
        }
    },
    actions: {
        setLoading(isLoading: boolean) {
            this.isLoading = isLoading
        }
    }
})
