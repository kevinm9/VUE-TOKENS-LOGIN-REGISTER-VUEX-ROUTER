import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//instance.defaults.headers.common["Authorization"] = `Bearer ${store.getters['auth/token']}`;
//instance.defaults.headers.common["Authorization"] = `Bearer ${store.state.auth.user?.token}`;

export default instance;
