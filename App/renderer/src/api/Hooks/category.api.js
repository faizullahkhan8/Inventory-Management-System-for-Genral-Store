import { useState } from "react";
import apiClient from "../base.api";
import { categoryRoutes } from "../routes.api";
import toast from "react-hot-toast";

export const useGetAllCategories = () => {
    const [loading, setLoading] = useState(false);

    const getAllCategories = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                categoryRoutes.GET_ALL_CATEGORY
            );

            if (response?.data || response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "fetching category failed!";

            toast.error(message);
            console.error("Error in fetching category:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getAllCategories };
};
