import { List } from "lucide-react";
import React from "react";

const ProductDetails = ({ productData }) => {
    return (
        <div className="flex flex-col gap-6">
            <h3 className="flex gap-2">
                <List /> Product Infomation
            </h3>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2">
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-400">Name</p>
                            <h3 className="font-semibold text-gray-600">
                                {productData?.name ? productData?.name : "---"}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400">SKU</p>
                                <h3 className="font-semibold text-gray-600">
                                    {productData?.sku
                                        ? productData?.sku
                                        : "---"}
                                </h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400">
                                    Mfg Date
                                </p>
                                <h3 className="font-semibold text-gray-600">
                                    {productData?.mfgDate
                                        ? new Date(
                                              productData?.mfgDate
                                          ).toLocaleDateString()
                                        : "---"}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400">
                                    Category
                                </p>
                                <h3 className="font-semibold text-gray-600">
                                    {productData?.category
                                        ? productData?.category
                                        : "---"}
                                </h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400">Status</p>
                                <h3 className="font-semibold text-gray-600">
                                    {productData?.isActive ? (
                                        <div className="bg-green-500 px-4 py-1 w-max rounded-xl text-sm text-white">
                                            Active
                                        </div>
                                    ) : (
                                        "in-active"
                                    )}
                                </h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400">
                                    Exp Date
                                </p>
                                <h3 className="font-semibold text-gray-600">
                                    {productData?.expDate
                                        ? new Date(
                                              productData?.expDate
                                          ).toLocaleDateString()
                                        : "---"}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-gray-200 my-4" />
                <div>
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-400">Description</p>
                        <h3 className="font-semibold">
                            {productData?.description
                                ? productData?.description
                                : "---"}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
