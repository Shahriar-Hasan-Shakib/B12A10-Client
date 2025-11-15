// #API: Model service layer - handles all model-related API calls
// #CRUD: Implements all CRUD operations for AI models
// #PURCHASE: Handles model purchase functionality
import { privateAxios, publicAxios } from "@src/config/axios";
import { ADD_MODEL, ALL_MODELS, DELETE_MODEL, MODEL_DETAILS, MY_MODELS, MY_PURCHASES, PURCHASE_MODEL, UPDATE_MODEL } from "@src/constants";
import type { CreateModelInput, UpdateModelInput } from "@src/types";
import toast from "react-hot-toast";

export const models = {
    // #READ: Fetch all models with optional filtering (search, framework)
    getAll: (params = {}) =>
        publicAxios.get(`${ALL_MODELS}`, { params }).
            then((res) => res.data)
            .catch((error) => {
                console.error("Error loading models:", error);
                return null;
            }),

    // #READ: Fetch models created by authenticated user
    myModels: () =>
        privateAxios.get(MY_MODELS).then((res) => res.data)
            .catch((error) => {
                console.error("Error loading my models:", error);
                return null;
            }),

    // #READ: Fetch single model details by ID
    getDetails: ({ params }: { params: Record<string, string | undefined> }) =>
        privateAxios.get(MODEL_DETAILS(params.id!)).then((res) => res.data)
            .catch((error) => {
                console.error("Error loading model details:", error);
                return null;
            }),

    // #READ: Fetch all models purchased by authenticated user
    getPurchasedModels: () =>
        privateAxios.get(MY_PURCHASES).then((res) => res.data)
            .catch((error) => {
                console.error("Error loading purchased models:", error);
                return null;
            }),

    // #CREATE: Add new model to inventory
    insertOne: (modelData: CreateModelInput) =>
        privateAxios.post(ADD_MODEL, modelData),

    // #UPDATE: Edit existing model (creator only)
    edit: (id: string, modelData: UpdateModelInput) =>
        privateAxios.put(UPDATE_MODEL(id), modelData),

    // #DELETE: Remove model from inventory (creator only)
    delete: (id: string) =>
        privateAxios.delete(DELETE_MODEL(id))
            .then(() => toast.success("Model deleted successfully!"))
            .catch((error) => {
                console.error("Delete error:", error);
                const errorMsg = error.response?.data?.message || "Failed to delete model";
                toast.error(errorMsg);
            }),

    // #PURCHASE: Purchase a model and increment counter
    buyModel: (id: string) =>
        privateAxios.post(PURCHASE_MODEL(id))
            .then((res) => {
                toast.success("Model purchased successfully!");
                return res.data.data;
            })
            .catch((error) => {
                console.error("Purchase error:", error);
                const errorMsg = error.response?.data?.message || "Failed to purchase model";
                toast.error(errorMsg);
            })

};
