import { useEffect, useState } from "react";
import { Card } from "../../ui/Card";
import AddSupplierForm from "./SupplierFrom";

const INITIAL_FORM_STATE = {
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
};

const ManageSupplierDialog = ({
    open,
    onClose,
    isEditing,
    supplierData,
}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (open && !isEditing) {
            setFormData(INITIAL_FORM_STATE);
        }

        if (open && isEditing) {
            setFormData(supplierData);
        }
    }, [open, isEditing, supplierData]);

    if (!open) return null;

    const handleAddSupplier = () => {
        if (isEditing) {
            console.log("Update supplier:", formData);
        } else {
            console.log("Add supplier:", formData);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <Card className="relative z-10 w-full max-w-xl bg-white p-6 animate-in fade-in zoom-in-95 duration-200">
                <AddSupplierForm
                    handler={handleAddSupplier}
                    loading={false}
                    isEditing={isEditing}
                    supplierData={formData}
                    setSupplierData={setFormData}
                    onClose={onClose}
                />
            </Card>
        </div>
    );
};

export default ManageSupplierDialog;
