import { Suspense } from "react";
import { Link, useLoaderData } from "react-router";
import { Layout } from "@src/components/ui/Layout";
import { Button, Badge, buttonPresets, LoadingCards } from "@src/components/ui";
import { useAuth } from "@src/hooks";
import { AUTH, ADD_MODEL, UPDATE_MODEL, MODEL_DETAILS } from "@src/constants/";
import { PackageIcon } from "@src/assets/icons";
import type { AIModel } from "@src/types";

// Models grid component - only this part needs Suspense
function MyModelsGrid() {
    const data = useLoaderData() as { data: AIModel[] };
    const models = data.data;

    const myModelsData = {
        section: {
            header: {
                title: <h1>My AI Models</h1>,
                subtitle: (<p> Manage the AI models you've added to the inventory </p>),
                addButton: (
                    <Link to={ADD_MODEL}>
                        <Button {...buttonPresets.primary} className="gap-2"> + Add New Model </Button>
                    </Link>
                ),
            },
            count: (
                <p className="text-base-content/60">
                    You have {models.length} model{models.length !== 1 ? "s" : ""}
                </p>
            ),
            models:
                models.length > 0
                    ? models.map((model) => ({
                        image: (
                            <img
                                src={model.image}
                                alt={model.name}
                                className="w-full h-48 object-cover rounded-t-xl"
                            />
                        ),
                        name: <h3>{model.name}</h3>,
                        framework: (<Badge variant="info" size="sm"> {model.framework} </Badge>),
                        useCase: (<Badge variant="success" size="sm" className="ml-2"> {model.useCase} </Badge>),
                        description: (<p className="text-base-content/70 text-sm line-clamp-3"> {model.description} </p>),
                        stats: (<p className="text-sm text-base-content/60"> Purchased {model.purchased} times </p>),
                        actions: (
                            <div className="flex gap-2">
                                <Link to={MODEL_DETAILS(model._id)} className="flex-1">
                                    <Button {...buttonPresets.primarySmall} fullWidth> View Details </Button>
                                </Link>
                                <Link to={UPDATE_MODEL(model._id)} className="flex-1">
                                    <Button variant="accent" size="sm" fullWidth> Edit </Button>
                                </Link>
                            </div>
                        ),
                    }))
                    : [
                        {
                            empty: (
                                <div className="col-span-3 text-center py-16">
                                    <PackageIcon className="text-6xl mb-4 w-24 h-24 mx-auto" />
                                    <h3 className="text-2xl font-bold text-base-content mb-2">
                                        No Models Yet
                                    </h3>
                                    <p className="text-base-content/70 mb-6">
                                        You haven't added any AI models to the inventory.
                                    </p>
                                    <Link to={ADD_MODEL}>
                                        <Button {...buttonPresets.primary}>
                                            Add Your First Model
                                        </Button>
                                    </Link>
                                </div>
                            ),
                        },
                    ],
        },
    };

    const myModelsStyle = {
        container: "bg-base-100 py-12 px-6 min-h-screen",
        section: {
            container: "max-w-7xl mx-auto",
            header: {
                container: "flex flex-wrap justify-between items-center mb-8 gap-4",
                title: "text-4xl font-bold text-base-content",
                subtitle: "text-lg text-base-content/70",
            },
            count: "mb-8",
            models: {
                container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                item: {
                    container:
                        "card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300 overflow-hidden",
                    image: "",
                    name: "text-xl font-bold text-base-content mb-3 px-6 pt-6",
                    framework: "mb-2 px-6",
                    useCase: "mb-4 px-6",
                    description: "mb-4 px-6",
                    stats: "mb-4 px-6",
                    actions: "mt-auto px-6 pb-6",
                },
            },
        },
    };

    return <Layout data={myModelsData} style={myModelsStyle} />;
}

// Main component - no Suspense here, user auth check happens immediately
export const MyModels = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <section className="bg-base-200 py-20 px-6 min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-base-content mb-4">
                        Please Log In
                    </h1>
                    <p className="text-lg text-base-content/70 mb-8">
                        You need to be logged in to view your models.
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

    // Only the data-dependent grid is wrapped in Suspense
    return (
        <Suspense fallback={<LoadingCards />}>
            <MyModelsGrid />
        </Suspense>
    );
};
