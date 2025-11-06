import { XCircle } from "lucide-react";
import { Input } from "../ui/Input";
import Select from "../ui/Select";

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
            </div>
        </div>
    );
};

export default AddProductFrom;
