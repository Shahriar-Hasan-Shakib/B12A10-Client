import { useEffect, useState } from "react";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import { mockAIModels } from "@src/data/mockModels";
import { ModelCard } from "@src/components/features/ModelCard";
import type { AIModel } from "@src/types/model.types";

export const ModelsList = () => {
    const [models, setModels] = useState<AIModel[]>([]);
    const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFramework, setSelectedFramework] = useState("");
    const [frameworks, setFrameworks] = useState<string[]>([]);

    useEffect(() => {
        // Try to fetch from backend, fallback to mock data
        const apiUrl = import.meta.env.VITE_API_URL;

        if (apiUrl) {
            fetch(`${apiUrl}/models`)
                .then((res) => res.json())
                .then((data) => {
                    setModels(data);
                    setFilteredModels(data);
                    const uniqueFrameworks = [...new Set(data.map((m: AIModel) => m.framework))] as string[];
                    setFrameworks(uniqueFrameworks);
                    setLoading(false);
                })
                .catch(() => {
                    // Fallback to mock data
                    setModels(mockAIModels);
                    setFilteredModels(mockAIModels);
                    const uniqueFrameworks = [...new Set(mockAIModels.map((m) => m.framework))] as string[];
                    setFrameworks(uniqueFrameworks);
                    setLoading(false);
                });
        } else {
            // Use mock data if no API URL
            setTimeout(() => {
                setModels(mockAIModels);
                setFilteredModels(mockAIModels);
                const uniqueFrameworks = [...new Set(mockAIModels.map((m) => m.framework))] as string[];
                setFrameworks(uniqueFrameworks);
                setLoading(false);
            }, 500);
        }
    }, []);

    // Filter and search logic
    useEffect(() => {
        let result = models;

        // Filter by framework
        if (selectedFramework) {
            result = result.filter((m) => m.framework === selectedFramework);
        }

        // Search by name
        if (searchTerm) {
            result = result.filter((m) =>
                m.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredModels(result);
    }, [searchTerm, selectedFramework, models]);

    if (loading) {
        return (
            <section className="bg-base-100 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-base-300 rounded w-64 mb-6"></div>
                        <div className="h-12 bg-base-200 rounded mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
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
                <h1 className="text-4xl font-bold mb-8 text-base-content">
                    All AI Models
                </h1>

                {/* Search Bar */}
                <div className="mb-4">
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </div>

                {/* Filter Bar */}
                <div className="mb-4">
                    <FilterBar
                        selectedFramework={selectedFramework}
                        onFrameworkChange={setSelectedFramework}
                        frameworks={frameworks}
                    />
                </div>

                {/* Results Count */}
                <p className="text-base-content/60 mb-8">
                    Showing {filteredModels.length} of {models.length} models
                </p>

                {/* Models Grid */}
                {filteredModels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredModels.map((model) => (
                            <ModelCard key={model._id} model={model} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-base-content/60 text-lg mb-4">
                            No models found matching your criteria
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedFramework("");
                            }}
                            className="btn btn-primary"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
