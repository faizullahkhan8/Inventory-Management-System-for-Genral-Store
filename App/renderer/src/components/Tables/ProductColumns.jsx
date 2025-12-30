import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Hightlighter from "./Highlighter";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper();

export const getProductColumns = ({
    products,
    setIsDialogOpen,
    setDeletingProductId,
}) => {
    const columns = [
        columnHelper.accessor("imageUrl", {
            header: "Image",
            size: 100,
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <Link
                        to={`/inventory/view-product/${item._id}?prevRoute=/inventory`}
                    >
                        <img
                            src={`${import.meta.env.VITE_API_URL}/${
                                item.imageUrl
                            }`}
                            alt="Product"
                            loading="lazy"
                            className="w-[70px] h-[70px] object-cover rounded-md shadow-sm border cursor-pointer"
                        />
                    </Link>
                );
            },
        }),
        columnHelper.accessor("name", {
            header: "Name",
            size: 200,
            cell: (info) => {
                const row = info.row.original;
                const name = info.getValue();
                const description = row.description;
                const query = info.table.getState().globalFilter;

                return (
                    <div className="flex flex-col">
                        {/* Name */}
                        <span className="inline">
                            <Hightlighter text={name} query={query} />
                        </span>

                        {/* Description */}
                        {description && (
                            <span className="text-sm text-gray-500 mt-1 inline">
                                <Hightlighter
                                    text={description}
                                    query={query}
                                />
                            </span>
                        )}
                    </div>
                );
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
                const value = info.getValue()
                    ? new Date(info.getValue()).toLocaleDateString()
                    : null;
                if (!value) return "---";
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("expDate", {
            header: "Expiry Date",
            size: 110,
            cell: (info) => {
                const value = info.getValue()
                    ? new Date(info.getValue()).toLocaleDateString()
                    : null;
                if (!value) return "---";
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("quantity", {
            header: "Quantity",
            size: 90,
            cell: (info) => {
                const value = info.getValue()?.toString();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("supplierName", {
            header: "Supplier",
            size: 150,
            cell: (info) => {
                const value = info.getValue();
                const query = info.table.getState().globalFilter; // or column filter
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("categoryName", {
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
    ];

    const customKeys = new Set();
    products.forEach((p) => {
        p.customFields?.forEach((field) => customKeys.add(field.fieldKey));
    });

    // Add dynamic columns
    customKeys.forEach((key) => {
        columns.push(
            columnHelper.accessor(
                (row) => {
                    const field = row.customFields?.find(
                        (f) => f.fieldKey === key
                    );
                    return field?.fieldValue || "---";
                },
                {
                    id: key,
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    cell: (info) => {
                        const value = info.getValue();
                        const query = info.table.getState().globalFilter; // or column filter
                        return <Hightlighter text={value} query={query} />;
                    },
                }
            )
        );
    });

    columns.push(
        columnHelper.display({
            id: "actions",
            header: "Actions",
            meta: {
                sticky: "right",
            },
            size: 120,
            cell: ({ row }) => {
                const item = row.original;

                return (
                    <div className="flex items-center gap-3 justify-center">
                        <Link
                            to={`/inventory/view-product/${item._id}?prevRoute=/inventory`}
                        >
                            <Eye
                                className="cursor-pointer text-gray-500 hover:text-gray-900"
                                size={18}
                            />
                        </Link>
                        <Link
                            to={`/inventory/edit-product/${item._id}?prevRoute=/inventory`}
                        >
                            <Pencil
                                className="cursor-pointer text-blue-500 hover:text-blue-700"
                                size={18}
                            />
                        </Link>
                        <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            size={18}
                            onClick={() => {
                                setIsDialogOpen(true);
                                setDeletingProductId(item._id);
                            }}
                        />
                    </div>
                );
            },
        })
    );

    return columns;
};
