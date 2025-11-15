// #THEME: Dark/Light theme context provider with localStorage persistence
// #LOCALSTORAGE: Persists theme preference across sessions
// #RESPONSIVE: Respects system dark mode preference on first load
import { ThemeContext } from '@src/hooks';
import { useStorage } from '@src/hooks/storage/useStorage';
import type { Theme, ThemeContextType } from '@src/types';
import { useEffect, useState, type ReactNode } from 'react';

interface ThemeProviderProps { children: ReactNode; }

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const storage = useStorage();

    const [theme, setTheme] = useState<Theme>(() => // #THEME: Initialize from localStorage or system preference
        (storage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) as Theme
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        root.setAttribute('data-theme', theme); // #THEME: Set DaisyUI data-theme attribute for component styling
        storage.setTheme(theme);  // #LOCALSTORAGE: Save theme preference
    }, [theme, storage]);

    const toggleTheme = () => { // #THEME: Toggle between light and dark modes
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value: ThemeContextType = { theme, toggleTheme };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
