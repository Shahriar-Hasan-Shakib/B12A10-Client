// #THEME: Dark/Light theme context provider with localStorage persistence
// #LOCALSTORAGE: Persists theme preference across sessions
// #RESPONSIVE: Respects system dark mode preference on first load
import { ThemeContext } from '@src/hooks';
import { useStorage } from '@src/hooks/storage/useStorage';
import type { Theme, ThemeContextType } from '@src/types';
import { useEffect, useState, type ReactNode } from 'react';

interface ThemeProviderProps { children: ReactNode; }

// #THEME: Get system theme preference
const getSystemTheme = (): Theme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const storage = useStorage();

    // #THEME: Initialize from localStorage or system preference
    const [theme, setTheme] = useState<Theme>(() =>
        storage.theme || getSystemTheme()
    );

    // #THEME: Listen for system theme changes
    useEffect(() => {
        // Only listen to system changes if user hasn't set a preference
        if (storage.theme) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [storage.theme]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('data-theme', theme); // #THEME: Set DaisyUI data-theme attribute for component styling

        // Only save to localStorage if user explicitly toggled
        if (storage.theme !== null) {
            storage.setTheme(theme);
        }
    }, [theme, storage]);

    const toggleTheme = () => { // #THEME: Toggle between light and dark modes
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        storage.setTheme(newTheme); // #LOCALSTORAGE: Save user preference
    };

    const value: ThemeContextType = { theme, toggleTheme };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
