import { useMemo, useState } from "react";
import ProductFrom from "../components/ProductFrom";
import Header from "../components/Header";
import {
    useGetSingleProductForEdit,
    useUpdateProduct,
} from "../api/Hooks/product.api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AddProductPage = () => {
    const productId = useParams().id;
    const [selectedImage, setSelectedImage] = useState(null);
    const [productData, setProductData] = useState({
        name: "",
        sku: "",
        description: "",
        purchasedPrice: "",
        sellingPrice: "",
        quantity: "",
        mfgDate: "",
        expDate: "",
        supplierRef: "",
        category: "",
        imageUrl: "",
        customFields: [],
    });

    const { getSingleProductForEdit, loading: getProductLoading } =
        useGetSingleProductForEdit();
    const { updateProduct, loading: updateLoading } = useUpdateProduct();

    useMemo(() => {
        (async () => {
            const data = await getSingleProductForEdit(productId);

            setProductData(data?.product);
        })();
    }, [productId]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const productFormData = new FormData();
            productFormData.append("productImage", selectedImage);
            productFormData.append("data", JSON.stringify(productData));

            const productResponse = await updateProduct(
                productFormData,
                productId
            );

            if (productResponse?.success) {
                console.log("udpated successfully");
            }
        } catch (error) {
            console.error("Error in handleUpdateProduct:", error);
            toast.error("Failed to update product with image");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Edit Product"} />
            <ProductFrom
                setProductData={setProductData}
                productData={productData}
                handler={handleUpdate}
                loading={updateLoading}
                isEditing={true}
                setSelectedImage={setSelectedImage}
            />
        </div>
    );
};

export default AddProductPage;
