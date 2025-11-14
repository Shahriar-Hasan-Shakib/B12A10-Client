import { privateAxios, publicAxios } from "@src/config/axios";
import type { CreateModelInput, UpdateModelInput } from "@src/types";

export const models = {
    find: ({name='', framework='all', sort=''} ) => {
        const params = new URLSearchParams();
        if (name) params.append("search", name);
        if (framework) params.append("framework", framework);
        if (sort) params.append("sort", sort);
        return publicAxios.get(`/models?${params.toString()}`);
    },

    findOne: (query: string) => publicAxios.get(`/models?${query}`),

    findById: (id: string) => publicAxios.get(`/models/${id}`),

    insertOne: (modelData: CreateModelInput) =>
        privateAxios.post("/models", modelData),

    updateOne: (id: string, modelData: UpdateModelInput) =>
        privateAxios.put(`/models/${id}`, modelData),

    deleteOne: (id: string) => privateAxios.delete(`/models/${id}`),

};
