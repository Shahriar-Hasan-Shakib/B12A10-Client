import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { Button, buttonPresets } from "@src/components/ui";
import { ModelCard } from "@src/components/features";
import { useAuth } from "@src/hooks";
import { purchasesService } from "@src/services";
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

export const MyPurchases = () => {
    const { user } = useAuth();
    const purchases = useLoaderData();
    // const purchases = useState<AIModel[]>([]);
    // const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (purchases) {
            setLoading(false);
        }
    }, [purchases]);

    console.log(purchases?.data);

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

    if (loading) {
        return (
            <section className="bg-base-100 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-base-300 rounded w-64 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300">
                                    <div className="h-48 bg-base-300 rounded-lg mb-4"></div>
                                    <div className="h-6 bg-base-300 rounded mb-2"></div>
                                    <div className="h-4 bg-base-200 rounded mb-4"></div>
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
        <section className="bg-base-100 py-12 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">
                        My Purchased Models
                    </h1>
                    <p className="text-lg text-base-content/70 mb-4">
                        View all the AI models you've purchased from the community
                    </p>
                    <p className="text-base-content/60">
                        You have purchased {purchases.length} model{purchases.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Purchases Grid */}
                {purchases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {purchases.map((purchase: Purchase) => (
                            <ModelCard
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
            </div>
        </section>
    );
};
