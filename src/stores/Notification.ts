import type { ConfigNotification } from '../interfaces/ConfigElements'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        isNotification: false,
        configNotification: [] as ConfigNotification
    }),
    getters: {
        getNotificationConfig(): ConfigNotification {
            return this.configNotification
        },
        getIsNotification(): boolean {
            return this.isNotification
        }
    },
    actions: {
        setNotification(configNotification: ConfigNotification) {
            this.isNotification = true
            this.configNotification = configNotification
        },
        closeNotification() {
            this.isNotification = false
        }
    }
})
