import api from "../api/api";

 async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

 async function getUserById(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

 async function updateUser(id, payload) {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

  const { data } = await api.put(`/users/${id}`, payload, {
    headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
  });
  return data;
}

 async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}



export {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
