import api from "../api/api.js";

async function getCart() {
  const { data } = await api.get("/cart");
  return data;
}

async function addToCart(productId, quantity) {
  const { data } = await api.post("/cart", { productId, quantity: (quantity || 1) });
  return data;
}

async function updateCartItem(productId, payload) {
  const { data } = await api.put(`/cart/${productId}`, payload);
  return data;
}

async function removeFromCart(productId) {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
}

async function clearCart() {
  const { data } = await api.delete("/cart");
  return data;
}

export {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
