// #READ: Display detailed information about a single AI model
// #PURCHASE: Users can purchase models with real-time counter update
// #UPDATE: Model creators can edit their models
// #DELETE: Model creators can delete their models
// #PRIVATE_ROUTE: Requires authentication to access
import { useState } from "react";
import { useParams, useNavigate, Link, useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "@src/hooks";
import { models } from "@src/services";
import { AUTH, ALL_MODELS, UPDATE_MODEL } from "@src/constants/";
import { Button } from "@src/components/ui";
import { ArrowLeft, PurchaseIcon, UserIcon, CalendarIcon } from "@src/assets/icons";
import type { AIModel } from "@src/types/model.types";
import { confirmDelete } from "@src/components/ui/swal";

interface LoaderData {
    data: AIModel;
}

export const ModelDetails = () => {
    const { id } = useParams<{ id: string }>(); // #ROUTING: Extract model ID from URL parameters
    const navigate = useNavigate();
    const { user } = useAuth(); // #AUTH: Get current user to check permissions
    const loaderData = useLoaderData() as LoaderData | null; // #READ: Get pre-loaded model data from router loader
    const [model, setModel] = useState<AIModel | null>(loaderData?.data || null); // #STATE: Store model data locally for updates
    const [purchasing, setPurchasing] = useState(false); // #STATE: Track purchase operation state

    // #PURCHASE: Handle model purchase with authentication check
    const handlePurchase = async () => {

        if (!user) { // #AUTH: Redirect to login if not authenticated
            toast.error("Please log in to purchase models");
            navigate(AUTH);
            return;
        }

        if (!model || !id) return;

        setPurchasing(true);
        try {
            const response = await models.buyModel(id);
            setModel(response);

        } finally {
            setPurchasing(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        if (await confirmDelete()) {
            await models.delete(id);
            navigate(-1);
        }
    };

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
            <div className="max-w-4xl mx-auto">
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
                                            <Link to={UPDATE_MODEL(model._id)} state={model} className="flex-1 min-w-[200px]">
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
