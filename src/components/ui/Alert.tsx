import type { HTMLAttributes, ReactNode } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant: AlertVariant;
    title?: string;
    message: string | ReactNode;
    icon?: ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
}

/**
 * Alert Component - Display system messages and notifications
 * Replaces scattered alert styling throughout the app
 * 
 * @example
 * <Alert
 *   variant="success"
 *   title="Success"
 *   message="Your model has been saved successfully"
 * />
 */
export const Alert = ({
    variant,
    title,
    message,
    icon,
    dismissible = false,
    onDismiss,
    className = '',
    ...props
}: AlertProps) => {
    const variantClasses = {
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-error',
    };

    return (
        <div
            className={`alert ${variantClasses[variant]} ${className} gap-4 p-4 rounded-lg`.trim()}
            role="alert"
            {...props}
        >
            <div className="flex items-start gap-3 flex-1">
                {icon && <span className="shrink-0 text-lg">{icon}</span>}
                <div className="flex-1">
                    {title && <p className="font-bold mb-1">{title}</p>}
                    <p className="text-sm">{message}</p>
                </div>
            </div>
            {dismissible && onDismiss && (
                <button
                    onClick={onDismiss}
                    className="btn btn-ghost btn-sm shrink-0"
                    aria-label="Close alert"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

/**
 * InfoAlert Component - Display informational messages
 */
export const InfoAlert = (props: Omit<AlertProps, 'variant'>) => (
    <Alert variant="info" {...props} />
);

/**
 * SuccessAlert Component - Display success messages
 */
export const SuccessAlert = (props: Omit<AlertProps, 'variant'>) => (
    <Alert variant="success" {...props} />
);

/**
 * WarningAlert Component - Display warning messages
 */
export const WarningAlert = (props: Omit<AlertProps, 'variant'>) => (
    <Alert variant="warning" {...props} />
);

/**
 * ErrorAlert Component - Display error messages
 */
export const ErrorAlert = (props: Omit<AlertProps, 'variant'>) => (
    <Alert variant="error" {...props} />
);
