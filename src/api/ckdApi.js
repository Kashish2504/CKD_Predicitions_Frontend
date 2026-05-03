import apiClient from "./client";

// GET / — health check (model name + accuracy)
export const healthCheck = async () => {
  const { data } = await apiClient.get("/");
  return data;
};

// GET /model-info — model name, accuracy, top 5 important features
export const getModelInfo = async () => {
  const { data } = await apiClient.get("/model-info");
  return data;
};

// GET /features — feature schema and valid categorical values
export const getFeatures = async () => {
  const { data } = await apiClient.get("/features");
  return data;
};

// POST /predict — main inference (24 features in)
export const predictCKD = async (payload) => {
  const { data } = await apiClient.post("/predict", payload);
  return data;
};