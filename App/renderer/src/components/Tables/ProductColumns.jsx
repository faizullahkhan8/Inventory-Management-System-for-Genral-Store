import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Hightlighter from "./Highlighter";

const onDelete = (item) => {
    console.log(item);
};

const onEdit = (item) => {
    console.log(item);
};

const columnHelper = createColumnHelper();

export const Columns = [
    columnHelper.accessor("imageUrl", {
        header: "Image",
        size: 100,
        cell: (info) => (
            <img
                src={info.getValue()}
                alt="Product"
                loading="lazy"
                className="w-[70px] h-[70px] object-cover rounded-md shadow-sm border"
            />
        ),
    }),
    columnHelper.accessor("name", {
        header: "Name",
        size: 200,
        cell: (info) => {
            const value = info.getValue();
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("sku", {
        header: "SKU",
        size: 120,
        cell: (info) => {
            const value = info.getValue();
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("purchasedPrice", {
        header: "Purchased Price",
        size: 140,
        cell: (info) => {
            const value = `Rs: ${info.getValue()}`;
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("sellingPrice", {
        header: "Selling Price",
        size: 120,
        cell: (info) => {
            const value = `Rs: ${info.getValue()}`;
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("mfgDate", {
        header: "Mfg Date",
        size: 110,
        cell: (info) => {
            const value = new Date(info.getValue()).toLocaleDateString();
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("expDate", {
        header: "Expiry Date",
        size: 110,
        cell: (info) => {
            const value = new Date(info.getValue()).toLocaleDateString();
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("quantity", {
        header: "Quantity",
        size: 90,
        cell: (info) => {
            const value = info.getValue().toString();
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("supplier", {
        header: "Supplier",
        size: 150,
        cell: (info) => {
            const value = info.getValue();
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("category", {
        header: "Category",
        size: 120,
        cell: (info) => {
            const value = info.getValue();
            const query = info.table.getState().globalFilter; // or column filter
            return <Hightlighter text={value} query={query} />;
        },
    }),
    columnHelper.accessor("isActive", {
        header: "Active",
        size: 80,
        cell: (info) => (
            <span
                className={`${
                    info.getValue() ? "text-green-600" : "text-red-600"
                } font-medium`}
            >
                {info.getValue() ? "Yes" : "No"}
            </span>
        ),
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 120,
        cell: ({ row }) => {
            const item = row.original;

            return (
                <div className="flex items-center gap-3 justify-center">
                    <Eye
                        className="cursor-pointer text-gray-700 hover:text-gray-900"
                        size={18}
                        onClick={() => console.log("View:", item)}
                    />
                    <Pencil
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        size={18}
                        onClick={() => onEdit(item)}
                    />
                    <Trash2
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        size={18}
                        onClick={() => onDelete(item)}
                    />
                </div>
            );
        },
    }),
];
