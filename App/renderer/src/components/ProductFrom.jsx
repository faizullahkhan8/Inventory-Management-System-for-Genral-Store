import { Loader, Plus, PlusCircle, XCircle } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Select from "../ui/Select";
import { Card } from "../ui/Card";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import CustomFieldsComponent from "./Tables/CustomFields";
import { Label } from "../ui/Label";
import { Link } from "react-router-dom";
import { useGetAllCategories } from "../api/Hooks/category.api";
import ManageCategory from "./ProductView/ManageCategory";
import { useGetAllSuppliers } from "../api/Hooks/supplier.api";

const AddProductFrom = ({
    setProductData,
    productData,
    handler,
    setSelectedImage,
    loading,
    isEditing,
}) => {
    const [categoryData, setCategoryData] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

    // Initialize preview URL state
    const [selectedImageUrl, setSelectedImageUrl] = useState("");

    const { getAllCategories, loading: getAllCategoriesLoading } =
        useGetAllCategories();
    const { getAllSuppliers, loading: getAllSupplierLoading } =
        useGetAllSuppliers();

    // FIX 1: Sync Image Preview when productData loads (Important for Editing)
    useEffect(() => {
        if (productData?.imageUrl) {
            setSelectedImageUrl(productData.imageUrl);
        }
    }, [productData.imageUrl]);

    useEffect(() => {
        (async () => {
            const categoryResponse = await getAllCategories();
            const supplierResponse = await getAllSuppliers();

            if (categoryResponse.success) {
                setCategoryData(categoryResponse.categories);
            }

            if (supplierResponse.success) {
                setSupplierData(supplierResponse.suppliers);
            }
        })();
    }, []);

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

    useEffect(() => {
        (async () => {
            const response = await getAllCategories();
            if (response.success) {
                setCategoryData(response.categories);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen w-full p-4 transform transition-transform duration-300 overflow-y-scroll">
            {isAddCategoryOpen && (
                <ManageCategory
                    open={true}
                    onClose={() => setIsAddCategoryOpen(false)}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                />
            )}
            <div className="mb-4 relative">
                <h1 className="text-primary font-bold text-xl">
                    {isEditing ? "Edit Product" : "Add Product"}
                </h1>
                {isEditing ? (
                    <p>Edit the existing detials.</p>
                ) : (
                    <p>
                        Fill the detials to add new product to your inventory.
                    </p>
                )}
                <p>
                    <span className="text-red-500">* </span>
                    is required fields
                </p>
            </div>
            <form
                onSubmit={handler}
                className="flex flex-col gap-4 justify-center"
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
                            SKU <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="Enter product SKU..."
                            required
                            value={productData.sku}
                            name="sku"
                            id="sku"
                            autoComplete="sku"
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
                                value={productData.categoryId}
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
                    <div>
                        <label className="mb-2">
                            Supplier <span className="text-red-500">*</span>
                        </label>
                        <Select
                            id="supplier"
                            name="supplier"
                            required
                            autoComplete="supplier"
                            value={productData.supplierId}
                            onChange={(val) =>
                                handleSelectFieldValue(val, "supplier")
                            }
                            placeholder={`${
                                getAllSupplierLoading ? (
                                    <Loader
                                        size={18}
                                        className="animate-spin"
                                    />
                                ) : (
                                    "Select supplier"
                                )
                            }`}
                            options={supplierData.map((sup) => ({
                                label: sup.name,
                                value: sup._id,
                            }))}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
                    <div>
                        <label htmlFor="purchasePrice">
                            Purchased Price{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="purchasedPrice"
                            name="purchasedPrice"
                            value={productData.purchasedPrice}
                            required
                            autoComplete="purchasedPrice"
                            onChange={handleFormDataChange}
                            type="number"
                            placeholder="Enter product purchased price..."
                        />
                    </div>
                    <div>
                        <label htmlFor="sellingPrice">
                            Selling Price{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="sellingPrice"
                            name="sellingPrice"
                            value={productData.sellingPrice}
                            onChange={handleFormDataChange}
                            required
                            autoComplete="sellingPrice"
                            type="number"
                            placeholder="Enter product sellilng price..."
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">
                            Quantity <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="quantity"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleFormDataChange}
                            required
                            autoComplete="quantity"
                            type="number"
                            placeholder="Enter product quantity in stock..."
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                    <div>
                        <label htmlFor="mfgDate">Mfg Date</label>
                        <Input
                            id="mfgDate"
                            name="mfgDate"
                            value={
                                productData.mfgDate
                                    ? productData.mfgDate.split("T")[0]
                                    : ""
                            }
                            onChange={handleFormDataChange}
                            autoComplete="mfgDate"
                            type="date"
                            placeholder="Enter mfg date for the product..."
                        />
                    </div>
                    <div>
                        <label htmlFor="expDate">Expiry Date</label>
                        <Input
                            id="expDate"
                            name="expDate"
                            value={
                                productData.expDate
                                    ? productData.expDate.split("T")[0]
                                    : ""
                            }
                            onChange={handleFormDataChange}
                            autoComplete="expDate"
                            type="date"
                            placeholder="Enter mfg date for the product..."
                        />
                    </div>
                </div>
                <div className="gird grid-cols-1">
                    <div>
                        <label htmlFor="description">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <br />
                        <textarea
                            id="description"
                            value={productData.description}
                            name="description"
                            required
                            onChange={handleFormDataChange}
                            autoComplete="description"
                            type="text"
                            className="flex w-full min-w-0 h-20 rounded-md border border-input bg-input-background
    px-3 py-2 text-base md:text-sm text-foreground placeholder:text-muted-foreground
    focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
    dark:bg-input/30 transition-all duration-200"
                            placeholder="Enter the words that best describe the product..."
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                    <Card className="p-2 gap-y-1">
                        <label htmlFor="image">Image</label>
                        <Input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <ul className="text-xs list-disc pl-4 text-gray-500">
                            <li>Use a square image (1:1 ratio).</li>
                            <li>
                                Center the product with a clean and white
                                background.
                            </li>
                            <li>Minimum size: 1000 * 1000 px.</li>
                            <li>max size ≤ 5 MB JPEG format preferred.</li>
                        </ul>
                    </Card>
                    <Card className="relative p-2 gap-y-2">
                        {selectedImageUrl && (
                            <XCircle
                                onClick={handleClearImage}
                                className="absolute top-2 right-2 cursor-pointer hover:text-red-500 transition-colors duration-200 z-10"
                                size={20}
                            />
                        )}
                        <label>
                            Preview{" "}
                            <span className="italic text-sm text-gray-500">
                                {!selectedImageUrl && "(no image selected)"}
                            </span>
                        </label>
                        {!selectedImageUrl ? (
                            <div className="text-gray-400 text-sm">
                                No image selected yet!
                            </div>
                        ) : (
                            <img
                                src={selectedImageUrl}
                                alt="select image preview"
                                className="w-full h-auto max-h-48 object-contain rounded-lg"
                            />
                        )}
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
                <div className="flex items-center justify-end">
                    <div>
                        <Link to="/inventory">
                            <Button variant="danger" className="mr-2">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit">
                            {isEditing ? "Update Product" : "Add Product"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProductFrom;
