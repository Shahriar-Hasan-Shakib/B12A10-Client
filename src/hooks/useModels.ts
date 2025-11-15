import { useEffect, useState } from 'react';
import { publicAxios } from '@src/config/axios';
import { ALL_MODELS } from '@src/constants';
import type { AIModel } from '@src/types';
import { models } from '@src/services';

type ModelType = 'latest' | 'all' | 'myModels' | 'purchased' | 'filtered';

interface UseModelsOptions {
    type: ModelType;
    limit?: number;
    filters?: Record<string, string>;
}

interface UseModelsReturn {
    models: AIModel[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    isRefetching: boolean;
}


export function useModels(options: UseModelsOptions): UseModelsReturn {
    const { type, limit = 6, filters } = options;

    const [models, setModels] = useState<AIModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchModelsByType(type, limit, filters);

                if (isMounted) {
                    setModels(data);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(`Error fetching models (${type}):`, err);
                    setError('Failed to load models');
                    setModels([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [type, limit, JSON.stringify(filters)]);

    // Manual refetch function with loading state
    const refetch = async () => {
        try {
            setIsRefetching(true);
            setError(null);

            const data = await fetchModelsByType(type, limit, filters);
            setModels(data);
        } catch (err) {
            console.error(`Error refetching models (${type}):`, err);
            setError('Failed to reload models');
        } finally {
            setIsRefetching(false);
        }
    };

    return {
        models,
        loading,
        error,
        refetch,
        isRefetching
    };
}

/**
 * Helper function to fetch models based on type
 */
async function fetchModelsByType(
    type: ModelType,
    limit: number,
    filters?: Record<string, string>
): Promise<AIModel[]> {
    let response;

    switch (type) {
        case 'latest':
            response = await publicAxios.get(`${ALL_MODELS}?limit=${limit}&sort=-createdAt`);
            break;

        case 'myModels': response = await models.myModels(); break;

        case 'purchased': response = await models.getPurchasedModels(); break;


        default:
            response = await models.getAll(filters); break;
    }
    return response.data?.data || response.data || [];
}


