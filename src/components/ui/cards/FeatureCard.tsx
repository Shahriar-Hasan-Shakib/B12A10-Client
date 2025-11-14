import type { ReactNode } from 'react';
import { Card } from '../Card';

interface FeatureCardProps {
    icon?: ReactNode;
    title: string;
    description: string;
    hoverable?: boolean;
    className?: string;
}

/**
 * FeatureCard Component - Displays a feature with icon, title, and description
 * Used for showcasing capabilities and benefits
 * 
 * @example
 * <FeatureCard
 *   icon={<ThunderIcon />}
 *   title="Fast Processing"
 *   description="Process models in milliseconds"
 * />
 */
export const FeatureCard = ({
    icon,
    title,
    description,
    hoverable = true,
    className = '',
}: FeatureCardProps) => {
    return (
        <Card
            variant="normal"
            hoverable={hoverable}
            className={`flex flex-col items-center text-center h-full ${className}`}
        >
            {icon && <div className="text-4xl mb-4">{icon}</div>}
            <h3 className="text-xl font-bold mb-3 text-base-content">{title}</h3>
            <p className="text-base-content/70 text-sm leading-relaxed">{description}</p>
        </Card>
    );
};
