// Local Storage Keys
export const STORAGE_KEYS = {
    AUTH: {
        TOKEN: 'auth_token',
        REFRESH_TOKEN: 'refresh_token',
        USER: 'user',
        EXPIRES_AT: 'expires_at',
    },
    USER: {
        PREFERENCES: 'user_preferences',
        THEME: 'user_theme',
        LANGUAGE: 'user_language',
        NOTIFICATIONS: 'user_notifications',
    },
    CART: {
        ITEMS: 'cart_items',
        TOTAL: 'cart_total',
    },
    APP: {
        VERSION: 'app_version',
        LAST_VISIT: 'last_visit',
    },
} as const;

export type StorageCategory = keyof typeof STORAGE_KEYS;
