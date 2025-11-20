import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useGetSingleProduct } from "../api/Hooks/product.api";
import { Loader } from "lucide-react";

const ViewProductPage = () => {
    const productId = useParams().id;
    const [productData, setProductData] = useState(null);

    const { getSingleProduct, loading } = useGetSingleProduct();

    useEffect(() => {
        (async () => {
            const response = await getSingleProduct(productId);

            if (response.success) {
                setProductData(response.product);
            }
        })();
    }, [productId]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={20} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"View Product"} />
            <div className="flex gap-10 p-4">
                {/* left */}
                <div className="w-[80%] h-full">
                    <div className="w-full h-full rounded-lg border border-gray-300 bg-gray-100">
                        <img
                            src={productData?.imageUrl}
                            className="w-full h-auto max-h-100 object-contain rounded-lg"
                        />
                    </div>
                </div>
                {/* right */}
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-4xl">{productData?.name}</h1>
                    <p className="text-lg text-gray-500">
                        {productData?.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewProductPage;
