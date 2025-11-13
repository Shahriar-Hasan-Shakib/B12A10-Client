import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button = ({ children, variant = 'primary', size = 'md', isLoading = false, fullWidth = false, className = '', disabled, ...props }: ButtonProps) => {
    const baseStyles = 'btn';

    const variantStyles = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        outline: 'btn-outline btn-primary',
        danger: 'btn-error',
        ghost: 'btn-ghost',
    };

    const sizeStyles = {
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg'
    };

    const widthStyle = fullWidth ? 'btn-block' : '';
    const loadingClass = isLoading ? 'loading loading-spinner' : '';

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${loadingClass} ${className}`.trim();

    return (
        <button className={combinedStyles} disabled={disabled || isLoading} {...props}>
            {!isLoading && children}
        </button>
    );
};
