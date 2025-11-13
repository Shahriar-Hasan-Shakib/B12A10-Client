import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    inputSize?: 'sm' | 'md' | 'lg';
    variant?: 'bordered' | 'ghost';
}

export const Input = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    inputSize = 'md',
    variant = 'bordered',
    className = '',
    ...props
}: InputProps) => {
    const sizeClasses = {
        sm: 'input-sm',
        md: 'input-md',
        lg: 'input-lg'
    };

    const variantClasses = {
        bordered: 'input-bordered',
        ghost: 'input-ghost'
    };

    const inputClasses = `input ${variantClasses[variant]} ${sizeClasses[inputSize]} ${error ? 'input-error' : ''} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`.trim();

    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {leftIcon}
                    </div>
                )}
                <input className={inputClasses} {...props} />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
            {helperText && !error && (
                <label className="label">
                    <span className="label-text-alt">{helperText}</span>
                </label>
            )}
        </div>
    );
};
