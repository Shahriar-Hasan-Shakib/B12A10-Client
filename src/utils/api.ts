// API utility - Axios instance and API endpoints configuration
import { privateAxios, publicAxios } from "@src/config/axios";

// API Endpoints
export const modelsAPI = {
  getAll: (search?: string, framework?: string) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (framework && framework !== 'all') params.append("framework", framework);
    return publicAxios.get(`/models?${params.toString()}`);
  },
  getById: (id: string) => publicAxios.get(`/models/${id}`),
  getFeatured: () => publicAxios.get("/models/featured"),
  getMyModels: () => privateAxios.get("/models/my-models"),
  create: (data: unknown) => privateAxios.post("/models", data),
  update: (id: string, data: unknown) => privateAxios.put(`/models/${id}`, data),
  delete: (id: string) => privateAxios.delete(`/models/${id}`),
  purchase: (id: string) => privateAxios.post(`/models/${id}/purchase`),
};

export const purchasesAPI = {
  getMyPurchases: () => privateAxios.get("/purchases/my-purchases"),
};
