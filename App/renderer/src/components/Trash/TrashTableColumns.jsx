import { createColumnHelper } from "@tanstack/react-table";
import {
    BoxesIcon,
    CircleQuestionMark,
    Clipboard,
    Package,
    RefreshCcw,
    Trash,
    Truck,
    Users,
} from "lucide-react";
import { Button } from "../../ui/Button";
import Hightlighter from "../Tables/Highlighter";

const columnHelper = createColumnHelper();

export const getTrashedTableColumns = ({
    setActionedItemId,
    setIsDeleteDialogOpen,
    setIsRestoreDialogOpen,
}) => {
    return [
        columnHelper.accessor("type", {
            header: "Type",
            size: 150,
            cell: (info) => {
                const type = info.getValue();
                const query = info.table.getState().globalFilter;

                if (type === "products") {
                    return (
                        <div className="bg-sky-100 text-sky-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <Package size={18} />
                            <Hightlighter text="Product" query={query} />
                        </div>
                    );
                } else if (type === "category") {
                    return (
                        <div className="bg-emerald-100 text-emerald-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <BoxesIcon size={18} />
                            <Hightlighter text="Category" query={query} />
                        </div>
                    );
                } else if (type === "customer") {
                    return (
                        <div className="bg-indigo-100 text-indigo-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <Users size={18} />
                            <Hightlighter text="Customer" query={query} />
                        </div>
                    );
                } else if (type === "suppliers") {
                    return (
                        <div className="bg-purple-100 text-purple-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <Truck size={18} />
                            <Hightlighter text="Supplier" query={query} />
                        </div>
                    );
                } else if (type === "invoice") {
                    return (
                        <div className="bg-pink-100 text-pink-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <Clipboard size={18} />
                            <Hightlighter text="Invoice" query={query} />
                        </div>
                    );
                } else {
                    return (
                        <div className="bg-rose-100 text-rose-600 flex items-center gap-2 border px-4 py-1 border-gray-300 rounded-full">
                            <CircleQuestionMark size={18} />
                            <Hightlighter text="Unknown" query={query} />
                        </div>
                    );
                }
            },
        }),
        columnHelper.accessor("name", {
            header: "Name",
            size: 250,
            cell: (info) => {
                const value = info.getValue();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("deletedOn", {
            header: "Deleted On",
            size: 200,
            cell: (info) => {
                const value = new Date(info.getValue()).toLocaleString();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("deletedBy", {
            header: "Deleted By",
            size: 200,
            cell: (info) => {
                const value = info.getValue();
                const query = info.table.getState().globalFilter;
                return <Hightlighter text={value} query={query} />;
            },
        }),
        columnHelper.accessor("actions", {
            header: "Actions",
            meta: {
                sticky: "right",
            },
            size: 200,
            cell: ({ row }) => {
                const itemId = row.original._id;
                return (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            className="bg-emerald-100 text-emerald-600"
                            onClick={() => {
                                setActionedItemId(itemId);
                                setIsRestoreDialogOpen(true);
                            }}
                            size="sm"
                        >
                            <RefreshCcw size={20} /> Restore
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-rose-100 text-rose-600"
                            onClick={() => {
                                setActionedItemId(itemId);
                                setIsDeleteDialogOpen(true);
                            }}
                            size="sm"
                        >
                            <Trash size={20} color="red" />
                        </Button>
                    </div>
                );
            },
        }),
    ];
};
