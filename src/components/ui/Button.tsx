import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoaderIcon } from 'react-hot-toast';

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

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

    return (
        <button className={combinedStyles} disabled={disabled || isLoading} {...props}>
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <LoaderIcon />
                    <span>Loading...</span>
                </span>
            ) : children}
        </button>
    );
};
