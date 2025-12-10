import { useState } from "react";
import { trashRoutes } from "../routes.api";
import toast from "react-hot-toast";
import apiClient from "../base.api";

export const useGetAllTrashedItems = () => {
    const [loading, setLoading] = useState(false);
    const getAllTrashedItems = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                trashRoutes.GET_ALL_TRASHED_ITEMS
            );
            if (response?.data || response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "fetching trashed items failed!";
            toast.error(message);
            console.error("Error in fetching trashed items:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { loading, getAllTrashedItems };
};

export const useRestoreOneItem = () => {
    const [loading, setLoading] = useState(false);
    const restoreOneItem = async (itemId) => {
        setLoading(true);
        try {
            const response = await apiClient.put(
                trashRoutes.RESTORE_ONE_ITEM + "/" + itemId
            );
            if (response?.data || response?.status === 200) {
                toast.success("Item restored successfully!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "restoring item failed!";
            toast.error(message);
            console.error("Error in restoring item:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { loading, restoreOneItem };
};

export const useDeleteOneItem = () => {
    const [loading, setLoading] = useState(false);
    const deleteOneItem = async (itemId) => {
        setLoading(true);
        try {
            const response = await apiClient.delete(
                `${trashRoutes.DELETE_ONE_ITEM}/${itemId}`
            );
            if (response?.data || response?.status === 200) {
                toast.success("Item permanently deleted!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "deleting item failed!";
            toast.error(message);
            console.error("Error in deleting item:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { loading, deleteOneItem };
};
