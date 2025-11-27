import { Box, Clock, Timer } from "lucide-react";
import ProductTable from "../Tables/ProductTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../../ui/Button";

const StockInfo = ({ productData }) => {
    const AdjustmentHistoryColumnsHelper = createColumnHelper();

    const AdjustmentHistoryColumns = [
        AdjustmentHistoryColumnsHelper.accessor("date", {
            header: "Date",
            size: 120,
            cell: (info) => new Date(info.getValue()).toLocaleString(),
        }),
        AdjustmentHistoryColumnsHelper.accessor("type", {
            header: "Type",
            size: 120,
            cell: (info) => {
                return (
                    <Button
                        variant={
                            info.getValue() === "increment"
                                ? "default"
                                : "danger"
                        }
                        className={
                            info.getValue() === "increment" && "bg-green-500!"
                        }
                    >
                        {info.getValue()}
                    </Button>
                );
            },
        }),
        AdjustmentHistoryColumnsHelper.accessor("quantity", {
            header: "Quantity",
            size: 120,
            cell: (info) => info.getValue(),
        }),
        AdjustmentHistoryColumnsHelper.accessor("reason", {
            header: "Reason",
            size: 120,
            cell: (info) => info.getValue(),
        }),
        AdjustmentHistoryColumnsHelper.accessor("updatedBy", {
            header: "Updated By",
            size: 120,
            cell: (info) => info.getValue(),
        }),
    ];

    return (
        <div className="flex flex-col gap-6">
            <h3 className="flex gap-2">
                <Box /> Stock & Inventory
            </h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="p-4 bg-sky-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Current Stock</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        {productData?.quantity} items
                    </h3>
                </div>
                <div className="p-4 bg-green-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Min Stock Level</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        {productData?.minStock} items
                    </h3>
                </div>
                <div className="p-4 bg-yellow-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Max Stock Level</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        {productData?.maxStock} items
                    </h3>
                </div>
                <div className="p-4 bg-orange-500/5 rounded-xl flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Required Stock</p>
                    <h3 className="text-gray-600 font-semibold text-xl">
                        {productData?.maxStock - productData?.minStock} items
                    </h3>
                </div>
            </div>
            <hr className="border-gray-300" />
            <h3 className="flex gap-2">
                <Clock /> Stock Adjustment History
            </h3>
            <ProductTable
                columns={AdjustmentHistoryColumns}
                data={[
                    {
                        date: Date.now(),
                        type: "decrement",
                        quantity: 50,
                        reason: "Seled",
                        updatedBy: "Faiz Ullah Khan",
                    },
                    {
                        date: Date.now(),
                        type: "increment",
                        quantity: 50,
                        reason: "New Stock Received",
                        updatedBy: "Faiz Ullah Khan",
                    },
                ]}
            />
        </div>
    );
};

export default StockInfo;
