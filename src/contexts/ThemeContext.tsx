import { ThemeContext } from '@src/hooks';
import { useStorage } from '@src/hooks/storage/useStorage';
import type { Theme, ThemeContextType } from '@src/types';
import { useEffect, useState, type ReactNode } from 'react';

interface ThemeProviderProps { children: ReactNode; }

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const storage = useStorage();
    const [theme, setTheme] = useState<Theme>(() => 
        (storage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) as Theme
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        // Set DaisyUI data-theme attribute for component styling
        root.setAttribute('data-theme', theme);
        storage.setTheme(theme);
    }, [theme, storage]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value: ThemeContextType = { theme, toggleTheme };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
