import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://43.200.191.129:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!response) Promise.reject();
    return response;
  },
  (error: AxiosError) => {
    if (error.response) console.error(error.response);
    return Promise.reject(error);
  }
);
