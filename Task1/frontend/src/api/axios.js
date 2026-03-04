import axios from "axios";

const API = axios.create({
  baseURL: "https://codsoft2-e3ru.onrender.com/api",
});

export default API;
