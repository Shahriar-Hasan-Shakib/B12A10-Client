import type { AIModel } from '@src/types/model.types';
import { Button } from '@src/components/ui';
import { Link } from 'react-router-dom';

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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                    </svg>
                    <span className="line-clamp-1">{model.dataset}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-base-content/60 mb-4 pb-4 border-b border-base-300">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
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
