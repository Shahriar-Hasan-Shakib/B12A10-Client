import { privateAxios } from "@src/config/axios";

export const purchasesService = {
    getMyPurchases: () => privateAxios.get("/purchases/my-purchases"),

    getByModel: (modelId: string) =>
        privateAxios.get(`/purchases/model/${modelId}`),

    getStats: () => privateAxios.get("/purchases/stats"),
};
