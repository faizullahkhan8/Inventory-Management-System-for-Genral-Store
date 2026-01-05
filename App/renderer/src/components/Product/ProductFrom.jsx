import { Loader, Plus, PlusCircle, Upload, XCircle } from "lucide-react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import Select from "../../ui/Select";
import { Card } from "../../ui/Card";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import CustomFieldsComponent from "../Tables/CustomFields";
import { Label } from "../../ui/Label";
import { Link } from "react-router-dom";
import { useGetAllCategories } from "../../api/Hooks/category.api";
import ManageCategoryDialog from "./ManageCategoryDialog";

const ProductForm = ({
    setProductData,
    setProductState,
    setSelectedImage,
    productData,
    handler,
    loading,
    isEditing,
}) => {
    const [categoryData, setCategoryData] = useState([]);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

    // Initialize preview URL state
    const [selectedImageUrl, setSelectedImageUrl] = useState("");

    const { getAllCategories, loading: getAllCategoriesLoading } =
        useGetAllCategories();

    useEffect(() => {
        (async () => {
            const categoryResponse = await getAllCategories();

            if (categoryResponse.success) {
                setCategoryData(categoryResponse.categories);
            }
        })();

        if (isEditing && productData?.imageUrl) {
            setSelectedImageUrl(
                `${import.meta.env.VITE_API_URL}/${productData.imageUrl}`
            );
        } else {
            setSelectedImageUrl("");
        }
    }, [productData.imageUrl]);

    const handleFormDataChange = (e) => {
        setProductData({
            ...productData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSelectFieldValue = (val, id) => {
        setProductData({
            ...productData,
            [id]: val,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File is too large. Maximum size is 5MB.");
                e.target.value = ""; // Reset the input
                return; // Don't set the file
            }

            // Create preview URL and set both states
            const previewUrl = URL.createObjectURL(file);
            setSelectedImageUrl(previewUrl);
            setSelectedImage(file);
        }
    };

    const handleClearImage = () => {
        // Clear both the preview URL and the file
        setSelectedImageUrl("");
        setSelectedImage(null);

        // Reset the file input
        const fileInput = document.getElementById("image");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full max-h-[calc(100vh-100px)] px-2 transform transition-transform duration-300 overflow-y-auto">
            {isAddCategoryOpen && (
                <ManageCategoryDialog
                    open={true}
                    onClose={() => setIsAddCategoryOpen(false)}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                />
            )}
            <div className="mb-4 sticky top-0 bg-white border-b border-gray-200 pb-2">
                <h1 className="text-primary font-bold text-xl">
                    {isEditing ? "Edit Product" : "Add Product"}
                </h1>
                <p>
                    <span className="text-red-500">* </span>
                    is required fields
                </p>
            </div>
            <form
                onSubmit={handler}
                className="flex flex-col gap-2 justify-center"
            >
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                    <div>
                        <label htmlFor="name">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="name"
                            name="product-name"
                            value={productData.name}
                            autoComplete="product-name"
                            required
                            placeholder="Enter product name..."
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div>
                        <label className="mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2 ">
                            <Select
                                id="categoryId"
                                name="categoryId"
                                required
                                autoComplete="categoryId"
                                value={productData.categoryId || ""}
                                onChange={(val) =>
                                    handleSelectFieldValue(val, "categoryId")
                                }
                                placeholder={`${
                                    getAllCategoriesLoading ? (
                                        <Loader
                                            size={18}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        "Select category"
                                    )
                                }`}
                                options={categoryData.map((cat) => ({
                                    label: cat.name,
                                    value: cat._id,
                                }))}
                            />
                            <Button
                                type="button"
                                onClick={() => setIsAddCategoryOpen(true)}
                            >
                                <Plus />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 max-sm:grid-cols-1">
                    {/* Description */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="description"
                            className="mb-1 font-medium"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            value={productData.description}
                            name="description"
                            onChange={handleFormDataChange}
                            autoComplete="description"
                            placeholder="Describe the product clearly for customers…"
                            className="border border-gray-300 rounded-md p-2 h-18 resize-none focus:outline-none focus:ring-3 focus:ring-primary transition-all"
                        />
                    </div>

                    {/* Image Section */}
                    <Card className="p-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                        {/* Upload */}
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Product Image</label>

                            <label
                                htmlFor="image"
                                className="flex items-center justify-center gap-2 cursor-pointer
                border border-dashed border-gray-300 rounded-md
                py-4 text-sm font-medium text-gray-600
                hover:border-primary hover:text-primary transition-colors"
                            >
                                <Upload size={18} />
                                Upload Image
                            </label>

                            <Input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                                <li>Square image (1:1)</li>
                                <li>Min 1000 × 1000 px</li>
                                <li>Max 5 MB (JPEG preferred)</li>
                            </ul>
                        </div>

                        {/* Preview */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label className="font-medium">
                                    Preview
                                    {!selectedImageUrl && (
                                        <span className="italic text-sm text-gray-400 ml-1">
                                            (no image)
                                        </span>
                                    )}
                                </label>

                                {selectedImageUrl && (
                                    <XCircle
                                        onClick={handleClearImage}
                                        className="cursor-pointer hover:text-red-500 transition-colors"
                                        size={20}
                                    />
                                )}
                            </div>

                            <div className="flex items-center justify-center min-h-[180px] border border-gray-300 rounded-md">
                                {!selectedImageUrl ? (
                                    <p className="text-gray-400 text-sm">
                                        Image preview will appear here
                                    </p>
                                ) : (
                                    <img
                                        src={selectedImageUrl}
                                        alt="Product preview"
                                        className="max-h-44 object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                <div>
                    <Label>Custom Fields</Label>
                    <br />
                    <CustomFieldsComponent
                        productData={productData}
                        setProductData={setProductData}
                    />
                </div>
                <div className="flex items-center justify-end sticky bottom-0 bg-white pt-4 mt-4 border-t border-gray-200">
                    <div>
                        <Button
                            onClick={() =>
                                setProductState({ type: "", data: null })
                            }
                            variant="danger"
                            className="mr-2"
                        >
                            Cancel
                        </Button>

                        <Button type="submit">
                            {isEditing ? "Update Product" : "Add Product"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
