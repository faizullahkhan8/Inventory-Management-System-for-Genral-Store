import {
    Calendar,
    Package,
    FileText,
    CreditCard,
    Loader,
    Trash2,
    Eye,
    Pencil,
    Truck,
} from "lucide-react";
import { Card } from "../../ui/Card";
import { Link } from "react-router-dom";

const BillGrid = ({
    bills = [],
    loading = false,
    setSelectedBill,
    setIsDeleteDialogOpen,
}) => {
    /* ---------- Empty State ---------- */
    if (!bills.length) {
        return (
            <div className="text-center text-sm text-gray-500 py-10">
                No bills found
            </div>
        );
    }
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full w-full text-sm text-gray-500 py-10">
                <Loader className="animate-spin" size={28} />
            </div>
        );
    }

    /* ---------- Normal Grid ---------- */
    return (
        <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-4 p-4">
            {bills.map((bill, index) => (
                <Card
                    key={index}
                    className="flex flex-col gap-4 p-4 hover:shadow-md transition relative"
                >
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Eye
                            size={18}
                            onClick={() => {
                                setSelectedBill({
                                    type: "view",
                                    data: bill,
                                });
                            }}
                            className="text-green-500 hover:text-green-700 transition-colors duration-100 cursor-pointer"
                        />

                        <Link to={`/billing/edit-bill/${bill._id}`}>
                            <Pencil
                                size={18}
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-100 cursor-pointer"
                            />
                        </Link>
                        <Trash2
                            onClick={() => {
                                setSelectedBill({
                                    type: "delete",
                                    data: bill,
                                });
                                setIsDeleteDialogOpen(true);
                            }}
                            size={18}
                            className="text-red-500 hover:text-red-700 transition-colors duration-100 cursor-pointer"
                        />
                    </div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 flex-col">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 truncate w-30">
                                Bill #{bill._id}
                            </h3>

                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                <Calendar size={14} />
                                {bill.purchaseDate}
                            </p>
                        </div>

                        <span
                            className={`text-xs px-2 py-1 rounded-xl font-semibold capitalize ${
                                bill.status === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : bill.status === "partial"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : bill.status === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            {bill.status}
                        </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                            <Truck size={14} />
                            {bill.supplierId?.name || "N/A"}
                        </div>

                        <div className="flex items-center gap-2">
                            <CreditCard size={14} />
                            {bill.paymentType || "N/A"}
                        </div>

                        <div className="flex items-center gap-2">
                            <Package size={14} />
                            {bill.items?.length || 0} Items
                        </div>

                        {bill.note && (
                            <div className="flex items-center gap-2">
                                <FileText size={14} />
                                {bill.note}
                            </div>
                        )}
                    </div>

                    {/* Amounts */}
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-300 pt-3 text-sm">
                        <AmountItem label="Total" value={bill.total} />
                        <AmountItem
                            label="Paid"
                            value={bill.paidAmount}
                            color="text-green-600"
                        />
                        <AmountItem
                            label="Due"
                            value={bill.dueAmount}
                            color={
                                bill.dueAmount > 0
                                    ? "text-orange-600"
                                    : "text-gray-600"
                            }
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
};

const AmountItem = ({ label, value, color = "text-gray-700" }) => (
    <div className="flex flex-col text-center">
        <span className="text-xs text-gray-400">{label}</span>
        <span className={`font-semibold ${color}`}>
            Rs {value?.toLocaleString()}
        </span>
    </div>
);

export default BillGrid;
