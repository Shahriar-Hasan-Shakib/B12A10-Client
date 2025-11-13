import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "@src/hooks";
import { mockAIModels } from "@src/data/mockModels";
import { AUTH, ALL_MODELS } from "@src/constants/";
import { Button } from "@src/components/ui";
import { ArrowLeft, PurchaseIcon, UserIcon, CalendarIcon } from "@src/assets/icons";
import type { AIModel } from "@src/types/model.types";

export const ModelDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [model, setModel] = useState<AIModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        if (!id) return;

        // Try to fetch from backend, fallback to mock data
        const apiUrl = import.meta.env.VITE_API_URL;

        if (apiUrl) {
            fetch(`${apiUrl}/models/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setModel(data);
                    setLoading(false);
                })
                .catch(() => {
                    // Fallback to mock data
                    const mockModel = mockAIModels.find((m) => m._id === id);
                    setModel(mockModel || null);
                    setLoading(false);
                });
        } else {
            // Use mock data
            setTimeout(() => {
                const mockModel = mockAIModels.find((m) => m._id === id);
                setModel(mockModel || null);
                setLoading(false);
            }, 500);
        }
    }, [id]);

    const handlePurchase = async () => {
        if (!user) {
            alert("Please log in to purchase models");
            navigate(AUTH);
            return;
        }

        if (!model) return;

        setPurchasing(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (apiUrl) {
                const response = await fetch(`${apiUrl}/models/${id}/purchase`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        purchasedBy: user.email,
                    }),
                });

                if (response.ok) {
                    const updatedModel = await response.json();
                    setModel(updatedModel);
                    alert("Model purchased successfully!");
                } else {
                    alert("Failed to purchase model");
                }
            } else {
                // Simulate purchase with mock data
                setModel({ ...model, purchased: model.purchased + 1 });
                alert("Model purchased successfully! (Mock data)");
            }
        } catch (error) {
            console.error("Purchase error:", error);
            alert("An error occurred while purchasing");
        } finally {
            setPurchasing(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this model?")) {
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (apiUrl) {
                const response = await fetch(`${apiUrl}/models/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Model deleted successfully!");
                    navigate(ALL_MODELS);
                } else {
                    alert("Failed to delete model");
                }
            } else {
                alert("Model deleted successfully! (Mock data)");
                navigate(ALL_MODELS);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting");
        }
    };

    if (loading) {
        return (
            <section className="bg-base-200 py-12 px-6 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-96 bg-base-300 rounded-2xl mb-8"></div>
                        <div className="h-8 bg-base-300 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-base-300/70 rounded w-3/4 mb-8"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (!model) {
        return (
            <section className="bg-base-200 py-20 px-6 min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-base-content mb-4">
                        Model Not Found
                    </h1>
                    <p className="text-lg text-base-content/70 mb-8">
                        The AI model you're looking for doesn't exist or has been removed.
                    </p>
                    <Link to={ALL_MODELS}>
                        <Button variant="primary" size="lg">
                            Browse All Models
                        </Button>
                    </Link>
                </div>
            </section>
        );
    }

    const isOwner = user?.email === model.createdBy;

    return (
        <section className="bg-base-200 py-12 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link to={ALL_MODELS}>
                    <button className="btn btn-ghost gap-2 mb-6 text-primary hover:text-primary-focus">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Models
                    </button>
                </Link>

                <div className="space-y-8">
                    {/* Image Section */}
                    <div className="relative">
                        <figure className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={model.image}
                                alt={model.name}
                                className="w-full h-96 object-cover"
                            />
                        </figure>
                        <div className="absolute bottom-6 right-6 bg-base-100/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-base-300">
                            <p className="text-lg font-bold text-base-content flex items-center gap-2">
                                <PurchaseIcon className="w-5 h-5 text-primary" />
                                {model.purchased} purchases
                            </p>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-8 md:p-12 space-y-8">
                            {/* Header */}
                            <div className="space-y-4 pb-6 border-b border-base-300">
                                <h1 className="text-4xl md:text-5xl font-bold text-base-content">
                                    {model.name}
                                </h1>
                                <div className="flex flex-wrap gap-3">
                                    <div className="badge badge-primary badge-lg gap-2 px-4 py-3">
                                        <PurchaseIcon className="w-4 h-4" />
                                        {model.framework}
                                    </div>
                                    <div className="badge badge-secondary badge-lg gap-2 px-4 py-3">
                                        <PurchaseIcon className="w-4 h-4" />
                                        {model.useCase}
                                    </div>
                                    <div className="badge badge-accent badge-lg gap-2 px-4 py-3">
                                        <CalendarIcon className="w-4 h-4" />
                                        {model.dataset}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <h2 className="text-2xl font-bold text-base-content">About This Model</h2>
                                <p className="text-lg text-base-content/70 leading-relaxed">
                                    {model.description}
                                </p>
                            </div>

                            {/* Metadata */}
                            <div className="space-y-3 pt-6 border-t border-base-300">
                                <div className="flex items-center gap-2 text-base-content/70">
                                    <UserIcon className="w-5 h-5" />
                                    <p>
                                        <strong className="text-base-content">Created by:</strong> {model.createdBy}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-base-content/70">
                                    <CalendarIcon className="w-5 h-5" />
                                    <p>
                                        <strong className="text-base-content">Added on:</strong>{" "}
                                        {new Date(model.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-6 border-t border-base-300">
                                <div className="flex flex-wrap gap-4">
                                    {!isOwner && (
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={handlePurchase}
                                            isLoading={purchasing}
                                            className="flex-1 min-w-[200px]"
                                        >
                                            {purchasing ? "Purchasing..." : "Purchase Model"}
                                        </Button>
                                    )}
                                    {isOwner && (
                                        <>
                                            <Link to={`/update-model/${id}`} className="flex-1 min-w-[200px]">
                                                <Button variant="primary" size="lg" fullWidth>
                                                    Edit Model
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="lg"
                                                onClick={handleDelete}
                                                className="flex-1 min-w-[200px]"
                                            >
                                                Delete Model
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
