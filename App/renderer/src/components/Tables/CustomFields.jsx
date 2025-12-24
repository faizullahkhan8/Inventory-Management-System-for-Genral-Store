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
        <div className="flex flex-col gap-6 w-full">
            {customFields.length > 0 && (
                <div className="flex flex-col gap-4">
                    {customFields.map((field, index) => (
                        <div
                            key={index}
                            // Mobile: Flex col with border/bg for card look
                            // Desktop: Grid layout with 12 columns, no border
                            className="flex flex-col gap-3 p-4 border rounded-lg bg-gray-50/50 
                     md:grid md:grid-cols-12 md:gap-4 md:items-end md:p-0 md:border-0 md:bg-transparent"
                        >
                            {/* Field Name Input - Takes up 5/12 columns on desktop */}
                            <div className="flex flex-col gap-1.5 md:col-span-5">
                                <Label className="text-sm font-medium">
                                    Field Name
                                </Label>
                                <Input
                                    value={field.fieldKey}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            index,
                                            "fieldKey",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. Color"
                                    className="w-full"
                                />
                            </div>

                            {/* Field Value Input - Takes up 6/12 columns on desktop */}
                            <div className="flex flex-col gap-1.5 md:col-span-6">
                                <Label className="text-sm font-medium">
                                    Field Value
                                </Label>
                                <Input
                                    value={field.fieldValue}
                                    onChange={(e) =>
                                        handleFieldChange(
                                            index,
                                            "fieldValue",
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. Red"
                                    className="w-full"
                                />
                            </div>

                            {/* Delete Action - Takes up 1/12 column on desktop */}
                            <div className="flex justify-end md:justify-center md:pb-2 md:col-span-1">
                                {/* Tooltip or button wrapper recommended here for accessibility.
                Added 'text-red-500' hover state and padding for hit area.
             */}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveField(index)}
                                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-all"
                                    aria-label="Remove field"
                                >
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Field Button Area */}
            <div className="flex items-center gap-3 pt-2">
                <button
                    onClick={handleAddField}
                    type="button" // Prevent form submission
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <span className="text-blue-600 bg-blue-100 p-1 rounded-full transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                        <PlusCircle size={24} />
                    </span>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-blue-700 transition-colors">
                        Add custom field
                    </p>
                </button>
            </div>
        </div>
    );
};

export default CustomFieldsComponent;
