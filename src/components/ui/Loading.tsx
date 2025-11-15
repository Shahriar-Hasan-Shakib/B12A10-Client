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



