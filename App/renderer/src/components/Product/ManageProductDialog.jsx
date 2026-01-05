import { useEffect, useState } from "react";
import { Card } from "../../ui/Card";
import ProductForm from "./ProductFrom";

import {
    useCreateProduct,
    useUpdateProduct,
} from "../../api/Hooks/product.api";

const INITIAL_FORM_STATE = {
    name: "",
    description: "",
    categoryId: null,
    isActive: true,
    imageUrl: "",
    customFields: [],
};

const ManageProductDialog = ({
    open,
    onClose,
    isEditing,
    setProductData,
    selectedProduct,
    setProductState,
}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [selectedImage, setSelectedImage] = useState(null);

    const { createProduct, loading: createProductLoading } = useCreateProduct();
    const { updateProduct, loading: updateProductLoading } = useUpdateProduct();

    useEffect(() => {
        if (open && !isEditing) {
            setFormData(INITIAL_FORM_STATE);
        }

        if (open && isEditing) {
            setFormData(selectedProduct);
        }
    }, [open, isEditing, selectedProduct]);

    if (!open) return null;

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const tempFromData = new FormData();
        if (isEditing) {
            tempFromData.append("data", JSON.stringify(formData));
            if (selectedImage) {
                tempFromData.append("productImage", selectedImage);
            }

            const response = await updateProduct(
                tempFromData,
                selectedProduct._id
            );
            if (response) {
                setProductData((prev) =>
                    prev.map((product) =>
                        product._id === response.product._id
                            ? response.product
                            : product
                    )
                );
                onClose();
            }
        } else {
            tempFromData.append("productImage", selectedImage);
            tempFromData.append("data", JSON.stringify(formData));
            const response = await createProduct(tempFromData);
            if (response) {
                setProductData((prev) => [...prev, response.product]);
                onClose();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <Card className="relative z-10 w-full max-w-2xl bg-white p-4 animate-in fade-in zoom-in-95 duration-200">
                <ProductForm
                    setProductData={setFormData}
                    setProductState={setProductState}
                    setSelectedImage={setSelectedImage}
                    productData={formData}
                    handler={handleAddProduct}
                    loading={createProductLoading}
                    isEditing={isEditing || updateProductLoading}
                />
            </Card>
        </div>
    );
};

export default ManageProductDialog;
