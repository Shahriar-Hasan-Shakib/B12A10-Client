import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ModelForm } from '@src/components/features';
import { mockAIModels } from "@src/data/mockModels";
import { ALL_MODELS } from "@src/constants/";

interface AIModel {
    _id: string;
    name: string;
    framework: string;
    useCase: string;
    dataset: string;
    description: string;
    image: string;
}

export const UpdateModel = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [model, setModel] = useState<AIModel | null>(null);
    const [loading, setLoading] = useState(true);

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
                    if (mockModel) {
                        setModel(mockModel);
                    }
                    setLoading(false);
                });
        } else {
            // Use mock data
            setTimeout(() => {
                const mockModel = mockAIModels.find((m) => m._id === id);
                if (mockModel) {
                    setModel(mockModel);
                }
                setLoading(false);
            }, 500);
        }
    }, [id]);

    if (loading) {
        return (
            <section className="bg-gray-50 py-12 px-6 min-h-screen">
                <div className="max-w-3xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-12 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!model) {
        return (
            <section className="bg-gray-50 py-20 px-6 min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Model Not Found
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The model you're trying to edit doesn't exist.
                    </p>
                    <button
                        onClick={() => navigate(ALL_MODELS)}
                        className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
                    >
                        Back to Models
                    </button>
                </div>
            </section>
        );
    }

    return (
        <div>
            <ModelForm initialData={model} isEdit={true} />
        </div>
    );
};
