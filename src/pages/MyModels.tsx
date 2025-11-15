// #READ: Display models created by the authenticated user
// #PRIVATE_ROUTE: Requires user authentication to view
// #CRUD: Provides Edit and Delete actions for user's own models
// #AUTH: Checks user authentication status before rendering
import { Link, useNavigate } from "react-router";
import { Button, buttonPresets } from "@src/components/ui";
import { CardGrid } from "@src/components/features/models";
import { useAuth } from "@src/hooks";
import { AUTH, ADD_MODEL, UPDATE_MODEL } from "@src/constants/";
import { models } from "@src/services";
import Swal from "sweetalert2";

export const MyModels = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // #UPDATE: Navigate to edit page for specific model
    const handleEdit = (id: string) => {
        navigate(UPDATE_MODEL(id));
    };

    // #DELETE: Confirm and delete model with SweetAlert confirmation
    const handleDelete = async (id: string) => {
        // #VALIDATION: Show confirmation dialog before deletion
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            // #DELETE: Call API to delete model and reload page
            await models.delete(id);
            window.location.reload();
        }
    };

    // #AUTH: Show login prompt if user is not authenticated
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
                        <Button {...buttonPresets.primary}>Log In</Button>
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-base-100 py-12 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* #UI: Page header with title and Add New Model button */}
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-base-content mb-2">
                            My AI Models
                        </h1>
                        <p className="text-lg text-base-content/70">
                            Manage the AI models you've added to the inventory
                        </p>
                    </div>
                    <Link to={ADD_MODEL}>
                        <Button {...buttonPresets.primary} className="gap-2">
                            + Add New Model
                        </Button>
                    </Link>
                </div>

                {/* #READ: Display user's models with edit/delete actions */}
                <CardGrid
                    type="myModels"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showActions={true}
                    emptyMessage="You haven't added any AI models yet."
                />
            </div>
        </section>
    );
};
