// App routing configuration
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Layout } from '@src/components/layout/Layout';
import { PrivateRoute } from "@src/components/features/PrivateRoute";
import { HOME, ALL_MODELS, MODEL_DETAILS, ADD_MODEL, UPDATE_MODEL, MY_MODELS, MY_PURCHASES, AUTH, } from "@src/constants/routes";

// Pages
import { Root } from "@src/components/layout";
import { Home, AddModel, AllModels, ModelDetails, UpdateModel, MyModels, MyPurchases, ErrorPage, Auth, } from "@src/pages";
import { privateAxios, publicAxios } from "@src/config/axios";

const router = createBrowserRouter([
    {
        path: HOME,
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: () =>
                    publicAxios.get('/models/featured').then((res) => res.data)
                        .catch((error) => {
                            console.error("Error loading featured models:", error);
                            return null;
                        }),
            },
            {
                path: AUTH,
                element: <Auth />,
            },
            {
                path: ALL_MODELS,
                element: <AllModels />,
                loader: ({ request }) =>
                    publicAxios.get('/models?' + new URL(request.url).searchParams.toString()).then((res) => res.data)
                        .catch((error) => {
                            console.error("Error loading models:", error);
                            return null;
                        }),
            },
            {
                path: MODEL_DETAILS,
                element: <PrivateRoute> <ModelDetails /> </PrivateRoute>,
                loader: async ({ params }) =>
                    privateAxios.get('/models/' + params.id).then((res) => res.data.data)
                        .catch((error) => {
                            console.error("Error loading models:", error);
                            return null;
                        }),
            },
            {
                path: ADD_MODEL,
                element: <PrivateRoute> <AddModel /> </PrivateRoute>,
            },
            {
                path: UPDATE_MODEL,
                element: <PrivateRoute> <UpdateModel /> </PrivateRoute>,
            },
            {
                path: MY_MODELS,
                element: <PrivateRoute> <MyModels /> </PrivateRoute>
            },
            {
                path: MY_PURCHASES,
                element: <PrivateRoute> <MyPurchases /> </PrivateRoute>,
            },
            {

            }
        ],
    },
]);

// Router component
export default function AppRouter() {
    return <RouterProvider router={router} />;
}
