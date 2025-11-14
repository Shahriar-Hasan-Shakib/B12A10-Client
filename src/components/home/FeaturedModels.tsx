import { useEffect, useState } from "react";
import { mockAIModels } from "@src/data/mockModels";
import { ModelCard } from "@src/components/features/ModelCard";
import type { AIModel } from "@src/types/model.types";
import { useLoaderData } from "react-router";

export const FeaturedModels = () => {
    const loaderData = useLoaderData() as { data: AIModel[] } | null;
    const [models, setModels] = useState<AIModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loaderData?.data) setModels(loaderData.data);
        else setModels(mockAIModels.slice(0, 6));
        setLoading(false);
    }, [loaderData]);

    if (loading) {
        return (
            <section className="bg-base-200 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-base-300 rounded w-64 mx-auto mb-4"></div>
                        <div className="h-4 bg-base-300/70 rounded w-96 mx-auto mb-12"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-base-100 p-6 rounded-xl shadow-lg">
                                    <div className="h-48 bg-base-300 rounded-lg mb-4"></div>
                                    <div className="h-6 bg-base-300 rounded mb-2"></div>
                                    <div className="h-4 bg-base-300/70 rounded mb-4"></div>
                                    <div className="h-10 bg-base-300 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-base-200 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-base-content mb-3">
                        Featured AI Models
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Explore our most recently added AI models from the community
                    </p>
                </div>

                {/* Models Grid */}
                {models.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {models.map((model) => (
                            <ModelCard key={model._id} model={model} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-base-content/60">
                            No models available yet. Be the first to add one!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};
