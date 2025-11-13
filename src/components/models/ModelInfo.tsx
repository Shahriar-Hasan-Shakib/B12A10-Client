import { Layout } from "@src/components/ui/Layout";

interface ModelInfoProps {
    model: {
        name: string;
        framework: string;
        useCase: string;
        dataset: string;
        description: string;
        image: string;
        purchased: number;
        createdBy: string;
        createdAt: string;
    };
}

export const ModelInfo = ({ model }: ModelInfoProps) => {
    const modelData = {
        div: {
            image: (
                <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
            ),
            content: {
                header: {
                    title: <h1>{model.name}</h1>,
                    badges: (
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                                {model.framework}
                            </span>
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                                {model.useCase}
                            </span>
                            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-semibold">
                                Purchased {model.purchased} times
                            </span>
                        </div>
                    ),
                },
                details: {
                    description: {
                        label: <h3>Description</h3>,
                        text: <p>{model.description}</p>,
                    },
                    dataset: {
                        label: <h3>Training Dataset</h3>,
                        text: <p>{model.dataset}</p>,
                    },
                    meta: {
                        created: (
                            <p>
                                <strong>Created By:</strong> {model.createdBy}
                            </p>
                        ),
                        date: (
                            <p>
                                <strong>Date Added:</strong>{" "}
                                {new Date(model.createdAt).toLocaleDateString()}
                            </p>
                        ),
                    },
                },
            },
        },
    };

    const modelStyle = {
        container: "bg-white",
        div: {
            container: "max-w-5xl mx-auto",
            image: "mb-8",
            content: {
                container: "space-y-8",
                header: {
                    container: "space-y-4 pb-6 border-b-2 border-gray-200",
                    title: "text-4xl md:text-5xl font-bold text-gray-900",
                    badges: "",
                },
                details: {
                    container: "space-y-6",
                    item: {
                        container: "bg-gray-50 p-6 rounded-xl",
                        label: "text-xl font-bold text-gray-900 mb-3",
                        text: "text-gray-700 leading-relaxed",
                    },
                    meta: {
                        container: "flex flex-wrap gap-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl",
                        item: "text-gray-700",
                    },
                },
            },
        },
    };

    return <Layout tag="div" data={modelData} style={modelStyle} />;
};
