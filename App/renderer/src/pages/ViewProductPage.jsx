import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useMemo, useState } from "react";
import { useGetSingleProduct } from "../api/Hooks/product.api";
import { calculateProfitMargin } from "../Utils/Utils";
import ImageViewer from "react-viewer";
import {
    BarChart2,
    Barcode,
    Box,
    Building2,
    DollarSign,
    Download,
    Eye,
    Loader,
    Pencil,
    Printer,
    Trash,
    TriangleAlert,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import Stat from "../ui/Stat";
import ViewProductDetails from "../components/ProductView/ViewProductDetails";
import StocktAction from "../components/ProductView/StocktAction";

const ViewProductPage = () => {
    const productId = useParams().id;
    const [productData, setProductData] = useState(null);
    const [imageVisible, setImageVisible] = useState(false);

    const { getSingleProduct, loading } = useGetSingleProduct();

    useMemo(() => {
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
            <div className="flex flex-col gap-4 p-4 overflow-y-scroll">
                {/* top container */}
                <Card className="flex flex-col gap-2 w-full p-4">
                    {/* names,desc etc. */}
                    <div className="flex justify-between w-full">
                        {/* left */}
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl text-gray-700/90 font-semibold">
                                {productData?.name}
                            </h1>
                            <p className="text-md text-gray-500">
                                {productData?.description}
                            </p>
                        </div>
                        {/* right */}
                        <div className="flex gap-2 items-center justify-center self-start">
                            <Button variant="ghost" className="cursor-pointer">
                                <Printer size={15} className="text-gray-900" />
                            </Button>
                            <Button variant="ghost" className="cursor-pointer">
                                <Download size={15} className="text-gray-900" />
                            </Button>
                            <Button variant="ghost" className="cursor-pointer">
                                <Pencil size={15} className="text-gray-900" />
                            </Button>
                            <Button variant="danger" className="cursor-pointer">
                                <Trash size={15} className="text-white" />
                            </Button>
                        </div>
                    </div>
                    {/* simple stats */}
                    <div className="flex items-center justify-start gap-1">
                        <span className=" flex items-center gap-1 py-1 px-3 text-xs border  text-black font-semibold rounded-xl">
                            <Barcode size={15} /> {productData?.sku}
                        </span>
                        <span className="py-1 px-2 text-xs bg-gray-200 text-black font-semibold rounded-xl">
                            category
                        </span>
                        <span className="py-1 px-2 text-xs bg-green-500 text-white font-semibold rounded-xl">
                            In-Stock
                        </span>
                    </div>
                    {/* main stats */}
                    <div className="flex gap-2 items-center justify-between max-md:flex-wrap">
                        <Stat
                            icon={DollarSign}
                            subText={"Selling Price"}
                            mainText={productData?.sellingPrice}
                            color="purple"
                        />
                        <Stat
                            icon={BarChart2}
                            subText={"Profit Margin"}
                            mainText={`${calculateProfitMargin(
                                productData?.purchasedPrice,
                                productData?.sellingPrice
                            )} %`}
                            color="yellow"
                        />
                        <Stat
                            icon={Box}
                            mainText={productData?.quantity}
                            subText={"Current Stock"}
                            color="sky"
                        />
                        <Stat
                            icon={TriangleAlert}
                            subText={"Min Stock"}
                            mainText={0} // not setted yet.
                            color="rose"
                        />
                    </div>
                </Card>
                {/* image and details */}
                <div className="flex justify-center gap-2 max-md:flex-col">
                    {/* left */}
                    <div className="flex flex-col gap-2 w-[40%] max-md:w-full">
                        {/* image */}
                        <Card className="flex flex-col gap-1 w-full p-4 relative group">
                            <h3>Product Image</h3>
                            <img
                                src={`${import.meta.env.VITE_API_URL}/${
                                    productData?.imageUrl
                                }`}
                                alt="product-image"
                                className="w-full h-full rounded-xl object-contain group-hover:cursor-pointer group-hover:opacity-20 transition-opacity duration-100"
                                onClick={() => setImageVisible(true)}
                            />

                            <Eye
                                size={40}
                                className="text-primary absolute top-[50%] left-[50%] invisible group-hover:visible cursor-pointer"
                                onClick={() => setImageVisible(true)}
                            />
                            <ImageViewer
                                visible={imageVisible}
                                onClose={() => setImageVisible(false)}
                                images={[
                                    {
                                        src: `${import.meta.env.VITE_API_URL}/${
                                            productData?.imageUrl
                                        }`,
                                        alt: "product-image",
                                    },
                                ]}
                                zoomable
                                rotatable
                                scalable
                                drag
                            />
                        </Card>
                        {/* stock action */}
                        <StocktAction productData={productData} />
                    </div>
                    {/* right */}
                    <div className="flex flex-col gap-2 w-full">
                        {/* details */}
                        <ViewProductDetails productData={productData} />
                        {/* supplier info */}
                        <Card className="flex flex-col gap-2 w-full p-4 ">
                            <div className="flex gap-2">
                                <span>
                                    <Building2 />
                                </span>{" "}
                                Supplier Information
                            </div>
                            <div className="flex gap-2">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-400">
                                            Name
                                        </p>
                                        <h3 className="font-semibold text-gray-600">
                                            Faiz Ullah Khan
                                        </h3>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-400">
                                            Contact
                                        </p>
                                        <h3 className="font-semibold text-gray-600">
                                            +92 332 8753452
                                        </h3>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-400">
                                            Email
                                        </p>
                                        <h3 className="font-semibold text-gray-600">
                                            faizullahofficial0@gmail.com
                                        </h3>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-400">
                                            Address
                                        </p>
                                        <h3 className="font-semibold text-gray-600">
                                            Fazal Shah Mitha Khel Bannu, KPK
                                            Pakistan
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductPage;
