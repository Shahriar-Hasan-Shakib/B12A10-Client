// #READ: Reusable grid component to display model cards
// #FILTER: Supports filtering models by type and custom filters
// #RESPONSIVE: Grid adjusts columns based on screen size (1-3 columns)
// #UI: Handles loading, error, and empty states
import { useModels } from '@src/hooks';
import { ModelCard } from './ModelCard';
import { LoadingModel } from '@src/components/ui';

// #TYPES: Supported model types for different pages
type ModelType = 'latest' | 'all' | 'myModels' | 'purchased' | 'filtered';

interface CardGridProps {
    type: ModelType;
    limit?: number;
    filters?: Record<string, string>;
    title?: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onBuy?: (id: string) => void;
    showActions?: boolean;
    emptyMessage?: string;
}


export const CardGrid = ({
    type,
    limit = 6,
    filters,
    title,
    onEdit,
    onDelete,
    onBuy,
    showActions = false,
    emptyMessage = 'No models found'
}: CardGridProps) => {

    const { models, loading, error, refetch, isRefetching } = useModels({ type, limit, filters });

    // #UI: Show loading skeleton on initial load
    if (loading) return LoadingModel({ count: limit });

    // #ERROR: Display error message with retry option
    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-error mb-4">{error}</p>
                <button
                    onClick={refetch}
                    className="btn btn-outline btn-sm"
                    disabled={isRefetching}
                >
                    {isRefetching ? 'Retrying...' : 'Try Again'}
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">

            {title && <h2 className="text-3xl font-bold text-base-content mb-6"> {title} </h2>}

            {models.length > 0 ? (
                <div className="model-grid">
                    {models.map((model) => (
                        <ModelCard
                            key={model._id}
                            model={model}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onBuy={onBuy}
                            showActions={showActions}
                            isPurchased={type === 'purchased'}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-base-content/60 text-lg">{emptyMessage}</p>
                </div>
            )}
        </div>
    );
};
