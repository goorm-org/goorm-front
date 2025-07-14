import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api" // vercel production 환경에서는 proxy 경로 사용
      : "http://13.125.201.196:3001", // 그 외 preview, local은 직접 호출
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
