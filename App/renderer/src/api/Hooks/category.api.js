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

export const useAddCategory = () => {
    const [loading, setLoading] = useState(false);

    const addCategory = async (data) => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                categoryRoutes.ADD_CATEGORY,
                data
            );

            if (response?.data || response?.status === 201) {
                toast.success("Category added successfully!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Adding category failed!";

            toast.error(message);
            console.error("Error in adding category:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, addCategory };
};

export const useUpdateCategory = () => {
    const [loading, setLoading] = useState(false);

    const updateCategory = async (id, data) => {
        setLoading(true);
        try {
            const response = await apiClient.put(
                `${categoryRoutes.UPDATE_CATEGORY}/${id}`,
                data
            );

            if (response?.status === 200 || response?.data?.success) {
                toast.success("Category updated successfully!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Updating category failed!";

            toast.error(message);
            console.error("Error updating category:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { updateCategory, loading };
};

export const useDeleteCategory = () => {
    const [loading, setLoading] = useState(false);

    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            const response = await apiClient.delete(
                `${categoryRoutes.DELETE_CATEGORY}/${id}`
            );

            if (response?.status === 200 || response?.data?.success) {
                toast.success("Category deleted successfully!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Deleting category failed!";

            toast.error(message);
            console.error("Error deleting category:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategory, loading };
};
