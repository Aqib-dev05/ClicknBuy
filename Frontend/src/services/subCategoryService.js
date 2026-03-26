import api from "../api/api";

async function getSubCategories() {
  const { data } = await api.get("/subcategories");
  return data;
}

async function getSubCategoryByCategory(catId) {
  const { data } = await api.get(`/subcategories/category/${catId}`);
  return data;
}


async function createSubCategory(payload) {
  const { data } = await api.post("/subcategories", payload);
  return data;
}

async function updateSubCategory(id, payload) {
  const { data } = await api.put(`/subcategories/${id}`, payload);
  return data;
}

async function deleteSubCategory(id) {
  const { data } = await api.delete(`/subcategories/${id}`);
  return data;
}

export {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryByCategory,
};
