import api from "../api/api";

 async function register({ name, email, phone, password, address }) {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    phone,
    password,
    address,
  });
  return data;
}

 async function login({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}


export {
 register,
 login
};
