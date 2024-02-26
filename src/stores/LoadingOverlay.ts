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
        async setLoading(action: () => Promise<void>): Promise<void> {
            this.isLoading = true
            await action()
            this.isLoading = false
        }
    }
})
