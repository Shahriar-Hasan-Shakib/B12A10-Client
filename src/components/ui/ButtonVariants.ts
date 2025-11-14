import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button Variants Presets - Common button configurations for reuse
 * Reduces prop repetition across the application
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Common button presets used throughout the application
 */
export const buttonPresets = {
    // Primary actions
    primary: { variant: 'primary' as const, size: 'md' as const },
    primarySmall: { variant: 'primary' as const, size: 'sm' as const },
    primaryLarge: { variant: 'primary' as const, size: 'lg' as const },
    primaryBlock: { variant: 'primary' as const, size: 'md' as const, fullWidth: true },

    // Secondary actions
    secondary: { variant: 'secondary' as const, size: 'md' as const },
    secondarySmall: { variant: 'secondary' as const, size: 'sm' as const },
    secondaryBlock: { variant: 'secondary' as const, size: 'md' as const, fullWidth: true },

    // Outline buttons (usually for alternative actions)
    outline: { variant: 'outline' as const, size: 'md' as const },
    outlineSmall: { variant: 'outline' as const, size: 'sm' as const },
    outlineBlock: { variant: 'outline' as const, size: 'md' as const, fullWidth: true },

    // Danger buttons (destructive actions)
    danger: { variant: 'danger' as const, size: 'md' as const },
    dangerSmall: { variant: 'danger' as const, size: 'sm' as const },
    dangerBlock: { variant: 'danger' as const, size: 'md' as const, fullWidth: true },

    // Ghost buttons (subtle actions)
    ghost: { variant: 'ghost' as const, size: 'md' as const },
    ghostSmall: { variant: 'ghost' as const, size: 'sm' as const },

    // Accent buttons
    accent: { variant: 'accent' as const, size: 'md' as const },
    accentSmall: { variant: 'accent' as const, size: 'sm' as const },
} as const;

/**
 * Common button group configurations
 * Used for consistent button layouts in forms and dialogs
 */
export const buttonGroups = {
    // Dialog actions: Cancel and Confirm
    dialogActions: {
        cancel: { variant: 'ghost' as const, size: 'md' as const },
        confirm: { variant: 'primary' as const, size: 'md' as const },
    },

    // Form actions: Reset and Submit
    formActions: {
        reset: { variant: 'outline' as const, size: 'md' as const },
        submit: { variant: 'primary' as const, size: 'md' as const },
    },

    // Card actions: Edit and Delete
    cardActions: {
        edit: { variant: 'outline' as const, size: 'sm' as const },
        delete: { variant: 'danger' as const, size: 'sm' as const },
    },

    // List item actions
    listItemActions: {
        view: { variant: 'primary' as const, size: 'sm' as const },
        edit: { variant: 'outline' as const, size: 'sm' as const },
        delete: { variant: 'danger' as const, size: 'sm' as const },
    },
} as const;

/**
 * Common text button components
 * These are button elements that look like text/links
 */
export const textButtonVariants = {
    link: { variant: 'ghost' as const, size: 'sm' as const, className: 'text-primary hover:text-primary/80' },
    muted: { variant: 'ghost' as const, size: 'sm' as const, className: 'text-base-content/60 hover:text-base-content/80' },
} as const;

/**
 * Type helpers for button props
 */
export interface ButtonPresetProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    preset?: keyof typeof buttonPresets;
    children: ReactNode;
}

export interface ButtonGroupProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    groupType?: keyof typeof buttonGroups;
    actionType?: string;
    children: ReactNode;
}
