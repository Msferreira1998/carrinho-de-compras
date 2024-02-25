export interface ConfigNavBar {
    isCartIcon: boolean
    itensInCart?: number
    placeholderSearch?: string
}

export interface ConfigNotification {
    class?: string
    message?: string
    duration?: number
}

export interface ConfigFooterBar {
    isButton: boolean
    buttonConfig: {
        text: string
        action: () => void
    }
}
