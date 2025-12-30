import { useState } from "react";
import apiClient from "../base.api";
import toast from "react-hot-toast";
import { billRoutes } from "../routes.api";

export const useAddBill = () => {
    const [loading, setLoading] = useState(false);

    const addBill = async (data) => {
        setLoading(true);
        try {
            const response = await apiClient.post(billRoutes.ADD_BILL, data);

            if (response?.data || response?.status === 201) {
                toast.success("Bill added successfully!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Adding bill failed!";

            toast.error(message);
            console.error("Error in adding bill:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, addBill };
};

export const useGetAllBills = () => {
    const [loading, setLoading] = useState(false);

    const getAllBills = async () => {
        setLoading(true);

        try {
            const response = await apiClient.get(billRoutes.GET_ALL_BILLS);

            if (response?.data) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Fetching bill failed!";

            toast.error(message);
            console.error("Error in fetching bill:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return {
        loading,
        getAllBills,
    };
};

export const useGetSingleBill = () => {
    const [loading, setLoading] = useState(false);

    const getSingleBill = async (billId) => {
        if (!billId) return null;

        setLoading(true);
        try {
            const response = await apiClient.get(
                `${billRoutes.GET_SINGLE_BILL}/${billId}`
            );

            if (response?.data) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch bill!";

            toast.error(message);
            console.error("Error in fetching bill:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getSingleBill };
};

export const useUpdateBill = () => {
    const [loading, setLoading] = useState(false);

    const updateBill = async (billId, data) => {
        if (!billId) return null;

        setLoading(true);
        try {
            const response = await apiClient.put(
                `${billRoutes.UPDATE_BILL}/${billId}`,
                data
            );

            if (response?.data) {
                toast.success("Bill updated successfully!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Updating bill failed!";

            toast.error(message);
            console.error("Error in updating bill:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateBill };
};

export const useDeleteBill = () => {
    const [loading, setLoading] = useState(false);

    const deleteBill = async (billId) => {
        if (!billId) return null;

        setLoading(true);
        try {
            const response = await apiClient.delete(
                `${billRoutes.DELETE_BILL}/${billId}`
            );

            if (response?.data) {
                toast.success("Bill deleted successfully!");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Deleting bill failed!";

            toast.error(message);
            console.error("Error in deleting bill:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteBill };
};
