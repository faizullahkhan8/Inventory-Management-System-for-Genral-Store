import toast from "react-hot-toast";
import Header from "../components/Header";
import BillForm from "../components/Bill/BillForm";
import SplitBillForm from "../components/Bill/SplitBillForm";
import { useState } from "react";
import { useAddBill } from "../api/Hooks/bill.api";
import { useNavigate } from "react-router-dom";

const AddBillPage = () => {
    const [billLayout, setBillLayout] = useState("split");
    const [billData, setBillData] = useState({
        supplierId: "",
        purchaseDate: "",
        paymentType: "cash",
        paidAmount: 0,
        note: "",
        items: [
            {
                productId: "",
                quantity: 1,
                price: 0,
                discount: 0,
            },
        ],
    });

    const { addBill, loading: addBillLoading } = useAddBill();
    const navigate = useNavigate();

    const handleAddBill = async (e, data) => {
        e.preventDefault();

        if (!data.supplierId) {
            return toast.error("Please select a supplier");
        }

        if (!data.purchaseDate) {
            return toast.error("Please select purchase date");
        }

        if (!data.items?.length) {
            return toast.error("At least one item is required");
        }

        const total = data.items.reduce(
            (acc, item) =>
                acc + item.quantity * item.price - (item.discount || 0),
            0
        );

        const payload = {
            ...data,
            total,
            dueAmount: total - data.paidAmount,
            status: data.paidAmount >= total ? "paid" : "partial",
        };

        const response = await addBill(payload);

        if (response.success) {
            setBillData(null);
            navigate("/billing");
        }
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title="Add Bill" />

            {/* bill layout toggle button */}
            <div className="flex justify-center items-center mt-2">
                <button
                    onClick={() => setBillLayout("split")}
                    className={`px-3 py-1 rounded-l-md max-w-22 text-xs ${
                        billLayout === "split"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    Split Bill
                </button>
                <button
                    onClick={() => setBillLayout("combined")}
                    className={`px-3 py-1 rounded-r-md max-w-22 text-xs ${
                        billLayout === "combined"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    Single Bill
                </button>
            </div>

            {billLayout === "combined" ? (
                <BillForm
                    handler={handleAddBill}
                    loading={addBillLoading}
                    billData={billData}
                    setBillData={setBillData}
                />
            ) : (
                <SplitBillForm
                    handler={handleAddBill}
                    loading={addBillLoading}
                    billData={billData}
                    setBillData={setBillData}
                />
            )}
        </div>
    );
};

export default AddBillPage;
