// #UPDATE: Edit existing AI model - Creator only
// #PRIVATE_ROUTE: Requires authentication to access
// #CRUD: Fetch existing model data and allow updates
// #VALIDATION: Pre-fills form with current model data
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ModelForm } from '@src/components/features';
import { Button } from '@src/components/ui';
import { ALL_MODELS } from "@src/constants/";
import type { AIModel } from "@src/types";
import { models } from "@src/services";

export const UpdateModel = () => {
    const { id } = useParams<{ id: string }>();  // #ROUTING: Extract model ID from URL parameters
    const navigate = useNavigate();
    const [model, setModel] = useState<AIModel | null>(null);  // #STATE: Store fetched model data
    const [loading, setLoading] = useState(true); // #STATE: Track loading state while fetching

    useEffect(() => {
        const fetchModel = async () => {
            if (!id) return;

            setModel(await models.getDetails({ params: { id } }));
            setLoading(false);
        };

        fetchModel();
    }, [id]);

    // #UI: Show loading skeleton while fetching model data
    if (loading) {
        return (
            <section className="bg-gray-50 py-12 px-6 min-h-screen">
                <div className="max-w-3xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // #ERROR: Show error message if model not found
    if (!model) {
        return (
            <section className="bg-gray-50 py-20 px-6 min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Model Not Found
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The model you're trying to edit doesn't exist.
                    </p>
                    <Button
                        onClick={() => navigate(ALL_MODELS)}
                        variant="primary"
                        size="lg"
                    >
                        Back to Models
                    </Button>
                </div>
            </section>
        );
    }

    // #UPDATE: Render ModelForm with existing data pre-filled
    return (
        <div>
            <ModelForm initialData={model} isEdit={true} />
        </div>
    );
};
