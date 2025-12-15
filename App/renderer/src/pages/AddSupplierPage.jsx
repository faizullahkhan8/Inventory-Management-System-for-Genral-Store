import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import SupplierFrom from "../components/Suppliers/SupplierFrom";

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
    });
    const handleAddSupplier = async (e) => {
        e.preventDefault();
    };
    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Add Supplier"} />
            <SupplierFrom
                handler={handleAddSupplier}
                supplierData={supplierData}
                setSupplierData={setSupplierData}
                loading={false}
            />
        </div>
    );
};

export default AddSupplierPage;
