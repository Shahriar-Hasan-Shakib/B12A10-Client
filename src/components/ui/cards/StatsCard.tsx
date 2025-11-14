import type { ReactNode } from 'react';
import { Card } from '../Card';

interface StatsCardProps {
    label: string;
    value: string | number;
    unit?: string;
    icon?: ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    variant?: 'normal' | 'bordered' | 'compact' | 'side';
    className?: string;
}

/**
 * StatsCard Component - Display key metrics and statistics
 * Used for dashboards and analytics
 * 
 * @example
 * <StatsCard
 *   label="Total Models"
 *   value={1234}
 *   icon={<PackageIcon />}
 *   trend="up"
 *   trendValue="+12%"
 * />
 */
export const StatsCard = ({
    label,
    value,
    unit,
    icon,
    trend,
    trendValue,
    variant = 'normal',
    className = '',
}: StatsCardProps) => {
    const trendColor = {
        up: 'text-success',
        down: 'text-error',
        neutral: 'text-base-content/60',
    };

    return (
        <Card variant={variant} className={`p-6 ${className}`}>
            <div className="flex items-start justify-between mb-4">
                {icon && <div className="text-2xl text-primary">{icon}</div>}
                {trend && (
                    <div className={`text-sm font-bold ${trendColor[trend]}`}>{trendValue}</div>
                )}
            </div>

            <div className="mb-2">
                <p className="text-sm text-base-content/60 mb-1">{label}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-base-content">{value}</span>
                    {unit && <span className="text-lg text-base-content/60">{unit}</span>}
                </div>
            </div>
        </Card>
    );
};
