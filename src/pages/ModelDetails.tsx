import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "@src/hooks";
import { mockAIModels } from "@src/data/mockModels";
import { AUTH, ALL_MODELS } from "@src/constants/";
import { Button } from "@src/components/ui";
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
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                                        </svg>
                                        {model.framework}
                                    </div>
                                    <div className="badge badge-secondary badge-lg gap-2 px-4 py-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                                        </svg>
                                        {model.useCase}
                                    </div>
                                    <div className="badge badge-accent badge-lg gap-2 px-4 py-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                        </svg>
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
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <p>
                                        <strong className="text-base-content">Created by:</strong> {model.createdBy}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-base-content/70">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
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
