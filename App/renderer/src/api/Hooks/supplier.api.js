import { useState } from "react";
import apiClient from "../base.api";
import { supplierRoutes } from "../routes.api";
import toast from "react-hot-toast";

export const useGetAllSuppliers = () => {
    const [loading, setLoading] = useState(false);
    const getAllSuppliers = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                supplierRoutes.GET_ALL_SUPPLIERS
            );
            if (response?.data || response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Fetching all suppliers failed!";
            toast.error(message);
            console.error("Error in fetching suppliers : ", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getAllSuppliers };
};

export const useCreateSupplier = () => {
    const [loading, setLoading] = useState(false);
    const createSupplier = async (supplierData) => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                supplierRoutes.CREATE_SUPPLIER,
                supplierData
            );
            if (response?.data || response?.status === 201) {
                toast.success("Supplier created successfully.");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "creating supplier failed!";
            toast.error(message);
            console.error("Error in creating supplier : ", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createSupplier };
};

export const useDeleteSupplier = () => {
    const [loading, setLoading] = useState(false);
    const deleteSupplier = async (supplierId) => {
        setLoading(true);
        try {
            const response = await apiClient.delete(
                `${supplierRoutes.DELETE_SUPPLIER}/${supplierId}`
            );

            console.log(response);
            if (response?.data || response?.status === 200) {
                toast.success("Supplier deleted successfully.");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "deleting supplier failed!";
            toast.error(message);
            console.error("Error in deleting supplier : ", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteSupplier };
};

export const useGetSupplier = () => {
    const [loading, setLoading] = useState(false);
    const getSupplier = async (supplierId) => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                `${supplierRoutes.GET_SUPPLIER}/${supplierId}`
            );

            if (response?.data || response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "fetching supplier failed!";
            toast.error(message);
            console.error("Error in fetching supplier : ", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getSupplier };
};

export const useUpdateSupplier = () => {
    const [loading, setLoading] = useState(false);
    const updateSupplier = async ({ supplierId, supplierData }) => {
        console.log(supplierData);
        setLoading(true);
        try {
            const response = await apiClient.put(
                `${supplierRoutes.UPDATE_SUPPLIER}/${supplierId}`,
                supplierData
            );

            if (response?.data || response?.status === 200) {
                toast.success("Supplier updated successfully.");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "updating supplier failed!";
            toast.error(message);
            console.error("Error in updating supplier : ", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateSupplier };
};
