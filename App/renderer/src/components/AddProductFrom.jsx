import { XCircle } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Select from "../ui/Select";
import { Link } from "react-router-dom";

const AddProductFrom = ({ isOpen, setIsOpen }) => {
    return (
        <div
            className={`
    fixed top-0 right-0 h-screen w-[40vw] bg-gray-50 p-4 border-l border-gray-300 shadow-lg
    transform transition-transform duration-300
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
                        <Input id="name" placeholder="Enter product name..." />
                    </div>
                    <div>
                        <label className="mb-2">
                            SKU <span className="text-red-500">*</span>
                        </label>
                        <Input placeholder="Enter product SKU..." />
                    </div>
                    <div>
                        <label className="mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <Select
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
                            id="purchasePrice"
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
                            type="number"
                            placeholder="Enter product quantity in stock..."
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
                    <Link
                        to={"#"}
                        className="text-sm text-primary hover:text-shadow-primary-hover"
                    >
                        Want to add custom fields?
                    </Link>
                </div>
                <div className="flex items-center justify-end">
                    <div>
                        <Button>Add Product</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductFrom;
