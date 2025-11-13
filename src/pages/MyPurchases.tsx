import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Layout } from "@src/components/ui/Layout";
import { useAuth } from "@src/hooks";
import { mockAIModels } from "@src/data/mockModels";
import { AUTH, ALL_MODELS } from "@src/constants/";
import { PurchaseIcon } from "@src/assets/icons";

interface Purchase {
    _id: string;
    modelId: string;
    modelName: string;
    framework: string;
    useCase: string;
    description: string;
    image: string;
    createdBy: string;
    purchasedBy: string;
    purchasedAt: string;
}

export const MyPurchases = () => {
    const { user } = useAuth();
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        // Try to fetch from backend, fallback to mock data
        const apiUrl = import.meta.env.VITE_API_URL;

        if (apiUrl) {
            fetch(`${apiUrl}/purchases/my-purchases?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setPurchases(data);
                    setLoading(false);
                })
                .catch(() => {
                    // Fallback to mock data - simulate some purchases
                    const mockPurchases: Purchase[] = mockAIModels.slice(0, 2).map((model) => ({
                        _id: `purchase-${model._id}`,
                        modelId: model._id,
                        modelName: model.name,
                        framework: model.framework,
                        useCase: model.useCase,
                        description: model.description,
                        image: model.image,
                        createdBy: model.createdBy,
                        purchasedBy: user?.email || "",
                        purchasedAt: new Date().toISOString(),
                    }));
                    setPurchases(mockPurchases);
                    setLoading(false);
                });
        } else {
            // Use mock data - simulate some purchases
            setTimeout(() => {
                const mockPurchases: Purchase[] = mockAIModels.slice(0, 2).map((model) => ({
                    _id: `purchase-${model._id}`,
                    modelId: model._id,
                    modelName: model.name,
                    framework: model.framework,
                    useCase: model.useCase,
                    description: model.description,
                    image: model.image,
                    createdBy: model.createdBy,
                    purchasedBy: user?.email || "",
                    purchasedAt: new Date().toISOString(),
                }));
                setPurchases(mockPurchases);
                setLoading(false);
            }, 500);
        }
    }, [user]);

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
                        <button className="btn btn-primary">
                            Log In
                        </button>
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

    const myPurchasesData = {
        section: {
            header: {
                title: <h1>My Purchased Models</h1>,
                subtitle: <p>View all the AI models you've purchased from the community</p>,
            },
            count: (
                <p className="text-base-content/60">
                    You have purchased {purchases.length} model{purchases.length !== 1 ? "s" : ""}
                </p>
            ),
            purchases:
                purchases.length > 0
                    ? purchases.map((purchase) => ({
                        image: <img src={purchase.image} alt={purchase.modelName} className="w-full h-48 object-cover rounded-t-xl" />,
                        name: <h3>{purchase.modelName}</h3>,
                        framework: <span className="badge badge-info gap-2">{purchase.framework}</span>,
                        useCase: <span className="badge badge-success gap-2 ml-2">{purchase.useCase}</span>,
                        description: <p className="text-base-content/70 text-sm line-clamp-3">{purchase.description}</p>,
                        metadata: (
                            <div className="space-y-1 text-sm text-base-content/60">
                                <p>Created by: {purchase.createdBy}</p>
                                <p>Purchased: {new Date(purchase.purchasedAt).toLocaleDateString()}</p>
                            </div>
                        ),
                        cta: (
                            <Link to={`/models/${purchase.modelId}`}>
                                <button className="btn btn-primary w-full">View Details</button>
                            </Link>
                        ),
                    }))
                    : [{
                        empty: (
                            <div className="col-span-3 text-center py-16">
                                <PurchaseIcon className="text-6xl mb-4 w-24 h-24" />
                                <h3 className="text-2xl font-bold text-base-content mb-2">No Purchases Yet</h3>
                                <p className="text-base-content/70 mb-6">You haven't purchased any AI models yet. Explore the catalog to find models that suit your needs.</p>
                                <Link to={ALL_MODELS}>
                                    <button className="btn btn-primary">Browse Models</button>
                                </Link>
                            </div>
                        ),
                    }],
        },
    };

    const myPurchasesStyle = {
        container: "bg-base-100 py-12 px-6 min-h-screen",
        section: {
            container: "max-w-7xl mx-auto",
            header: {
                container: "mb-8",
                title: "text-4xl font-bold text-base-content mb-2",
                subtitle: "text-lg text-base-content/70",
            },
            count: "mb-8",
            purchases: {
                container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                item: {
                    container:
                        "card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300 overflow-hidden",
                    image: "",
                    name: "text-xl font-bold text-base-content mb-3 px-6 pt-6",
                    framework: "mb-2 px-6",
                    useCase: "mb-4 px-6",
                    description: "mb-4 px-6",
                    metadata: "mb-4 pb-4 border-b border-base-300 px-6",
                    cta: "mt-auto px-6 pb-6",
                },
            },
        },
    };

    return <Layout data={myPurchasesData} style={myPurchasesStyle} />;
};
