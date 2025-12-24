import { useState } from "react";
import ProductFrom from "../components/ProductFrom";
import toast from "react-hot-toast";
import { useCreateProduct } from "../api/Hooks/product.api";
import Header from "../components/Header";

const AddProductPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const { createProduct, loading } = useCreateProduct();

    const [productData, setProductData] = useState({
        name: "",
        sku: "",
        description: "",
        purchasedPrice: "",
        sellingPrice: "",
        quantity: "",
        mfgDate: "",
        expDate: "",
        supplierId: "",
        categoryId: "",
        imageUrl: "",
        customFields: [],
    });

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            toast.error("Please select a product image");
            return;
        }

        // First upload the image
        const productFormData = new FormData();
        productFormData.append("productImage", selectedImage);
        productFormData.append("data", JSON.stringify(productData));

        const productResponse = await createProduct(
            productFormData,
            productData.name
        );

        if (productResponse.success) {
            setSelectedImage(null);
            setProductData({});
        }
    };

    console.log(productData);

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Add Product"} />
            <ProductFrom
                setProductData={setProductData}
                productData={productData}
                handler={handleAddProduct}
                setSelectedImage={setSelectedImage}
                loading={loading}
            />
        </div>
    );
};

export default AddProductPage;
