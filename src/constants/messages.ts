// Messages - Success and error messages for user feedback
export const MESSAGES = {
    SUCCESS: {
        MODEL_ADDED: 'AI Model added successfully!',
        MODEL_UPDATED: 'AI Model updated successfully!',
        MODEL_DELETED: 'AI Model deleted successfully!',
        MODEL_PURCHASED: 'AI Model purchased successfully!',
        LOGIN_SUCCESS: 'Welcome back!',
        REGISTER_SUCCESS: 'Account created successfully!',
        LOGOUT_SUCCESS: 'Logged out successfully!',
    },
    ERROR: {
        GENERIC: 'Something went wrong. Please try again.',
        AUTH_REQUIRED: 'Please login to continue.',
        INVALID_CREDENTIALS: 'Invalid email or password.',
        EMAIL_IN_USE: 'Email already in use.',
        WEAK_PASSWORD: 'Password must be at least 6 characters long with uppercase and lowercase letters.',
        NETWORK_ERROR: 'Network error. Please check your connection.',
        NOT_FOUND: 'Resource not found.',
        UNAUTHORIZED: 'You are not authorized to perform this action.',
    },
} as const;
