import axios from "axios";
import { message } from 'antd'
import type {
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosInstance,
    AxiosError,
} from "axios";
import { getToken } from "./token";

const REQUEST_TIMEOUT = 1000 * 15;

const axiosInstance: AxiosInstance = axios.create({
    timeout: REQUEST_TIMEOUT,
});

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
    const controller = new AbortController();
    res.signal = controller.signal;
    const token = getToken();
    if (token) {
        res.headers.Authorization = `Bearer ${token}`
    }
    if (process.env.NODE_ENV === 'development') {
        res.url = `/api${res.url}`
    }
    return res;
});

axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
        if (typeof res.data === 'string') {
            return res.data
        }
        const errMessage = (res.status === 200 ? res.data?.message : (res.data?.msg ?? res.statusText)) || '网络错误'
        if (res.status === 200 && res.data?.code === 200) {
            return res.data.data;
        }
        message.error(errMessage)
        return Promise.reject(errMessage);
    },
    (error: AxiosError) => {
        message.error(`${error}`)
        return Promise.reject(error);
    }
);

export default axiosInstance;
