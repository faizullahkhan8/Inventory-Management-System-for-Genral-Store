import { SearchIcon } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import Select from "../ui/Select";
import { Input } from "../ui/Input";
import AddProductFrom from "../components/AddProductFrom";
import { useEffect, useState } from "react";
import ProductTable from "../components/Tables/ProductTable";
import { Columns } from "../components/Tables/ProductColumns";
import { useGetAllProductsForTable } from "../api/Hooks/product.api";

const Inventory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productData, setProductData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { loading, getAllProductsForTable } = useGetAllProductsForTable();

    useEffect(() => {
        (async () => {
            const response = await getAllProductsForTable();
            if (response) {
                setProductData(response.Products);
            }
        })();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Inventory"} />
            <AddProductFrom isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 p-2 sm:p-4 overflow-hidden flex flex-col">
                {/* top */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-4">
                    {/* Search Section */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
                        <div className="relative w-full sm:w-auto">
                            <SearchIcon className="absolute left-[18px] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search for product."
                                className="pl-10 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select
                            placeholder="Search by category"
                            className="w-full sm:w-auto"
                            onChange={setSearchQuery}
                            options={[
                                { label: "Apple", value: "apple" },
                                { label: "Banana", value: "banana" },
                                { label: "Orange", value: "orange" },
                            ]}
                        />
                    </div>

                    {/* Button Section */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="w-full sm:w-auto"
                        >
                            Add Product
                        </Button>
                        <Button className="w-full sm:w-auto">
                            Add Multiple Product
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-hidden">
                    <ProductTable
                        columns={Columns}
                        data={productData}
                        loading={loading}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>
        </div>
    );
};

export default Inventory;
