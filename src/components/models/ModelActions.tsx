import { Layout } from "@src/components/ui/Layout";
import { useState } from "react";
import { EditIcon, DeleteIcon, PurchaseIcon } from "@src/assets/icons";

interface ModelActionsProps {
    isOwner: boolean;
    onDelete: () => void;
    onPurchase: () => void;
    onEdit: () => void;
}

export const ModelActions = ({
    isOwner,
    onDelete,
    onPurchase,
    onEdit,
}: ModelActionsProps) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setShowDeleteConfirm(false);
    };

    const actionsData = {
        div: {
            buttons: [
                // Show edit/delete for owner, purchase for others
                ...(isOwner
                    ? [
                        <button
                            onClick={onEdit}
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                        >
                            <EditIcon className="w-5 h-5" />
                            Edit Model
                        </button>,
                        <button
                            onClick={handleDeleteClick}
                            className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                        >
                            <DeleteIcon className="w-5 h-5" />
                            Delete Model
                        </button>,
                    ]
                    : [
                        <button
                            onClick={onPurchase}
                            className="px-12 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 flex items-center gap-3"
                        >
                            <PurchaseIcon className="w-6 h-6" />
                            Purchase Model
                        </button>,
                    ]),
            ],
            confirmModal: showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Confirm Delete
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this model? This action cannot be
                            undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ),
        },
    };

    const actionsStyle = {
        container: "bg-gray-50 py-8 px-6 border-t-2 border-gray-200",
        div: {
            container: "max-w-5xl mx-auto",
            buttons: {
                container: "flex flex-wrap gap-4 justify-center",
            },
        },
    };

    return <Layout tag="div" data={actionsData} style={actionsStyle} />;
};
