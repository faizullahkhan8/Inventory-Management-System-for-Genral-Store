import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error("session expired login again.");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
