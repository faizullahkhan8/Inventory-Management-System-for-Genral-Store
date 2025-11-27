import React, { useState } from "react";
import { Card } from "../../ui/Card";
import ProductDetails from "./ProductDetails";
import StockInfo from "./StockInfo";
import Pricing from "./Pricing";
import ActivityLogs from "./ActivityLogs";

const ViewProductDetails = ({ productData }) => {
    const [activeTab, setActiveTab] = useState("Details");

    const tabs = ["Details", "Stock Info", "Pricing", "Activity"];
    return (
        <div className="flex flex-col gap-2">
            <Card className="rounded-full! bg-gray-50 grid grid-cols-4 w-full">
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-center border border-transparent rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-100 ${
                            activeTab === tab && "bg-white border-gray-300!"
                        }`}
                    >
                        <p className="font-semibold">{tab}</p>
                    </div>
                ))}
            </Card>
            <Card className="p-4 max-w-full w-full">
                {activeTab === "Details" && (
                    <ProductDetails productData={productData} />
                )}
                {activeTab === "Stock Info" && (
                    <StockInfo productData={productData} />
                )}
                {activeTab === "Pricing" && (
                    <Pricing productData={productData} />
                )}
                {activeTab === "Activity" && (
                    <ActivityLogs productData={productData} />
                )}
            </Card>
        </div>
    );
};

export default ViewProductDetails;
