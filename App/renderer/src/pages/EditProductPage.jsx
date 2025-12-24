import { useMemo, useState } from "react";
import ProductFrom from "../components/ProductFrom";
import Header from "../components/Header";
import {
    useGetSingleProductForEdit,
    useUpdateProduct,
} from "../api/Hooks/product.api";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
    const productId = useParams().id;
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
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

        const productFormData = new FormData();
        productFormData.append("productImage", selectedImage);
        productFormData.append("data", JSON.stringify(productData));

        const productResponse = await updateProduct(productFormData, productId);

        if (productResponse?.success) {
            navigate("/inventory");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Edit Product"} />
            <ProductFrom
                setProductData={setProductData}
                productData={productData}
                handler={handleUpdate}
                loading={updateLoading || getProductLoading}
                isEditing={true}
                setSelectedImage={setSelectedImage}
            />
        </div>
    );
};

export default EditProductPage;
