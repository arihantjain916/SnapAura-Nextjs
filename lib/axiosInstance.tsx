import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://developer.iamstillalive.co/sonal/SnapAura/public/api",
  headers: {
    Accept: "application/json",
  },
});

export default AxiosInstance;
