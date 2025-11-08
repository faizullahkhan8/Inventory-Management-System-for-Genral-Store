import { Loader, XCircle } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Select from "../ui/Select";
import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { useState } from "react";
import { toast } from "react-hot-toast";

import defaultImage from "../assets/default-image.png";
import {
    useCreateProduct,
    useUploadProductImage,
} from "../api/Hooks/product.api";

const AddProductFrom = ({ isOpen, setIsOpen }) => {
    const [selectedImageUrl, setSelectedImageUrl] = useState(defaultImage);
    const [selectedImage, setSelectedImage] = useState(null);

    const { createProduct, loading } = useCreateProduct();
    const { uploadProductImage, loading: ImageLoading } =
        useUploadProductImage();

    const [productData, setProductData] = useState({
        name: "",
        sku: "",
        description: "",
        purchasedPrice: "",
        sellingPrice: "",
        quantity: "",
        mfgDate: "",
        expDate: "",
        supplierRef: "69066452cc22a72016e30125",
        category: "",
        imageUrl: "http://localhost:3000/test-image.jpg",
        // customFields: [
        //     {
        //         fieldKey: "",
        //         fieldValue: "",
        //     },
        // ],
    });

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
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File is too large.");
            }

            setSelectedImageUrl(URL.createObjectURL(file));
            setSelectedImage(file);
        }
    };

    const handleAddProduct = async () => {
        try {
            if (!selectedImage) {
                toast.error("Please select a product image");
                return;
            }

            // First upload the image
            const productImageFormData = new FormData();
            productImageFormData.append("productImage", selectedImage);

            const imageResponse = await uploadProductImage(
                productImageFormData
            );

            if (!imageResponse || !imageResponse.fileInfo) {
                toast.error("Failed to upload image");
                return;
            }

            // Create product with the image URL
            const productWithImage = {
                ...productData,
                imageUrl: `http://localhost:3000/assets/images/product-images/${imageResponse.fileInfo.filename}`,
            };

            const productResponse = await createProduct(productWithImage);

            if (productResponse.success) {
                setSelectedImage(null);
                setSelectedImageUrl(defaultImage);
            }
        } catch (error) {
            console.error("Error in handleAddProduct:", error);
            toast.error("Failed to create product with image");
        }
    };

    return (
        <div
            className={`
    fixed top-0 right-0 h-screen w-[40vw] bg-gray-50 p-4 border-l border-gray-300 shadow-lg
    transform transition-transform duration-300 overflow-y-scroll
    ${isOpen ? "translate-x-0" : "translate-x-full"}
  `}
        >
            <div className="mb-4 relative">
                <h1 className="text-primary font-bold text-xl">Add Product</h1>
                <p>Fill the detials to add new product to your inventory.</p>
                <p>
                    <span className="text-red-500">* </span>
                    is required fields
                </p>
                <XCircle
                    onClick={() => setIsOpen(false)}
                    size={20}
                    className="absolute top-0 right-0 hover:text-red-500 cursor-pointer transform transition-colors duration-100"
                />
            </div>
            <div className="flex flex-col gap-4 justify-center">
                <div className="grid grid-cols-2 gap-2">
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
                        <Select
                            id="category"
                            name="category"
                            required
                            autoComplete="category"
                            onChange={(val) =>
                                handleSelectFieldValue(val, "category")
                            }
                            placeholder="Select category"
                            options={[
                                { label: "Apple", value: "apple" },
                                { label: "Banana", value: "banana" },
                                { label: "Orange", value: "orange" },
                            ]}
                        />
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
                            onChange={(val) =>
                                handleSelectFieldValue(val, "supplier")
                            }
                            placeholder="Select Supplier"
                            options={[
                                { label: "Apple", value: "apple" },
                                { label: "Banana", value: "banana" },
                                { label: "Orange", value: "orange" },
                            ]}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
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
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="mfgDate">Mfg Date</label>
                        <Input
                            id="mfgDate"
                            name="mfgDate"
                            value={productData.mfgDate}
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
                            value={productData.expDate}
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
                <div className="grid grid-cols-2 gap-2">
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
                            <li>max size ≤ 2 MB JPEG format preferred.</li>
                        </ul>
                    </Card>
                    <Card className="relative p-2 gap-y-2">
                        <XCircle
                            onClick={() => setSelectedImageUrl(defaultImage)}
                            className="absolute top-2 right-2 hover:text-red-500 transition-colors duration-200"
                            size={20}
                        />
                        <label>
                            Preview{" "}
                            <span className="italic text-sm text-gray-500">
                                {!selectedImage && "(default)"}
                            </span>
                        </label>
                        <img
                            src={selectedImageUrl}
                            alt="select image preview"
                            className="w-50 rounded-lg"
                        />
                    </Card>
                </div>
                <div>
                    <Link
                        to={"#"}
                        className="text-sm text-primary hover:text-shadow-primary-hover"
                    >
                        Want to add custom fields?
                    </Link>
                </div>
                <div className="flex items-center justify-end">
                    <div>
                        <Button onClick={handleAddProduct}>
                            {loading && <Loader size={20} />}
                            Add Product
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductFrom;
