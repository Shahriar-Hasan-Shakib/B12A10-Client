import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useLoaderData } from "react-router";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import { ModelCard } from "@src/components/features/ModelCard";
import { LoadingCards } from "@src/components/ui";
import type { AIModel } from "@src/types/model.types";

interface LoaderData {
    data: AIModel[];
    count: number;
}

// Only the models grid needs Suspense
function ModelsGrid() {
    const loaderData = useLoaderData() as LoaderData;
    const [models, setModels] = useState<AIModel[]>(loaderData?.data || []);

    // Update models when loader data changes
    useEffect(() => {
        if (loaderData?.data) {
            setModels(loaderData.data);
        }
    }, [loaderData]);

    return (
        <>
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
                </div>
            )}
        </>
    );
}

export const ModelsList = () => {
    const loaderData = useLoaderData() as LoaderData;
    const [searchParams, setSearchParams] = useSearchParams();
    const [frameworks, setFrameworks] = useState<string[]>([]);

    const searchTerm = searchParams.get("search") || "";
    const selectedFramework = searchParams.get("framework") || "";

    // Extract unique frameworks
    useEffect(() => {
        if (loaderData?.data) {
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

    return (
        <section className="bg-base-100 py-12 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8 text-base-content">
                    All AI Models
                </h1>


                <div className="mb-4">
                    <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
                </div>


                <div className="mb-4">
                    <FilterBar
                        selectedFramework={selectedFramework}
                        onFrameworkChange={handleFrameworkChange}
                        frameworks={frameworks}
                    />
                </div>


                <p className="text-base-content/60 mb-8">
                    Showing {loaderData?.data?.length || 0} model{(loaderData?.data?.length || 0) !== 1 ? "s" : ""}
                    {(searchTerm || selectedFramework) && " matching your criteria"}
                </p>

                {/* Only the grid has loading state */}
                <Suspense fallback={<LoadingCards />}>
                    <ModelsGrid />
                </Suspense>
            </div>
        </section>
    );
};
