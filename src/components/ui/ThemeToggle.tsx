import { useTheme } from '@src/hooks';
import { SunIcon, MoonIcon } from '@src/assets/icons';

interface ThemeToggleProps {
    className?: string;
    showLabel?: boolean;
}

export const ThemeToggle = ({ className = '', showLabel = false }: ThemeToggleProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <label className={`swap swap-rotate ${className}`.trim()}>
            <input
                type="checkbox"
                className="theme-controller"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                aria-label="Toggle theme"
            />

            {/* Sun icon for light mode */}
            <SunIcon className="swap-off w-6 h-6 text-gray-500" />

            {/* Moon icon for dark mode */}
            <MoonIcon className="swap-on fill-current w-6 h-6" />

            {showLabel && (
                <span className="ml-2 text-sm font-medium">
                    {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
            )}
        </label>
    );
};
