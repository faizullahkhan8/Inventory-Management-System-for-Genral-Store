import Select from "../../ui/Select";
import { Input } from "../../ui/Input";
import { PlusCircle, Trash } from "lucide-react";

const AddPayment = ({ supplierData, setSupplierData }) => {
    const handleAddField = () => {
        setSupplierData({
            ...supplierData,
            paymentSnapshots: [
                ...(supplierData.paymentSnapshots || []),
                {
                    amount: "",
                    actionType: "",
                    paymentMethod: "",
                },
            ],
        });
    };

    const handleRemoveField = (index) => {
        const updatedSuppliersSnapshots = [
            ...(supplierData.paymentSnapshots || []),
        ].filter((_, i) => i !== index);

        setSupplierData((pre) => ({
            ...pre,
            paymentSnapshots: updatedSuppliersSnapshots,
        }));
    };

    const handleFieldChange = (index, fieldName, value) => {
        if (fieldName === "actionType" && value === "purchase") {
            setSupplierData((prev) => {
                const updatedSnapshots = [...prev.paymentSnapshots];

                updatedSnapshots[index] = {
                    ...updatedSnapshots[index],
                    paymentMethod: "",
                };

                return {
                    ...prev,
                    paymentSnapshots: updatedSnapshots,
                };
            });
        }

        const updatedFields = [...(supplierData.paymentSnapshots || [])];
        updatedFields[index] = {
            ...updatedFields[index],
            [fieldName]: value,
        };
        setSupplierData({
            ...supplierData,
            paymentSnapshots: updatedFields,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {supplierData.paymentSnapshots.map((payment, index) => (
                <div className="flex gap-2" key={index}>
                    <div className="w-full grid grid-cols-3 gap-2">
                        <div>
                            <label htmlFor="email">Amount</label>
                            <Input
                                id="amount"
                                name="supplier-payment-amount"
                                value={payment.amount}
                                autoComplete="supplier-email"
                                required
                                placeholder="Enter amount..."
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        "amount",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Action Type</label>
                            <Select
                                id="actionType"
                                name="supplier-payment-action-type"
                                required
                                autoComplete="payment-action"
                                onChange={(val) =>
                                    handleFieldChange(index, "actionType", val)
                                }
                                placeholder="Select contact type"
                                options={[
                                    {
                                        label: "Purchase",
                                        value: "purchase",
                                    },
                                    {
                                        label: "Payment",
                                        value: "payment",
                                    },
                                ]}
                            />
                        </div>
                        {supplierData.paymentSnapshots[index].actionType ===
                            "payment" && (
                            <div>
                                <label>Payment Method</label>
                                <Select
                                    id="paymentMethod"
                                    name="supplier-payment-payment-method"
                                    required
                                    autoComplete="payment-method"
                                    onChange={(val) =>
                                        handleFieldChange(
                                            index,
                                            "paymentMethod",
                                            val
                                        )
                                    }
                                    placeholder="Select contact type"
                                    options={[
                                        {
                                            label: "Cash",
                                            value: "cash",
                                        },
                                        {
                                            label: "Bank",
                                            value: "bank",
                                        },
                                        {
                                            label: "Online",
                                            value: "online",
                                        },
                                        {
                                            label: "Cheque",
                                            value: "cheque",
                                        },
                                    ]}
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email">Payment Date</label>
                            <Input
                                id="timestamp"
                                type="date"
                                name="supplier-payment-timestamp"
                                value={payment.timestamp}
                                autoComplete="supplier-payment-timestamp"
                                required
                                placeholder="Enter payment date..."
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        "timestamp",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="pt-7">
                        <Trash
                            size={20}
                            className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                            onClick={() => handleRemoveField(index)}
                        />
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-2">
                <p className="text-sm text-primary hover:text-shadow-primary-hover">
                    Want to add another payment?{" "}
                </p>
                <span className="hover:bg-blue-500 hover:text-white cursor-pointer rounded-full transition-colors duration-200">
                    <PlusCircle size={25} onClick={handleAddField} />
                </span>
            </div>
        </div>
    );
};

export default AddPayment;
