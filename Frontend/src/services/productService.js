import api from "../api/api";

 async function getProducts(params) {
  const { data } = await api.get("/products", { params });
  return data;
}

 async function getProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

 async function getProductBySlug(slug) {
  const { data } = await api.get(`/products/slug/${slug}`);
  return data;
}

 async function createProduct(formData) {
  const { data } = await api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

 async function updateProduct(id, formData) {
  const { data } = await api.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

async function deleteProductImage(productId, public_id) {
  const { data } = await api.delete("/products/delete-image", {
    data: { productId, public_id }
  });
  return data;
}

 async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}



export {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage
};
