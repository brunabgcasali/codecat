import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:3000", // porta do backend, não do MongoDB
  timeout: 5000,

});

export default api;
