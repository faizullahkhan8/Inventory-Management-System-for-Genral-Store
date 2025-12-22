import { createColumnHelper } from "@tanstack/react-table";
import Hightlighter from "../Tables/Highlighter";
import { CreditCard, Eye, Pencil, WalletCards } from "lucide-react";

// Best Practice: Receive generic callbacks (onView, onEdit) instead of specific setters
export const getSupplierPaymentAndPurchaseColumns = ({ onView, onEdit }) => {
    const columnHelper = createColumnHelper();

    return [
        columnHelper.accessor("_id", {
            header: "Payment Id",
            size: 240,
            cell: (info) => (
                <Hightlighter
                    text={`# ${info.getValue()}`}
                    query={info.table.getState().globalFilter}
                />
            ),
        }),
        columnHelper.accessor("timestamp", {
            header: "Date",
            size: 120,
            cell: (info) => {
                // Best Practice: Format date here or via a utility function
                const dateStr = new Date(info.getValue()).toLocaleDateString();
                return (
                    <Hightlighter
                        text={dateStr}
                        query={info.table.getState().globalFilter}
                    />
                );
            },
        }),
        columnHelper.accessor("actionType", {
            header: "Type",
            size: 210,
            cell: (info) => {
                const { actionType, paymentMethod } = info.row.original;
                const query = info.table.getState().globalFilter;

                // Best Practice: Use a mapping object or simple conditionals for UI logic
                const isPayment = actionType === "payment";

                return (
                    <div
                        className={`flex items-center gap-2 border px-4 py-1 rounded-full ${
                            isPayment
                                ? "bg-sky-100 text-sky-600 border-sky-200"
                                : "bg-red-100 text-red-600 border-red-200"
                        }`}
                    >
                        {isPayment ? (
                            <CreditCard size={18} />
                        ) : (
                            <WalletCards size={18} />
                        )}
                        <Hightlighter
                            text={
                                isPayment
                                    ? `Payment (${paymentMethod})`
                                    : "Purchase"
                            }
                            query={query}
                        />
                    </div>
                );
            },
        }),
        columnHelper.accessor("amount", {
            header: "Paid",
            size: 120,
            cell: (info) => (
                <Hightlighter
                    text={info.getValue()?.toString()}
                    query={info.table.getState().globalFilter}
                />
            ),
        }),
        columnHelper.accessor("remainingDueAmount", {
            header: "Remaining Due",
            size: 120,
            cell: (info) => (
                <Hightlighter
                    text={info.getValue()?.toString()}
                    query={info.table.getState().globalFilter}
                />
            ),
        }),
        columnHelper.display({
            header: "Actions",
            size: 120,
            meta: { sticky: "right" },
            cell: ({ row }) => (
                <div className="flex items-center gap-3 justify-center">
                    <button
                        onClick={() => onView(row.original)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={() => onEdit(row.original)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Edit"
                    >
                        <Pencil size={18} />
                    </button>
                </div>
            ),
        }),
    ];
};
