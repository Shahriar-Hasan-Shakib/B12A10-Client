import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { Layout } from "@src/components/ui/Layout";
import { Button, Badge, buttonPresets } from "@src/components/ui";
import { useAuth } from "@src/hooks";
import { modelsService } from "@src/services";
import { AUTH, ADD_MODEL } from "@src/constants/";
import { PackageIcon } from "@src/assets/icons";

interface AIModel {
    _id: string;
    name: string;
    framework: string;
    useCase: string;
    description: string;
    image: string;
    createdBy: string;
    purchased: number;
}

export const MyModels = () => {
    const { user } = useAuth();
    const [models, setModels] = useState<AIModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchMyModels = async () => {
            try {
                const response = await modelsService.getMyModels();
                setModels(response.data.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching my models:", error);
                toast.error("Failed to load your models");
                setLoading(false);
            }
        };

        fetchMyModels();
    }, [user]);

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
                                <Link to={`/models/${model._id}`} className="flex-1">
                                    <Button {...buttonPresets.primarySmall} fullWidth> View Details </Button>
                                </Link>
                                <Link to={`/update-model/${model._id}`} className="flex-1">
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
};
