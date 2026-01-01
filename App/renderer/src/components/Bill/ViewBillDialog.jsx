import { X, Calendar, CreditCard, Package, FileText, User } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";

const ViewBillDialog = ({ bill, onClose }) => {
    if (!bill) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <Card className="bg-white relative w-[95%] max-w-lg p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-gray-800 truncate">
                            Bill #{bill._id}
                        </h2>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={14} />
                            {bill.purchaseDate}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Status */}
                <div className="mb-4">
                    <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${
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
                <div className="space-y-2 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                        <User size={14} />
                        Supplier: {bill.supplierId?.name || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                        <CreditCard size={14} />
                        Payment: {bill.paymentType || "N/A"}
                    </div>

                    <div className="flex items-center gap-2">
                        <Package size={14} />
                        Items: {bill.items?.length || 0}
                    </div>

                    {bill.note && (
                        <div className="flex items-start gap-2">
                            <FileText size={14} className="mt-0.5" />
                            <p className="line-clamp-2">{bill.note}</p>
                        </div>
                    )}
                </div>

                {/* Items List */}
                <div className="border border-gray-300 rounded-md max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="grid grid-cols-6 gap-2 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 sticky top-0">
                        <span className="col-span-2">Item</span>
                        <span className="text-center">Price</span>
                        <span className="text-center">Qty</span>
                        <span className="text-center">Discount</span>
                        <span className="text-right">Total</span>
                    </div>

                    {bill.items?.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-6 gap-2 px-3 py-2 text-xs border-t border-gray-200 items-center"
                        >
                            <div className="col-span-2 truncate">
                                {item.productId?.name || "Product"}
                            </div>

                            <div className="text-center font-medium">
                                Rs {item.price?.toLocaleString() || "0"}
                            </div>

                            <div className="text-center">{item.quantity}</div>

                            <div className="text-center font-medium">
                                Rs {item.discount?.toLocaleString() || "0"}
                            </div>

                            <div className="text-right font-medium">
                                Rs{" "}
                                {(
                                    item.total ?? item.quantity * item.price
                                )?.toLocaleString()}
                            </div>
                        </div>
                    ))}

                    {!bill.items?.length && (
                        <div className="px-3 py-3 text-xs text-center text-gray-500">
                            No items found
                        </div>
                    )}
                </div>
                {/* Amounts */}
                <div className="grid grid-cols-3 gap-3 border-t border-gray-200 mt-4 pt-4 text-sm">
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

                {/* Footer */}
                <div className="mt-6 text-right">
                    <Button variant="danger" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </Card>
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

export default ViewBillDialog;
