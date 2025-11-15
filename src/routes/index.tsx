// App routing configuration
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoute } from "@src/components/features/PrivateRoute";
import { HOME, ALL_MODELS, MODEL_DETAILS, ADD_MODEL, UPDATE_MODEL, MY_MODELS, MY_PURCHASES, AUTH, } from "@src/constants/routes";

// Pages
import { Root } from "@src/components/layout";
import { Home, AddModel, AllModels, ModelDetails, UpdateModel, MyModels, MyPurchases, ErrorPage, Auth, } from "@src/pages";
import { models } from "@src/services";

const router = createBrowserRouter([
    {
        path: HOME,
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: AUTH,
                element: <Auth />,
            },
            {
                path: ALL_MODELS,
                element: <AllModels />,
            },
            {
                path: MODEL_DETAILS(':id'),
                element: <PrivateRoute> <ModelDetails /> </PrivateRoute>,
                loader: models.getDetails,
            },
            {
                path: ADD_MODEL,
                element: <PrivateRoute> <AddModel /> </PrivateRoute>,
            },
            {
                path: UPDATE_MODEL(':id'),
                element: <PrivateRoute> <UpdateModel /> </PrivateRoute>,
            },
            {
                path: MY_MODELS,
                element: <PrivateRoute> <MyModels /> </PrivateRoute>,
            },
            {
                path: MY_PURCHASES,
                element: <PrivateRoute> <MyPurchases /> </PrivateRoute>,
            },
        ],
    },
]);

// Router component
export default function AppRouter() {
    return <RouterProvider router={router} />;
}
