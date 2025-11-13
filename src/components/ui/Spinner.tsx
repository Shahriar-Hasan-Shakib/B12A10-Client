interface SpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
    type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
    className?: string;
}

export const Spinner = ({
    size = 'md',
    color = 'primary',
    type = 'spinner',
    className = ''
}: SpinnerProps) => {
    const sizeClasses = {
        xs: 'loading-xs',
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg'
    };

    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        neutral: 'text-neutral',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error'
    };

    const typeClasses = {
        spinner: 'loading-spinner',
        dots: 'loading-dots',
        ring: 'loading-ring',
        ball: 'loading-ball',
        bars: 'loading-bars',
        infinity: 'loading-infinity'
    };

    return (
        <span className={`loading ${typeClasses[type]} ${sizeClasses[size]} ${colorClasses[color]} ${className}`.trim()}></span>
    );
};
