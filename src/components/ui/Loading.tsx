/**
 * Simple reusable loading components for Suspense fallbacks
 * No extra configuration needed - just use with <Suspense fallback={<Loading />}>
 */

import { Spinner } from './Spinner';

/**
 * Simple centered loading spinner
 */
export const Loading = () => {
    return (
        <div className="flex items-center justify-center py-12">
            <Spinner size="lg" color="primary" type="spinner" />
        </div>
    );
};

/**
 * Full screen loading spinner
 */
export const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="text-center">
                <Spinner size="lg" color="primary" type="spinner" />
                <p className="mt-4 text-base-content/70">Loading...</p>
            </div>
        </div>
    );
};

/**
 * Skeleton loader for model cards grid
 */
export const LoadingCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden animate-pulse">
                    <div className="h-48 bg-base-300" />
                    <div className="card-body p-6">
                        <div className="h-6 bg-base-300 rounded mb-3 w-3/4" />
                        <div className="flex gap-2 mb-4">
                            <div className="h-6 bg-base-300 rounded w-20" />
                            <div className="h-6 bg-base-300 rounded w-24" />
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="h-4 bg-base-200 rounded" />
                            <div className="h-4 bg-base-200 rounded w-5/6" />
                        </div>
                        <div className="h-10 bg-base-300 rounded mt-4" />
                    </div>
                </div>
            ))}
        </div>
    );
};

/**
 * Skeleton for models list page
 */
export const LoadingModelsList = () => {
    return (
        <section className="bg-base-100 py-12 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-10 bg-base-300 rounded w-64 mb-8" />
                    <div className="h-12 bg-base-200 rounded mb-4" />
                    <div className="h-10 bg-base-200 rounded mb-4 w-48" />
                    <div className="h-5 bg-base-200 rounded w-32 mb-8" />
                    <LoadingCards />
                </div>
            </div>
        </section>
    );
};
