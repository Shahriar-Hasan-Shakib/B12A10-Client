import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: 'normal' | 'bordered' | 'compact' | 'side';
    hoverable?: boolean;
    imageSrc?: string;
    imageAlt?: string;
    title?: string;
    actions?: ReactNode;
}

export const Card = ({
    children,
    variant = 'normal',
    hoverable = false,
    imageSrc,
    imageAlt,
    title,
    actions,
    className = '',
    ...props
}: CardProps) => {
    const variantClasses = {
        normal: 'card-normal',
        bordered: 'card-bordered',
        compact: 'card-compact',
        side: 'card-side'
    };

    const cardClasses = `card bg-base-100 shadow-xl ${variantClasses[variant]} ${hoverable ? 'hover:shadow-2xl transition-shadow duration-300' : ''} ${className}`.trim();

    return (
        <div className={cardClasses} {...props}>
            {imageSrc && (
                <figure>
                    <img src={imageSrc} alt={imageAlt || 'Card image'} />
                </figure>
            )}
            <div className="card-body">
                {title && <h2 className="card-title">{title}</h2>}
                {children}
                {actions && <div className="card-actions justify-end">{actions}</div>}
            </div>
        </div>
    );
};
