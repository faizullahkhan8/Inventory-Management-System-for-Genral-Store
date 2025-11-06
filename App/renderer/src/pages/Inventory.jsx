import { SearchIcon } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import Select from "../ui/Select";
import { Input } from "../ui/Input";

import AddProductFrom from "../components/AddProductFrom";
import { useState } from "react";

const Inventory = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative w-full max-h-screen">
            <Header title={"Inventory"} />
            <AddProductFrom isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="p-4">
                {/* top */}
                <div className="flex items-center justify-between ">
                    <div>
                        <div className="flex items-center justify-center gap-2">
                            <div className="relative">
                                <SearchIcon className="absolute left-[18px] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-400" />

                                <Input
                                    type="text"
                                    placeholder="Search for produt."
                                    className="pl-10"
                                />
                            </div>
                            <Select
                                placeholder="Search by category"
                                options={[
                                    { label: "Apple", value: "apple" },
                                    { label: "Banana", value: "banana" },
                                    { label: "Orange", value: "orange" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Button onClick={() => setIsOpen(true)}>
                            Add Product
                        </Button>
                        <Button>Add Multiple Product</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
