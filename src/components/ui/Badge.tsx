import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'accent' | 'info';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    outline?: boolean;
    icon?: ReactNode;
    clearable?: boolean;
    onClear?: () => void;
}

/**
 * Badge Component - Display labeled, categorized text
 * Reusable across all pages for consistent styling
 * 
 * @example
 * // Primary badge
 * <Badge variant="primary">TensorFlow</Badge>
 * 
 * // With icon
 * <Badge variant="success" icon={<CheckIcon />}>Verified</Badge>
 * 
 * // Outline variant
 * <Badge variant="primary" outline>Premium</Badge>
 */
export const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    outline = false,
    icon,
    clearable = false,
    onClear,
    className = '',
    ...props
}: BadgeProps) => {
    const variantClasses = {
        primary: outline ? 'badge-primary badge-outline' : 'badge-primary',
        secondary: outline ? 'badge-secondary badge-outline' : 'badge-secondary',
        success: outline ? 'badge-success badge-outline' : 'badge-success',
        warning: outline ? 'badge-warning badge-outline' : 'badge-warning',
        danger: outline ? 'badge-error badge-outline' : 'badge-error',
        accent: outline ? 'badge-accent badge-outline' : 'badge-accent',
        info: outline ? 'badge-info badge-outline' : 'badge-info',
    };

    const sizeClasses = {
        xs: 'badge-xs',
        sm: 'badge-sm',
        md: '',
        lg: 'badge-lg',
    };

    const combinedClasses = `badge gap-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
        <span className={combinedClasses} {...props}>
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
            {clearable && onClear && (
                <button
                    onClick={onClear}
                    className="ml-1 hover:opacity-70 transition-opacity"
                    aria-label="Remove badge"
                >
                    ✕
                </button>
            )}
        </span>
    );
};

// Preset badge components for common use cases
export const PrimaryBadge = (props: Omit<BadgeProps, 'variant'>) => (
    <Badge variant="primary" {...props} />
);

export const SecondaryBadge = (props: Omit<BadgeProps, 'variant'>) => (
    <Badge variant="secondary" {...props} />
);

export const SuccessBadge = (props: Omit<BadgeProps, 'variant'>) => (
    <Badge variant="success" {...props} />
);

export const WarningBadge = (props: Omit<BadgeProps, 'variant'>) => (
    <Badge variant="warning" {...props} />
);

export const DangerBadge = (props: Omit<BadgeProps, 'variant'>) => (
    <Badge variant="danger" {...props} />
);

export const AccentBadge = (props: Omit<BadgeProps, 'variant'>) => (
    <Badge variant="accent" {...props} />
);

export const InfoBadge = (props: Omit<BadgeProps, 'variant'>) => (
    <Badge variant="info" {...props} />
);
