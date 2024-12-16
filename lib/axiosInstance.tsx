// "use server"

import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "https://developer.iamstillalive.co/sonal/SnapAura/public/api",
  // baseURL: "http://backend-laravel.test/api",
  baseURL: process.env.NEXT_PUBLIC_LARAVEL_BACKEND_URL,
  headers: {
    Accept: "application/json",
  },
});

export default AxiosInstance;
