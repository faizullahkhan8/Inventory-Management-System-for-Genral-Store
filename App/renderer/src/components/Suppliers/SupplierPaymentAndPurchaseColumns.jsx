import { createColumnHelper } from "@tanstack/react-table";
import Hightlighter from "../Tables/Highlighter";
import { CreditCard, Eye, Pencil, Trash2, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

export const getSupplierPaymentAndPurchaseColumns = () => {
    const columnHelper = createColumnHelper();

    return [
        columnHelper.accessor("id", {
            header: "Payment Id",
            size: 170,
            cell: (info) => {
                const value = info.getValue()?.toString();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={`# ${value}`} query={query} />;
            },
        }),
        columnHelper.accessor("date", {
            header: "Date",
            size: 120,
            cell: (info) => {
                const value = info.getValue()?.toString();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("type", {
            header: "Type",
            size: 210,
            cell: (info) => {
                const row = info.row.original;
                const query = info.table.getState().globalFilter;

                if (row.type === "payment") {
                    return (
                        <div className="bg-sky-100 text-sky-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <CreditCard size={18} />
                            <Hightlighter
                                text={`Payment (${row.paymentMethod})`}
                                query={query}
                            />
                        </div>
                    );
                } else if (row.type === "purchase") {
                    return (
                        <div className="bg-red-100 text-red-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <WalletCards size={18} />
                            <Hightlighter text="Purchase" query={query} />
                        </div>
                    );
                }
            },
        }),
        columnHelper.accessor("total", {
            header: "Total",
            size: 120,
            cell: (info) => {
                const value = info.getValue()?.toString();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("paid", {
            header: "Paid",
            size: 120,
            cell: (info) => {
                const value = info.getValue()?.toString();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("pending", {
            header: "Pending",
            size: 120,
            cell: (info) => {
                const value = info.getValue()?.toString();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.display({
            header: "Actions",
            size: 120,
            meta: {
                sticky: "right",
            },
            cell: () => {
                return (
                    <div className="flex items-center gap-3 justify-center">
                        <Link to={`/suppliers`}>
                            <Eye
                                className="cursor-pointer text-gray-500 hover:text-gray-900"
                                size={18}
                            />
                        </Link>
                        <Link to={`/suppliers`}>
                            <Pencil
                                className="cursor-pointer text-blue-500 hover:text-blue-700"
                                size={18}
                            />
                        </Link>
                        <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            size={18}
                            onClick={() => {}}
                        />
                    </div>
                );
            },
        }),
    ];
};
