import { privateAxios, publicAxios } from "@src/config/axios";
import { ADD_MODEL, ALL_MODELS, DELETE_MODEL, MY_MODELS, UPDATE_MODEL } from "@src/constants";
import type { CreateModelInput, UpdateModelInput } from "@src/types";
import toast from "react-hot-toast";

export const models = {
    getAll: ({ request }: { request: Request }) =>
        publicAxios.get(`${ALL_MODELS}?` + new URL(request.url).searchParams.toString()).then((res) => res.data)
            .catch((error) => {
                console.error("Error loading models:", error);
                return null;
            }),

    getMine: () =>
        privateAxios.get(MY_MODELS).then((res) => res.data)
            .catch((error) => {
                console.error("Error loading my models:", error);
                return null;
            }),

    insertOne: (modelData: CreateModelInput) =>
        privateAxios.post(ADD_MODEL, modelData),

    edit: (id: string, modelData: UpdateModelInput) =>
        privateAxios.put(UPDATE_MODEL(id), modelData),

    delete: (id: string) =>{
        privateAxios.delete(DELETE_MODEL(id))
            .then(() => toast.success("Model deleted successfully!"))
            .catch((error) => {
                console.error("Delete error:", error);
                const errorMsg = error.response?.data?.message || "Failed to delete model";
                toast.error(errorMsg);
            })}
    ,

    purchaseModel: (id: string) => privateAxios.post(`/models/${id}/purchase`),

};
