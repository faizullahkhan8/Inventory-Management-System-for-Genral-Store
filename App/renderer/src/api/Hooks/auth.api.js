import { useState } from "react";
import { toast } from "react-hot-toast";
import { authRoutes } from "../routes.api";
import apiClient from "../base.api";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await apiClient.post(authRoutes.LOGIN, {
                username,
                password,
            });

            if (response.status === 200) {
                toast.success("Login successfully.");
                return response.data;
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Login failed");
            console.log("Error in login:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        try {
            const response = await apiClient.post(authRoutes.LOGOUT);

            if (response.status === 200) {
                toast.success("Logout successfully.");
                return response.data;
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Logout failed");
            console.log("Error in logout:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};
