import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

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

async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

async function logOut() {
  const { data } = await api.get("/auth/logout");
  return data;
}

export {
  register,
  login,
  getMe,
  logOut
};
