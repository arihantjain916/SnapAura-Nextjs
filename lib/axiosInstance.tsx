import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://backend-laravel.test/api",
  headers: {
    Accept: "application/json",
  },
});

export default AxiosInstance;
