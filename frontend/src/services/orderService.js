import api from "../api/api";

 async function getAllOrders() {
  const { data } = await api.get("/orders");
  return data;
}

 async function getUserOrders(userId) {
  const { data } = await api.get(`/orders/user/${userId}`);
  return data;
}

 async function createOrder(payload) {
  const { data } = await api.post("/orders", payload);
  return data;
}

 async function updateOrderByUser(userId, payload) {
  const { data } = await api.put(`/orders/user/${userId}`, payload);
  return data;
}

 async function updateOrderByAdmin(orderId, payload) {
  const { data } = await api.put(`/orders/${orderId}`, payload);
  return data;
}

 async function deleteOrder(orderId) {
  const { data } = await api.delete(`/orders/${orderId}`);
  return data;
}



export{
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderByUser,
  updateOrderByAdmin,
  deleteOrder,
};
