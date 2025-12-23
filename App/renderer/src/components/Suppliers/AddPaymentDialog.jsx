import { useState, useEffect } from "react";
import { Loader, X } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import Select from "../../ui/Select";
import { Input } from "../../ui/Input";
import {
    useCreateSupplierPayment,
    useUpdateSupplierPayment,
} from "../../api/Hooks/supplier.api";

const INITIAL_STATE = {
    amount: "",
    actionType: "purchase", // Default to purchase
    paymentMethod: "",
    timestamp: new Date().toISOString().split("T")[0], // Default to today
};

const AddPaymentDialog = ({
    open,
    onClose,
    supplierId,
    setSupplierData,
    existingPayment, // Passed if editing
    isEditing, // Boolean flag
}) => {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { createSupplierPayment, loading: createLoading } =
        useCreateSupplierPayment();
    const { updateSupplierPayment, loading: updateLoading } =
        useUpdateSupplierPayment();

    // 1. Reset or Prefill Form on Open
    useEffect(() => {
        if (open) {
            if (isEditing && existingPayment) {
                setFormData({
                    amount: existingPayment.amount,
                    actionType: existingPayment.actionType,
                    paymentMethod: existingPayment.paymentMethod || "",
                    timestamp: existingPayment.timestamp?.split("T")[0] || "",
                });
            } else {
                setFormData(INITIAL_STATE);
            }
        }
    }, [open, isEditing, existingPayment]);

    // 2. Handle Input Changes
    const handleChange = (field, value) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };

            // Auto-clear payment method if switching to Purchase
            if (field === "actionType" && value === "purchase") {
                newData.paymentMethod = "";
            }
            return newData;
        });
    };

    // 4. Submit Handler
    const handleSubmit = async () => {
        const payload = {
            ...formData,
            supplierId,
            snapshotId: isEditing ? existingPayment?._id : undefined,
        };

        let response = null;
        if (isEditing) {
            response = await updateSupplierPayment(payload);
        } else {
            response = await createSupplierPayment(payload);
        }

        if (response?.success) {
            setSupplierData(response.supplier);
            setFormData(null);
            onClose();
        }
    };

    if (!open) return null;

    const loading = createLoading || updateLoading;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <Card className="bg-white relative w-[95%] max-w-md p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEditing ? "Update Transaction" : "Add Transaction"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Amount */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) =>
                                handleChange("amount", e.target.value)
                            }
                        />
                    </div>

                    {/* Action Type */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Action Type
                        </label>
                        <Select
                            placeholder="Select action type"
                            value={formData.actionType}
                            onChange={(val) => handleChange("actionType", val)}
                            options={[
                                { label: "Purchase (Bill)", value: "purchase" },
                                {
                                    label: "Payment (Outgoing)",
                                    value: "payment",
                                },
                            ]}
                        />
                    </div>

                    {/* Payment Method - Conditionally Rendered */}
                    {formData.actionType === "payment" && (
                        <div className="space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
                            <label className="text-sm font-medium text-gray-700">
                                Payment Method
                            </label>
                            <Select
                                placeholder="Select method"
                                value={formData.paymentMethod}
                                onChange={(val) =>
                                    handleChange("paymentMethod", val)
                                }
                                options={[
                                    { label: "Cash", value: "cash" },
                                    { label: "Bank Transfer", value: "bank" },
                                    { label: "Online", value: "online" },
                                    { label: "Cheque", value: "cheque" },
                                ]}
                            />
                        </div>
                    )}

                    {/* Date */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <Input
                            type="date"
                            value={formData.timestamp}
                            onChange={(e) =>
                                handleChange("timestamp", e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <Loader className="animate-spin" size={16} />
                        ) : isEditing ? (
                            "Update"
                        ) : (
                            "Add"
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AddPaymentDialog;
