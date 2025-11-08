import { useState } from "react";
import { toast } from "react-hot-toast";
import { productRoutes } from "../routes.api";
import apiClient from "../base.api";

export const useCreateProduct = () => {
    const [loading, setLoading] = useState(false);

    const createProduct = async (data) => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                productRoutes.ADD_PRODUCT,
                data
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

export const useUploadProductImage = () => {
    const [loading, setLoading] = useState(false);

    const uploadProductImage = async (data) => {
        setLoading(true);
        try {
            const response = await apiClient.post(
                productRoutes.UPLOAD_IMAGE,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response?.data || response?.status === 201) {
                toast.success("Image uploaded successfully.");
                return response.data;
            }
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error?.message ||
                "Upload image failed";

            toast.error(message);
            console.error("Error in upload product image:", message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, uploadProductImage };
};
