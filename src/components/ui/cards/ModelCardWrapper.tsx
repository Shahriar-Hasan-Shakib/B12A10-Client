import type { ReactNode } from 'react';
import { Card } from '../Card';
import { Badge } from '../Badge';

interface ModelCardWrapperProps {
    title: string;
    imageSrc?: string;
    imageAlt?: string;
    framework: string;
    useCase: string;
    description: string;
     badges?: Array<{ label: string; variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'accent' | 'info' }>;
    stats?: ReactNode;
    actions: ReactNode;
    variant?: 'normal' | 'bordered' | 'compact' | 'side';
    hoverable?: boolean;
    className?: string;
}

/**
 * ModelCardWrapper Component - Displays AI model information in a standardized card format
 * Combines image, badges, stats, and actions in a consistent layout
 * 
 * @example
 * <ModelCardWrapper
 *   title="BERT Model"
 *   framework="TensorFlow"
 *   useCase="NLP"
 *   description="Pre-trained transformer model"
 *   actions={<Button>View Details</Button>}
 * />
 */
export const ModelCardWrapper = ({
    title,
    imageSrc,
    imageAlt,
    framework,
    useCase,
    description,
    badges = [],
    stats,
    actions,
    variant = 'normal',
    hoverable = true,
    className = '',
}: ModelCardWrapperProps) => {
    return (
        <Card
            variant={variant}
            hoverable={hoverable}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            title={title}
            className={`h-full ${className}`}
        >
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="primary" size="sm"> {framework} </Badge>
                <Badge variant="secondary" size="sm"> {useCase} </Badge>
                {badges.map((badge, idx) => (
                    <Badge key={idx} variant={badge.variant || 'info'} size="sm">{badge.label}</Badge>
                ))}
            </div>

            {/* Description */}
            <p className="text-base-content/70 text-sm line-clamp-3 mb-4">{description}</p>

            {/* Stats */}
            {stats && <div className="mb-4 pb-4 border-b border-base-300">{stats}</div>}

            {/* Actions */}
            <div className="card-actions justify-end">{actions}</div>
        </Card>
    );
};
