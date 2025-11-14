import { Suspense } from "react";
import { useLoaderData } from "react-router";
import { mockAIModels } from "@src/data/mockModels";
import { ModelCard } from "@src/components/features/ModelCard";
import { LoadingCards } from "@src/components/ui";
import type { AIModel } from "@src/types/model.types";

function FeaturedModelsContent() {
    const loaderData = useLoaderData() as { data: AIModel[] } | null;
    const models = loaderData?.data || mockAIModels.slice(0, 6);

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
}

export const FeaturedModels = () => {
    return (
        <Suspense fallback={<LoadingCards />}>
            <FeaturedModelsContent />
        </Suspense>
    );
};
