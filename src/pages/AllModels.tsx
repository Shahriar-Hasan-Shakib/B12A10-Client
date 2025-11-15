// #READ: Browse and display all AI models from MongoDB
// #FILTER: Implements framework filtering (TensorFlow, PyTorch, etc.)
// #SEARCH: Search functionality integrated via CardGrid component
// #PURCHASE: Users can purchase models directly from this page
import { useState } from "react";
import { Button } from "@src/components/ui";
import { models as modelsService } from "@src/services";
import { CardGrid } from "@src/components/features/models";

export const AllModels = () => {
    const [filters, setFilters] = useState<Record<string, string>>({

    });

    const handleBuyModel = async (id: string) => {
        await modelsService.buyModel(id);
    };

    return (
        <section className="bg-base-100 py-12 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">
                        All AI Models
                    </h1>
                    <p className="text-lg text-base-content/70">
                        Browse and purchase AI models from our community
                    </p>
                </div>

                <div className="flex gap-4 mb-8">
                    {/* #FILTER: Show all models without filtering */}
                    <Button
                        variant={filters.framework ? 'outline' : 'primary'}
                        onClick={() => { setFilters({}); }}
                    >
                        All Models
                    </Button>
                    {/* #FILTER: Filter by TensorFlow framework */}
                    <Button
                        variant={filters.framework === 'TensorFlow' ? 'primary' : 'outline'}
                        onClick={() => { setFilters({ framework: 'TensorFlow' }); }}
                    >
                        TensorFlow
                    </Button>
                    {/* #FILTER: Filter by PyTorch framework */}
                    <Button
                        variant={filters.framework === 'PyTorch' ? 'primary' : 'outline'}
                        onClick={() => { setFilters({ framework: 'PyTorch' }); }}
                    >
                        PyTorch
                    </Button>
                </div>

                <CardGrid
                    type='all'
                    filters={filters}
                    onBuy={handleBuyModel}
                    emptyMessage="No models found. Try adjusting your filters."
                />
            </div>
        </section>
    );
};
