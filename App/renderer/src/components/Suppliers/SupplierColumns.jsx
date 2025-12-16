import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Hightlighter from "../Tables/Highlighter";

export const getSupplierColumns = () => {
    const columnHelper = createColumnHelper();

    return [
        columnHelper.accessor("name", {
            header: "Supplier Name",
            size: 200,
            cell: (info) => {
                const value = info.getValue().toString();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("company", {
            header: "Company",
            size: 200,
            cell: (info) => {
                const value = info.getValue().toString();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("email", {
            header: "Email Address",
            size: 150,
            cell: (info) => {
                const value = info.getValue().toString();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("phone", {
            header: "Phone Number",
            size: 150,
            cell: (info) => {
                const value = info.getValue().toString();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("lastPurchaseDate", {
            header: "Last Purchase",
            size: 200,
            cell: (info) => {
                if (info.getValue()) {
                    return new Date(info.getValue()).toLocaleDateString();
                } else {
                    return "---";
                }
            },
        }),
        columnHelper.accessor("paidAmount", {
            header: "Pending Amount",
            size: 150,
            cell: (info) => {
                const value = info.getValue().toString();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("totalAmount", {
            header: "Total Amount",
            size: 150,
            cell: (info) => {
                const value = info.getValue().toString();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            meta: {
                sticky: "right",
            },
            size: 120,
            cell: () => {
                return (
                    <div className="flex items-center gap-3 justify-center">
                        <Link>
                            <Eye
                                className="cursor-pointer text-gray-500 hover:text-gray-900"
                                size={18}
                            />
                        </Link>
                        <Link>
                            <Pencil
                                className="cursor-pointer text-blue-500 hover:text-blue-700"
                                size={18}
                            />
                        </Link>
                        <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            size={18}
                        />
                    </div>
                );
            },
        }),
    ];
};
