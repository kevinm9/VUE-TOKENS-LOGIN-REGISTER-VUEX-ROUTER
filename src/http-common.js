import axios from "axios";

export default axios.create({
  //withCredentials: true,
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    'Content-Type': 'application/json'
  }
});

//axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user"));

