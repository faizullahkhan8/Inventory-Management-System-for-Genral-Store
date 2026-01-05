import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import SupplierContacts from "./SupplierContacts";
import { Loader } from "lucide-react";

const SupplierForm = ({
    handler,
    supplierData,
    setSupplierData,
    loading = false,
    isEditing = false,
    onClose,
}) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setSupplierData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof handler === "function") {
            handler(supplierData);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader size={40} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-h-[calc(100vh-10rem)] w-full p-4 overflow-y-auto">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-primary font-bold text-xl">
                    {isEditing ? "Edit Supplier" : "Add Supplier"}
                </h1>
                <p className="text-sm text-gray-600">
                    {isEditing
                        ? "Edit the existing supplier details."
                        : "Fill the details to add a new supplier."}
                </p>
                <p className="text-xs mt-1">
                    <span className="text-red-500">*</span> Required fields
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="name">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="name"
                            value={supplierData?.name || ""}
                            required
                            placeholder="Enter supplier name"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="company">
                            Company <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="company"
                            value={supplierData?.company || ""}
                            required
                            placeholder="Enter company name"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="address">Address</label>
                        <Input
                            id="address"
                            value={supplierData?.address || ""}
                            placeholder="Enter address"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            value={supplierData?.email || ""}
                            required
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Contacts */}
                <div>
                    <label>
                        Contacts <span className="text-red-500">*</span>
                    </label>
                    <SupplierContacts
                        supplierData={supplierData}
                        setSupplierData={setSupplierData}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="danger" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {isEditing ? "Update Supplier" : "Add Supplier"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SupplierForm;
