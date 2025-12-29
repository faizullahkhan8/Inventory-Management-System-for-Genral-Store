import toast from "react-hot-toast";
import Header from "../components/Header";
import BillForm from "../components/Bill/BillForm";
import { useState } from "react";
import { useAddBill } from "../api/Hooks/bill.api";
import { useNavigate } from "react-router-dom";

const AddBillPage = () => {
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

            <BillForm
                handler={handleAddBill}
                loading={addBillLoading}
                billData={billData}
                setBillData={setBillData}
            />
        </div>
    );
};

export default AddBillPage;
