import type { Config } from 'tailwindcss';

// @ts-expect-error DaisyUI doesn't have complete TypeScript types
import daisyui from 'daisyui';

const config: Config & { daisyui?: Record<string, unknown> } = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './src/**/*.module.css',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },

            colors: {
                // Pro-Hero brand colors
                primary: {
                    50: '#f0f1ff',
                    100: '#e0e2ff',
                    200: '#c7cbff',
                    300: '#a8b0ff',
                    400: '#8a94ff',
                    500: '#5850ec',
                    600: '#4c3fd1',
                    700: '#3f31b0',
                    800: '#35278b',
                    900: '#2d236f',
                },
                secondary: {
                    50: '#faf8ff',
                    100: '#f3f0ff',
                    200: '#e9e0ff',
                    300: '#d9c8ff',
                    400: '#c4a8ff',
                    500: '#764ba2',
                    600: '#6a3f96',
                    700: '#5c3685',
                    800: '#4e2f71',
                    900: '#432961',
                },
                accent: {
                    50: '#fff5fc',
                    100: '#ffebf9',
                    200: '#ffd4f0',
                    300: '#ffb3e6',
                    400: '#ff99dd',
                    500: '#f093fb',
                    600: '#e67ee8',
                    700: '#d966d1',
                    800: '#c54db8',
                    900: '#b1379a',
                },
            },

            spacing: {
                '1/10': '10%',
                '3/10': '30%',
                '4/10': '40%',
            },

            animation: {
                slideDown: 'slideDown 0.3s ease-out',
                slideup: 'slideup 0.3s ease-out',
            },

            keyframes: {
                slideDown: {
                    from: { opacity: '0', transform: 'translateY(-10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                slideup: {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },

    daisyui: {
        themes: [
            {
                light: {
                    primary: '#5850ec',
                    'primary-focus': '#4c3fd1',
                    'primary-content': '#ffffff',

                    secondary: '#764ba2',
                    'secondary-focus': '#6a3f96',
                    'secondary-content': '#ffffff',

                    accent: '#f093fb',
                    'accent-focus': '#e67ee8',
                    'accent-content': '#000000',

                    neutral: '#2d2d2d',
                    'neutral-focus': '#1f1f1f',
                    'neutral-content': '#ffffff',

                    'base-100': '#ffffff',
                    'base-200': '#f5f5f5',
                    'base-300': '#efefef',
                    'base-content': '#1f1f1f',

                    info: '#3b82f6',
                    success: '#10b981',
                    warning: '#f59e0b',
                    error: '#ef4444',
                },
            },
            {
                dark: {
                    primary: '#6366f1',
                    'primary-focus': '#818cf8',
                    'primary-content': '#ffffff',

                    secondary: '#a78bfa',
                    'secondary-focus': '#c4b5fd',
                    'secondary-content': '#1f1f1f',

                    accent: '#f472b6',
                    'accent-focus': '#f9a8d4',
                    'accent-content': '#000000',

                    neutral: '#e5e7eb',
                    'neutral-focus': '#f9fafb',
                    'neutral-content': '#1f1f1f',

                    'base-100': '#1f2937',
                    'base-200': '#111827',
                    'base-300': '#0f1419',
                    'base-content': '#f3f4f6',

                    info: '#3b82f6',
                    success: '#10b981',
                    warning: '#f59e0b',
                    error: '#ef4444',
                },
            },
        ],

        // Optimize bundle size: only include essential features
        styled: true,  // Include base component styles
        base: true,    // Include base theme styles
        utils: true,   // Include utility classes
        logs: false,   // Disable logs to reduce bundle size
        rtl: false,    // Disable RTL support if not needed

        // Minimize theme switching overhead
        prefix: '',
        darkTheme: 'dark',
        themeRoot: ':root',
    },

    plugins: [daisyui],
};

export default config;
