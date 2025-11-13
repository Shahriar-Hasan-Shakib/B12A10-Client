import type { AIModel } from '@src/types/model.types';
import { Button } from '@src/components/ui';
import { Link } from 'react-router-dom';
import { PurchaseIcon } from '@src/assets/icons';

interface ModelCardProps {
    model: AIModel;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    showActions?: boolean;
}

// ModelCard Component - Display AI model in card format
export const ModelCard = ({ model, onEdit, onDelete, showActions = false }: ModelCardProps) => {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary group">
            {/* Model Image */}
            <figure className="relative overflow-hidden h-48">
                <img
                    src={model.image || '/placeholder-model.png'}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Framework Badge */}
                <div className="badge badge-primary absolute top-3 right-3 shadow-lg">
                    {model.framework}
                </div>
            </figure>

            {/* Card Body */}
            <div className="card-body p-5">
                {/* Title and Use Case */}
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h2 className="card-title text-lg font-bold line-clamp-2 flex-1">
                        {model.name}
                    </h2>
                </div>

                {/* Use Case Badge */}
                <div className="badge badge-secondary badge-outline mb-3">
                    {model.useCase}
                </div>

                {/* Description */}
                <p className="text-base-content/70 text-sm line-clamp-3 mb-3 min-h-14">
                    {model.description}
                </p>

                {/* Dataset Info */}
                <div className="flex items-center gap-2 text-xs text-base-content/60 mb-3">
                    <PurchaseIcon className="w-4 h-4" />
                    <span className="line-clamp-1">{model.dataset}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-base-content/60 mb-4 pb-4 border-b border-base-300">
                    <div className="flex items-center gap-1">
                        <PurchaseIcon className="w-4 h-4" />
                        <span>{model.purchased} purchases</span>
                    </div>
                    <div>
                        <span>{new Date(model.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="card-actions justify-between items-center">
                    {showActions && (onEdit || onDelete) ? (
                        <div className="flex gap-2 w-full">
                            {onEdit && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(model._id)}
                                    className="flex-1"
                                >
                                    Edit
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(model._id)}
                                    className="flex-1"
                                >
                                    Delete
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Link to={`/models/${model._id}`} className="w-full">
                            <Button variant="primary" size="md" fullWidth>
                                View Details
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
