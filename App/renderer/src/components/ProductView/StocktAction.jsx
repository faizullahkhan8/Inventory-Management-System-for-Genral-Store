import React, { useState } from "react";
import { Card } from "../../ui/Card";
import { Box, Minus, Plus } from "lucide-react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import Select from "../../ui/Select";

const StocktAction = ({ productData }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [status, setStatus] = useState(""); // values -> increment | decrement

    const [adjustmentData, setAdjustmentData] = useState({
        quantity: 0,
        reason: "",
    });

    const reasons = [
        { label: "Stock Received", value: "Stock Received" },
        { label: "Purchase Return", value: "Purchase Return" },
        { label: "Stock Transfer In", value: "Stock Transfer In" },
        { label: "Opening Stock", value: "Opening Stock" },
        { label: "Manual Increase", value: "Manual Increase" },
        {
            label: "Found in Inventory (Audit)",
            value: "Found in Inventory (Audit)",
        },
        { label: "Supplier Bonus", value: "Supplier Bonus" },
        { label: "Sale", value: "Sale" },
        { label: "Damage / Broken", value: "Damage / Broken" },
        { label: "Expired", value: "Expired" },
        { label: "Stock Transfer Out", value: "Stock Transfer Out" },
        {
            label: "Missing in Inventory (Audit)",
            value: "Missing in Inventory (Audit)",
        },
        { label: "Manual Decrease", value: "Manual Decrease" },
        { label: "Returned to Supplier", value: "Returned to Supplier" },
        { label: "Sample Given", value: "Sample Given" },
    ];

    return (
        <Card className="flex flex-col gap-2 w-full p-4 ">
            <h3>Stock Actions</h3>
            <Button>
                <Box />
                <p>Adjust Stock</p>
            </Button>
            <div className="flex items-center max-md:flex-col justify-center gap-2">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        setStatus("increment");
                        setIsFormOpen(true);
                    }}
                >
                    <Plus size={20} /> <span className="text-sm">Stock</span>
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        setStatus("decrement");
                        setIsFormOpen(true);
                    }}
                >
                    <Minus size={20} /> <span className="text-sm">Stock</span>
                </Button>
            </div>
            {isFormOpen && <hr className="border-gray-300" />}
            {isFormOpen && (
                <div className="w-full flex flex-col gap-2">
                    <div className="py-2 px-4 flex items-center justify-between bg-gray-100 rounded-lg w-full">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Current</p>
                            <h3 className="text-center">
                                {productData?.quantity}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Adjust</p>
                            <h3 className="text-center">
                                {adjustmentData.quantity}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>New</p>
                            <h3 className="text-center">
                                {status === "increment"
                                    ? Number(productData?.quantity || 0) +
                                      Number(adjustmentData.quantity || 0)
                                    : Number(productData?.quantity || 0) -
                                      Number(adjustmentData.quantity || 0)}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <p>Adjustment Type</p>
                        <Button
                            className={`${
                                status === "increment"
                                    ? "bg-green-500!"
                                    : "bg-red-500"
                            } px-2! py-0! mt-2`}
                        >
                            {status}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>
                            <label htmlFor="quantity">
                                Quantity <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="quantity"
                                name="product-quantity"
                                value={adjustmentData?.quantity}
                                onChange={(e) =>
                                    setAdjustmentData({
                                        ...adjustmentData,
                                        quantity: e.target.value,
                                    })
                                }
                                autoComplete="product-quantity"
                                required
                                placeholder="Enter product quantity..."
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity">
                                Quantity <span className="text-red-500">*</span>
                            </label>
                            <Select
                                id="category"
                                name="category"
                                required
                                autoComplete="category"
                                onChange={(val) =>
                                    setAdjustmentData({
                                        ...adjustmentData,
                                        reason: val,
                                    })
                                }
                                placeholder="Select category"
                                options={reasons}
                            />
                        </div>
                        <div className="self-end">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsFormOpen(false);
                                    setAdjustmentData({
                                        quantity: 0,
                                        reason: "",
                                    });
                                }}
                            >
                                Cencel
                            </Button>
                            <Button className="ml-2">Adjust Stock</Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default StocktAction;
