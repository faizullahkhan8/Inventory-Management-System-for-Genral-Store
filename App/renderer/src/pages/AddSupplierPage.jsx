import Header from "../components/Header";
import { useState } from "react";
import { useCreateSupplier } from "../api/Hooks/supplier.api";
import { useNavigate } from "react-router-dom";
import SupplierForm from "../components/Bill/SupplierFrom";

const AddSupplierPage = () => {
    const [supplierData, setSupplierData] = useState({
        name: "",
        company: "",
        contacts: [
            {
                type: "",
                number: "",
            },
        ],
        address: "",
        email: "",
        totalAmount: "",
        paymentSnapshots: [
            {
                amount: "",
                actionType: "",
                paymentMethod: "",
            },
        ],
    });

    const { createSupplier, loading: createSupplierLoading } =
        useCreateSupplier();
    const navigate = useNavigate();

    const handleAddSupplier = async (e) => {
        e.preventDefault();
        const response = await createSupplier(supplierData);

        if (response.success) {
            navigate("/suppliers");
        }
    };
    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Add Supplier"} />
            <SupplierForm
                handler={handleAddSupplier}
                supplierData={supplierData}
                setSupplierData={setSupplierData}
                loading={createSupplierLoading}
            />
        </div>
    );
};

export default AddSupplierPage;
