import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "../../ui/Button";
import { Delete, Edit, Eye } from "lucide-react";

export const getSupplierColumns = () => {
    const columnHelper = createColumnHelper();

    return [
        columnHelper.accessor("name", {
            header: "Supplier Name",
            size: 200,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("company", {
            header: "Company",
            size: 200,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("phone", {
            header: "Phone Number",
            size: 150,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("pendingAmount", {
            header: "Pending Amount",
            size: 150,
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("lastPurchaseDate", {
            header: "Last Purchase",
            size: 200,
            cell: (info) => new Date(info.getValue()).toLocaleDateString(),
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            size: 200,
            cell: () => {
                return (
                    <div className="flex gap-2">
                        <Button variant="ghost">
                            <Eye size={20} />
                        </Button>
                        {/* edit */}
                        <Button variant="ghost">
                            <Edit size={20} />
                        </Button>
                        <Button variant="ghost">
                            <Delete size={20} />
                        </Button>
                    </div>
                );
            },
        }),
    ];
};
