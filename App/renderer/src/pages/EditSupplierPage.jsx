import Header from "../components/Header";
import { useEffect, useState } from "react";
import SupplierFrom from "../components/Suppliers/SupplierFrom";
import { useGetSupplier, useUpdateSupplier } from "../api/Hooks/supplier.api";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";

const EditSupplierPage = () => {
    const supplierId = useParams().id;
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

    const { getSupplier, loading: getSupplierLoading } = useGetSupplier();
    const { updateSupplier, loading: updateSupplierLoading } =
        useUpdateSupplier();

    useEffect(() => {
        (async () => {
            const response = await getSupplier(supplierId);
            if (response.success) {
                setSupplierData(response.supplier);
            }
        })();
    }, [supplierId]);

    const navigate = useNavigate();

    const handleAddSupplier = async () => {
        const response = await updateSupplier({ supplierId, supplierData });

        if (response.success) {
            navigate("/suppliers");
        }
    };

    if (getSupplierLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Edit Supplier"} />
            <SupplierFrom
                handler={handleAddSupplier}
                supplierData={supplierData}
                setSupplierData={setSupplierData}
                loading={updateSupplierLoading}
                isEditing={true}
            />
        </div>
    );
};

export default EditSupplierPage;
