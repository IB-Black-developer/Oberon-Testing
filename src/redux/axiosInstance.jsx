import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleUnauthorizedError = () => {
  localStorage.removeItem("accessToken");
  const navigate = useNavigate();
  navigate("/");
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedError();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
