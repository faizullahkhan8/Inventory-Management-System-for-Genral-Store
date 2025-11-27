import { useState } from "react";
import { toast } from "react-hot-toast";
import { productRoutes } from "../routes.api";
import apiClient from "../base.api";

export const useCreateProduct = () => {
    const [loading, setLoading] = useState(false);

    const createProduct = async (data, productName) => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                productRoutes.ADD_PRODUCT,
                data,
                {
                    headers: {
                        "x-product-name": productName,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response?.data || response?.status === 201) {
                toast.success("Product created successfully.");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Add product failed";

            toast.error(message);
            console.error("Error in add product:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createProduct };
};

export const useGetAllProductsForTable = () => {
    const [loading, setLoading] = useState(false);

    const getAllProductsForTable = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                productRoutes.GET_ALL_FOR_TABLE
            );

            if (response?.data || response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "fetching product failed!";

            toast.error(message);
            console.error("Error in fetching product:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getAllProductsForTable };
};

export const useGetSingleProduct = () => {
    const [loading, setLoading] = useState(false);

    const getSingleProduct = async (productId) => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                `${productRoutes.GET_SINGLE_FOR_VIEW}/${productId}`
            );

            if (response?.data || response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "fetching product failed!";

            toast.error(message);
            console.error("Error in fetching product:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getSingleProduct };
};

export const useGetSingleProductForEdit = () => {
    const [loading, setLoading] = useState(false);

    const getSingleProductForEdit = async (productId) => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                `${productRoutes.GET_SINGLE_FOR_EDIT}/${productId}`
            );

            if (response?.data || response?.status === 200) {
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "fetching product failed!";

            toast.error(message);
            console.error("Error in fetching product:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getSingleProductForEdit };
};

export const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);

    const updateProduct = async (productData, productId) => {
        setLoading(true);
        try {
            const response = await apiClient.put(
                `${productRoutes.UPDATE_PRODUCT}/${productId}`,
                productData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response?.data || response?.status === 201) {
                toast.success("Product Updated successfully.");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "updating product failed!";

            toast.error(message);
            console.error("Error in update product:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateProduct };
};
