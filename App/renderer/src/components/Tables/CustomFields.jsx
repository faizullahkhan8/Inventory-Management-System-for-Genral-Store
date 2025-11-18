import { PlusCircle, Trash } from "lucide-react";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";

const CustomFieldsComponent = ({ productData, setProductData }) => {
    const handleAddField = () => {
        setProductData({
            ...productData,
            customFields: [
                ...(productData.customFields || []),
                { fieldKey: "", fieldValue: "" },
            ],
        });
    };

    const handleFieldChange = (index, fieldName, value) => {
        const updatedFields = [...(productData.customFields || [])];
        updatedFields[index] = {
            ...updatedFields[index],
            [fieldName]: value,
        };
        setProductData({
            ...productData,
            customFields: updatedFields,
        });
    };

    const handleRemoveField = (index) => {
        const updatedFields = (productData.customFields || []).filter(
            (_, i) => i !== index
        );
        setProductData({
            ...productData,
            customFields: updatedFields,
        });
    };

    // Early return if customFields doesn't exist or is empty
    const customFields = productData.customFields || [];

    return (
        <div className="flex flex-col gap-2">
            {customFields.length > 0 && (
                <div className="flex flex-col gap-2">
                    {customFields.map((field, index) => (
                        <div
                            key={index}
                            className="flex items-end gap-2 w-full"
                        >
                            <div className="w-full flex flex-col gap-2">
                                <Label>Field Name</Label>
                                <Input
                                    value={field.fieldKey}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            index,
                                            "fieldKey",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter field name..."
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <Label>Field Value</Label>
                                <Input
                                    value={field.fieldValue}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            index,
                                            "fieldValue",
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
                    Want to add custom fields?{" "}
                </p>
                <span className="hover:bg-blue-500 hover:text-white cursor-pointer rounded-full transition-colors duration-200">
                    <PlusCircle size={25} onClick={handleAddField} />
                </span>
            </div>
        </div>
    );
};

export default CustomFieldsComponent;
