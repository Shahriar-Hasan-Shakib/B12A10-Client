// #CRUD: Reusable form component for Create and Update operations
// #VALIDATION: Client-side validation for all required fields
// #IMGBB: Image upload integration using ImgBB service
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FRAMEWORKS, USE_CASES, COMMON_DATASETS } from "@src/constants/models";
import { Layout } from "@src/components/ui/Layout";
import { useAuth } from "@src/hooks";
import { models } from "@src/services";
import { AUTH, ALL_MODELS } from "@src/constants/";

interface ModelFormProps {
    initialData?: {
        _id?: string;
        name: string;
        framework: string;
        useCase: string;
        dataset: string;
        description: string;
        image: string;
    };
    isEdit?: boolean;
}

export const ModelForm = ({ isEdit = false }: ModelFormProps) => {
    const { state: model } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: model?.name || "",
        framework: model?.framework || "",
        useCase: model?.useCase || "",
        dataset: model?.dataset || "",
        description: model?.description || "",
        image: model?.image || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // #VALIDATION: Ensure all required fields are filled
        if (!formData.name || !formData.framework || !formData.useCase ||
            !formData.dataset || !formData.description || !formData.image) {
            toast.error("Please fill in all fields");
            return;
        }

        // #AUTH: Verify user is authenticated before submission
        if (!user) {
            toast.error("You must be logged in to add a model");
            navigate(AUTH);
            return;
        }

        setIsSubmitting(true);

        try {
            // #CRUD: Create or Update model based on mode
            if (isEdit && model?._id) {
                await models.edit(model._id, formData);
                toast.success("Model updated successfully!");
                navigate(`/models/${model._id}`);
            } else {
                await models.insertOne(formData);
                toast.success("Model added successfully!");
                navigate(ALL_MODELS);
            }
        } catch (error: any) {
            console.error("Error saving model:", error);
            const errorMsg = error.response?.data?.message || "Failed to save model. Please try again.";
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formDataLayout = {
        form: {
            title: <h1>{isEdit ? "Update AI Model" : "Add New AI Model"}</h1>,
            subtitle: (
                <p>
                    {isEdit
                        ? "Update the details of your AI model below"
                        : "Fill in the details to add a new AI model to the inventory"}
                </p>
            ),
            fields: {
                name: (
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-base-content mb-2">
                            Model Name <span className="text-error">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., BERT, GPT-4, ResNet-50"
                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-200 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-base-content/40"
                            required
                        />
                    </div>
                ),
                framework: (
                    <div>
                        <label htmlFor="framework" className="block text-sm font-semibold text-base-content mb-2">
                            Framework <span className="text-error">*</span>
                        </label>
                        <select
                            id="framework"
                            name="framework"
                            value={formData.framework}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-200 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required
                        >
                            <option value="">Select a framework</option>
                            {FRAMEWORKS.map((fw) => (
                                <option key={fw} value={fw}>
                                    {fw}
                                </option>
                            ))}
                        </select>
                    </div>
                ),
                useCase: (
                    <div>
                        <label htmlFor="useCase" className="block text-sm font-semibold text-base-content mb-2">
                            Use Case <span className="text-error">*</span>
                        </label>
                        <select
                            id="useCase"
                            name="useCase"
                            value={formData.useCase}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-200 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required
                        >
                            <option value="">Select a use case</option>
                            {USE_CASES.map((uc) => (
                                <option key={uc} value={uc}>
                                    {uc}
                                </option>
                            ))}
                        </select>
                    </div>
                ),
                dataset: (
                    <div>
                        <label htmlFor="dataset" className="block text-sm font-semibold text-base-content mb-2">
                            Dataset <span className="text-error">*</span>
                        </label>
                        <select
                            id="dataset"
                            name="dataset"
                            value={formData.dataset}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-200 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            required
                        >
                            <option value="">Select a dataset</option>
                            {COMMON_DATASETS.map((ds) => (
                                <option key={ds} value={ds}>
                                    {ds}
                                </option>
                            ))}
                        </select>
                    </div>
                ),
                image: (
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-base-content mb-2">
                            Image URL <span className="text-error">*</span>
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://i.ibb.co/your-image.jpg"
                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-200 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-base-content/40"
                            required
                        />
                        <p className="text-sm text-base-content/60 mt-1">
                            Upload your image to ImgBB and paste the URL here
                        </p>
                    </div>
                ),
                description: (
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-base-content mb-2">
                            Description <span className="text-error">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Provide a detailed description of the AI model, its capabilities, and use cases..."
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border-2 border-base-300 bg-base-200 text-base-content focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-base-content/40"
                            required
                        />
                    </div>
                ),
            },
            actions: (
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 btn btn-primary px-8 py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                            ? isEdit
                                ? "Updating..."
                                : "Adding..."
                            : isEdit
                                ? "Update Model"
                                : "Add Model"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(ALL_MODELS)}
                        className="px-8 py-4 btn btn-outline border-2 font-bold text-lg hover:bg-base-200"
                    >
                        Cancel
                    </button>
                </div>
            ),
        },
    };

    const formStyle = {
        container: "min-h-screen bg-base-200 py-12 px-6",
        form: {
            container: "max-w-3xl mx-auto bg-base-100 p-8 md:p-12 rounded-2xl shadow-xl",
            title: "text-4xl font-bold text-center mb-3 text-base-content",
            subtitle: "text-lg text-center text-base-content/70 mb-8",
            fields: {
                container: "space-y-6 mb-8",
            },
            actions: "pt-6 border-t border-base-300",
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <Layout data={formDataLayout} style={formStyle} />
        </form>
    );
};
