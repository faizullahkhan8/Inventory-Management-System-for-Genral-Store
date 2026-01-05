import { useEffect, useState } from "react";
import { Card } from "../../ui/Card";
import AddSupplierForm from "./SupplierFrom";
import {
    useCreateSupplier,
    useUpdateSupplier,
} from "../../api/Hooks/supplier.api";

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
    selectedSupplierData,
    setSupplierData,
}) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    const { createSupplier, loading: createSupplierLoading } =
        useCreateSupplier();

    const { updateSupplier, loading: updateSupplierLoading } =
        useUpdateSupplier();

    useEffect(() => {
        if (open && !isEditing) {
            setFormData(INITIAL_FORM_STATE);
        }

        if (open && isEditing) {
            setFormData(selectedSupplierData);
        }
    }, [open, isEditing, selectedSupplierData]);

    if (!open) return null;

    const handleAddSupplier = async () => {
        if (isEditing) {
            const response = await updateSupplier({
                supplierId: selectedSupplierData._id,
                supplierData: formData,
            });

            if (response) {
                setSupplierData((prev) =>
                    prev.map((supplier) =>
                        supplier._id === response.supplier._id
                            ? response.supplier
                            : supplier
                    )
                );
                onClose();
            }
        } else {
            const response = await createSupplier(formData);

            if (response) {
                setSupplierData((prev) => [response.supplier, ...prev]);
                onClose();
            }
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
                    loading={createSupplierLoading || updateSupplierLoading}
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
