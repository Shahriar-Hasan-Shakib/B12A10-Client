import { privateAxios, publicAxios } from "@src/config/axios";
import type { CreateModelInput, UpdateModelInput } from "@src/types";

export const models = {
    find: (url: URL) => publicAxios.get(`/models?${url.searchParams.toString()}`),

    findById: (id: string) => publicAxios.get(`/models/${id}`),

    getMyModels: () => privateAxios.get("/models/my-models"),

    insertOne: (modelData: CreateModelInput) =>
        privateAxios.post("/models", modelData),

    updateOne: (id: string, modelData: UpdateModelInput) =>
        privateAxios.put(`/models/${id}`, modelData),

    deleteOne: (id: string) => privateAxios.delete(`/models/${id}`),

    purchaseModel: (id: string) => privateAxios.post(`/models/${id}/purchase`),

};
