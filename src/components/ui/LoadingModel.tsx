/**
 * LoadingModel - Skeleton loading component for model cards
 * Used as Suspense fallback while model data is being fetched
 */

interface LoadingModelProps {
    count?: number;
}

/**
 * Single skeleton card matching ModelCard layout
 */
const SkeletonCard = () => {
    return (
        <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
            {/* Image skeleton */}
            <div className="h-48 bg-base-300 animate-pulse" />

            {/* Card body skeleton */}
            <div className="card-body p-5">
                {/* Title skeleton */}
                <div className="h-6 bg-base-300 rounded animate-pulse mb-3 w-3/4" />

                {/* Badges skeleton */}
                <div className="flex gap-2 mb-3">
                    <div className="h-6 bg-base-300 rounded animate-pulse w-20" />
                    <div className="h-6 bg-base-300 rounded animate-pulse w-24" />
                </div>

                {/* Description skeleton */}
                <div className="space-y-2 mb-3 min-h-14">
                    <div className="h-4 bg-base-200 rounded animate-pulse" />
                    <div className="h-4 bg-base-200 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-base-200 rounded animate-pulse w-4/6" />
                </div>

                {/* Dataset info skeleton */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-base-300 rounded animate-pulse" />
                    <div className="h-3 bg-base-200 rounded animate-pulse w-32" />
                </div>

                {/* Stats skeleton */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-base-300">
                    <div className="h-3 bg-base-200 rounded animate-pulse w-24" />
                    <div className="h-3 bg-base-200 rounded animate-pulse w-20" />
                </div>

                {/* Button skeleton */}
                <div className="h-10 bg-base-300 rounded animate-pulse mt-2" />
            </div>
        </div>
    );
};

/**
 * LoadingModel component - Grid of skeleton cards
 * @param count - Number of skeleton cards to show (default: 6)
 */
export const LoadingModel = ({ count = 6 }: LoadingModelProps) => {
    return (
        <div className="model-grid">
            {Array.from({ length: count }, (_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};
