import { DollarSign } from "lucide-react";
import React from "react";
import { calculateProfitMargin } from "../../Utils/Utils";

const Pricing = ({ productData }) => {
    return (
        <div className="flex flex-col gap-6">
            <h3 className="flex gap-2">
                <DollarSign /> Pricing Details
            </h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="p-4 bg-sky-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Cost Price</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        Rs: {productData?.purchasedPrice}
                    </h3>
                </div>
                <div className="p-4 bg-pink-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Selling Price</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        Rs: {productData?.sellingPrice}
                    </h3>
                </div>
                <div className="p-4 bg-violet-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Profit Margin</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        {calculateProfitMargin(
                            productData?.purchasedPrice,
                            productData?.sellingPrice
                        )}{" "}
                        %
                    </h3>
                </div>
            </div>
            <hr className="border-gray-300" />
            <div>
                <h3>Total Inventory Value</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="p-4 bg-green-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">At Cost Price</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        Rs:{" "}
                        {productData?.purchasedPrice * productData?.quantity}
                    </h3>
                </div>
                <div className="p-4 bg-yellow-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">At Selling Price</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        Rs: {productData?.sellingPrice * productData?.quantity}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
