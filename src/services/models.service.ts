import { privateAxios, publicAxios } from "@src/config/axios";
import { ALL_MODELS, MY_MODELS } from "@src/constants";
import type { CreateModelInput, UpdateModelInput } from "@src/types";

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

    findById: (id: string) => publicAxios.get(`/models/${id}`),

    getMyModels: () => privateAxios.get("/models/my-models"),

    insertOne: (modelData: CreateModelInput) =>
        privateAxios.post("/models", modelData),

    edit: (id: string, modelData: UpdateModelInput) =>
        privateAxios.put(`/models/${id}`, modelData),

    deleteOne: (id: string) => privateAxios.delete(`/models/${id}`),

    purchaseModel: (id: string) => privateAxios.post(`/models/${id}/purchase`),

};
