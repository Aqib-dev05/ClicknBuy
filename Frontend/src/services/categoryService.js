import api from "../api/api";

async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}

async function createCategory(payload) {
  const { data } = await api.post("/categories", payload);
  return data;
}

async function updateCategory(id, payload) {
  const { data } = await api.put(`/categories/${id}`, payload);
  return data;
}

async function deleteCategory(id) {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}

export { getCategories, createCategory, updateCategory, deleteCategory };
