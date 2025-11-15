import { CardGrid } from "@src/components/features/models";

export const FeaturedModels = () => {
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
                <CardGrid
                    type="latest"
                    limit={6}
                    emptyMessage="No models available yet. Be the first to add one!"
                />
            </div>
        </section>
    );
};
