import axios from "axios";

const instance = axios.create({
  baseURL: process.env.LARAVEL_BACKEND_URL as string,
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

export default instance;
