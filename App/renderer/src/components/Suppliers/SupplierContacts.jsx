import { Label } from "@radix-ui/react-select";
import React from "react";
import { Input } from "../../ui/Input";
import { PlusCircle, Trash } from "lucide-react";
import Select from "../../ui/Select";

const SupplierContacts = ({ supplierData, setSupplierData }) => {
    const handleAddField = () => {
        setSupplierData({
            ...supplierData,
            contacts: [
                ...(supplierData.contacts || []),
                { type: "", number: "" },
            ],
        });
    };

    const handleRemoveField = (index) => {
        const updatedFields = supplierData.contacts.filter(
            (_, i) => i !== index
        );
        setSupplierData({
            ...supplierData,
            contacts: updatedFields,
        });
    };

    const handleFieldChange = (index, fieldName, value) => {
        const updatedFields = [...(supplierData.contacts || [])];
        updatedFields[index] = {
            ...updatedFields[index],
            [fieldName]: value,
        };
        setSupplierData({
            ...supplierData,
            contacts: updatedFields,
        });
    };

    return (
        <div className="flex flex-col gap-2">
            {supplierData.contacts.length > 0 && (
                <div className="flex flex-col gap-2">
                    {supplierData.contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="flex items-end gap-2 w-full"
                        >
                            <div className="w-full flex flex-col gap-2">
                                <label>Type</label>
                                <Select
                                    id="type"
                                    name="contact-type"
                                    required
                                    autoComplete="contact-type"
                                    onChange={(val) =>
                                        handleFieldChange(index, "type", val)
                                    }
                                    placeholder="Select contact type"
                                    options={[
                                        {
                                            label: "WhatsApp",
                                            value: "whatsapp",
                                        },
                                        {
                                            label: "Personal Phone",
                                            value: "personalPhone",
                                        },
                                        {
                                            label: "Company Phone",
                                            value: "companyPhone",
                                        },
                                    ]}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label>Number</label>
                                <Input
                                    value={contact.number}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            index,
                                            "number",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter field value..."
                                />
                            </div>
                            <div className="pb-2">
                                <Trash
                                    size={20}
                                    className="cursor-pointer hover:text-red-500 transition-colors duration-200"
                                    onClick={() => handleRemoveField(index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex items-center gap-2">
                <p className="text-sm text-primary hover:text-shadow-primary-hover">
                    Want to add another contact?{" "}
                </p>
                <span className="hover:bg-blue-500 hover:text-white cursor-pointer rounded-full transition-colors duration-200">
                    <PlusCircle size={25} onClick={handleAddField} />
                </span>
            </div>
        </div>
    );
};

export default SupplierContacts;
