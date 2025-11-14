import { useEffect, useState } from "react";
import { useSearchParams, useLoaderData, useNavigation } from "react-router";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import { ModelCard } from "@src/components/features/ModelCard";
import type { AIModel } from "@src/types/model.types";

interface LoaderData {
    data: AIModel[];
    count: number;
}

export const ModelsList = () => {
    const loaderData = useLoaderData() as LoaderData;
    const navigation = useNavigation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [models, setModels] = useState<AIModel[]>(loaderData?.data || []);
    const [frameworks, setFrameworks] = useState<string[]>([]);

    const searchTerm = searchParams.get("search") || "";
    const selectedFramework = searchParams.get("framework") || "";
    const loading = navigation.state === "loading";

    // Update models when loader data changes
    useEffect(() => {
        if (loaderData?.data) {
            setModels(loaderData.data);
            // Extract unique frameworks
            const uniqueFrameworks = [...new Set(loaderData.data.map((m: AIModel) => m.framework))] as string[];
            setFrameworks(uniqueFrameworks);
        }
    }, [loaderData]);

    const handleSearchChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set("search", value);
        } else {
            newParams.delete("search");
        }
        setSearchParams(newParams);
    };

    const handleFrameworkChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            newParams.set("framework", value);
        } else {
            newParams.delete("framework");
        }
        setSearchParams(newParams);
    };

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
                    <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                </div>

                {/* Filter Bar */}
                <div className="mb-4">
                    <FilterBar
                        selectedFramework={selectedFramework}
                        onFrameworkChange={handleFrameworkChange}
                        frameworks={frameworks}
                    />
                </div>

                {/* Results Count */}
                <p className="text-base-content/60 mb-8">
                    Showing {models.length} model{models.length !== 1 ? "s" : ""}
                    {(searchTerm || selectedFramework) && " matching your criteria"}
                </p>

                {/* Models Grid */}
                {models.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {models.map((model: AIModel) => (
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
                                setSearchParams(new URLSearchParams());
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
