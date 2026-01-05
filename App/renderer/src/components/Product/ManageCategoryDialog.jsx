import { useState } from "react";
import { X } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import Select from "../../ui/Select";
import { Input } from "../../ui/Input";
import {
    useAddCategory,
    useUpdateCategory,
} from "../../api/Hooks/category.api";

const ManageCategoryDialog = ({
    open,
    onClose,
    categoryData,
    setCategoryData,
    isEditing,
    selectedCategory,
}) => {
    const [formData, setFormData] = useState({
        name: isEditing ? selectedCategory.name : "",
        parentId: isEditing ? selectedCategory?.parentId : null,
        status: isEditing ? selectedCategory.status : true,
    });

    const { addCategory, loading: addCategoryLoading } = useAddCategory();
    const { updateCategory, loading: updateCategoryLoading } =
        useUpdateCategory();

    // 2. Handle Input Changes
    const handleChange = (field, value) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };
            return newData;
        });
    };

    const handleAddCategory = async () => {
        if (formData.name) {
            const response = await addCategory(formData);

            if (response.success) {
                setCategoryData((pre) => [...pre, response.category]);
                setFormData({ name: "", parentId: "", status: true });

                onClose();
            }
        }
    };

    const handleUpdateCategory = async () => {
        if (isEditing) {
            const response = await updateCategory(
                selectedCategory._id,
                formData
            );
            if (response) {
                setCategoryData((pre) => [...pre, response.category]);
                setFormData({ name: "", parentId: "", status: true });
                onClose();
            }
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => {
                    setFormData({ name: "", parentId: "", status: true });

                    onClose();
                }}
            />

            {/* Dialog */}
            <Card className="bg-white relative w-[95%] max-w-md p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEditing ? "Edit Category" : "Add Category"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input
                            type="name"
                            placeholder="e.g - Electronics"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-1 flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700">
                                Parent Category (optional)
                            </label>
                            <Select
                                placeholder={"Select parent category"}
                                value={formData.parentId}
                                onChange={(val) =>
                                    handleChange("parentId", val)
                                }
                                options={categoryData.map((cat) => ({
                                    label: cat.name,
                                    value: cat._id,
                                }))}
                            />
                        </div>
                        <div className="space-y-1 flex flex-col justify-center">
                            <label className="text-sm font-medium text-gray-700">
                                Active (default: true)
                            </label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={formData.status}
                                    onChange={(e) =>
                                        handleChange("status", e.target.checked)
                                    }
                                />
                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-300"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setFormData({
                                name: "",
                                parentId: "",
                                status: true,
                            });
                            onClose();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={
                            isEditing ? handleUpdateCategory : handleAddCategory
                        }
                        disabled={
                            isEditing
                                ? updateCategoryLoading
                                : addCategoryLoading
                        }
                    >
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ManageCategoryDialog;
