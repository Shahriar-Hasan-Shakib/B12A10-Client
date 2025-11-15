// #PURCHASE: Display all models purchased by the authenticated user
// #PRIVATE_ROUTE: Requires user authentication to view purchases
// #READ: Fetches purchase history from MongoDB via API
// #AUTH: Checks user authentication status before rendering
import { Link } from "react-router";
import { Button, buttonPresets } from "@src/components/ui";
import { CardGrid } from "@src/components/features/models";
import { useAuth } from "@src/hooks";
import { AUTH } from "@src/constants/";

export const MyPurchases = () => {
    const { user } = useAuth();

    // #AUTH: Show login prompt if user is not authenticated
    if (!user) {
        return (
            <section className="bg-base-200 py-20 px-6 min-h-screen">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-base-content mb-4">
                        Please Log In
                    </h1>
                    <p className="text-lg text-base-content/70 mb-8">
                        You need to be logged in to view your purchases.
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
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">
                        My Purchased Models
                    </h1>
                    <p className="text-lg text-base-content/70">
                        View all the AI models you've purchased from the community
                    </p>
                </div>

                {/* #PURCHASE: Display purchased models grid filtered by user email */}
                <CardGrid
                    type="purchased"
                    emptyMessage="You haven't purchased any AI models yet. Explore the catalog to find models that suit your needs."
                />
            </div>
        </section>
    );
};
