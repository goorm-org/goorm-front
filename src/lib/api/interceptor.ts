import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://5e06d0fa53e6.ngrok-free.app",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response) Promise.reject();
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) console.error(error.response);
    return Promise.reject(error);
  }
);
