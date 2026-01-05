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

export const useGetAllProducts = () => {
    const [loading, setLoading] = useState(false);

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(productRoutes.GET_ALL);

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

    return { loading, getAllProducts };
};

export const useGetSingleProduct = () => {
    const [loading, setLoading] = useState(false);

    const getSingleProduct = async (productId) => {
        setLoading(true);
        try {
            const response = await apiClient.get(
                `${productRoutes.GET_SINGLE}/${productId}`
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

export const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);
    const deleteProduct = async (productId) => {
        setLoading(true);
        try {
            const response = await apiClient.delete(
                `${productRoutes.DELETE_PRODUCT}/${productId}`
            );
            if (response?.data || response?.status === 200) {
                toast.success("Product deleted successfully.");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "deleting product failed!";
            toast.error(message);
            console.error("Error in deleting product:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, deleteProduct };
};
