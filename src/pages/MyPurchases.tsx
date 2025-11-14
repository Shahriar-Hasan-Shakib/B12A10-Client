import { Suspense } from "react";
import { Link, useLoaderData } from "react-router";
import { Button, buttonPresets, LoadingCards } from "@src/components/ui";
import { ModelCard } from "@src/components/features";
import { useAuth } from "@src/hooks";
import { AUTH, ALL_MODELS } from "@src/constants/";
import { PurchaseIcon } from "@src/assets/icons";
import type { AIModel } from "@src/types/model.types";

interface Purchase {
    _id: string;
    modelId: string;
    modelName: string;
    framework: string;
    useCase: string;
    description: string;
    image: string;
    dataset?: string;
    purchased?: number;
    createdAt?: string;
    createdBy: string;
    purchasedBy: string;
    purchasedAt: string;
}

// Only the purchases grid needs Suspense
function PurchasesGrid() {
    const purchases = useLoaderData() as Purchase[];

    return (
        <>
            {/* Purchases Grid */}
            {purchases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {purchases.map((purchase: Purchase) => (
                        <ModelCard
                            key={purchase._id}
                            model={{
                                _id: purchase.modelId,
                                name: purchase.modelName,
                                framework: purchase.framework,
                                useCase: purchase.useCase,
                                description: purchase.description,
                                image: purchase.image,
                                dataset: purchase.dataset || "",
                                purchased: purchase.purchased || 0,
                                createdAt: purchase.createdAt || new Date().toISOString(),
                                createdBy: purchase.createdBy,
                                reviews: [],
                                rating: 0,
                            } as AIModel}
                        />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-16">
                    <PurchaseIcon className="w-24 h-24 mx-auto mb-4 text-base-content/40" />
                    <h3 className="text-2xl font-bold text-base-content mb-2">No Purchases Yet</h3>
                    <p className="text-base-content/70 mb-6">
                        You haven't purchased any AI models yet. Explore the catalog to find models that suit your needs.
                    </p>
                    <Link to={ALL_MODELS}>
                        <Button {...buttonPresets.primary}>Browse Models</Button>
                    </Link>
                </div>
            )}
        </>
    );
}

export const MyPurchases = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <section className="bg-base-200 py-20 px-6 min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-base-content mb-4">
                        Please Log In
                    </h1>
                    <p className="text-lg text-base-content/70 mb-8">
                        You need to be logged in to view your purchases.
                    </p>
                    <Link to={AUTH}>
                        <Button {...buttonPresets.primary}>
                            Log In
                        </Button>
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-base-100 py-12 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header - Always visible, no loading state */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">
                        My Purchased Models
                    </h1>
                    <p className="text-lg text-base-content/70 mb-4">
                        View all the AI models you've purchased from the community
                    </p>
                </div>

                {/* Only the grid is wrapped in Suspense */}
                <Suspense fallback={<LoadingCards />}>
                    <PurchasesGrid />
                </Suspense>
            </div>
        </section>
    );
};
