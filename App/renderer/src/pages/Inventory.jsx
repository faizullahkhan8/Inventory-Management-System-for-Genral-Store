import { Plus, SearchIcon, Trash2 } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import Select from "../ui/Select";
import { Input } from "../ui/Input";
import { useEffect, useState } from "react";
import ProductTable from "../components/Tables/ProductTable";
import { getProductColumns } from "../components/Tables/ProductColumns";
import {
    useDeleteProduct,
    useGetAllProductsForTable,
} from "../api/Hooks/product.api";
import { Link } from "react-router-dom";
import DialogBox from "../components/DialogBox";
import CategoriesDropdown from "../components/ProductView/CategoriesDropdown";
import { useGetAllCategories } from "../api/Hooks/category.api";

const Inventory = () => {
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [deletingProductId, setDeletingProductId] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { loading: getAllProductForTableLoading, getAllProductsForTable } =
        useGetAllProductsForTable();
    const { deleteProduct, loading: deleteLoading } = useDeleteProduct();
    const { getAllCategories, loading: getAllCategoriesLoading } =
        useGetAllCategories();

    useEffect(() => {
        (async () => {
            const productResponse = await getAllProductsForTable();
            const categoryResponse = await getAllCategories();
            if (productResponse) {
                setProductData(productResponse.Products);
            }
            if (categoryData) {
                setCategoryData(categoryResponse.categories);
            }
        })();
    }, []);

    const ProductColumns = getProductColumns({
        products: productData,
        setDeletingProductId,
        setIsDialogOpen,
    });

    const onConfirmDelete = async () => {
        const data = await deleteProduct(deletingProductId);
        if (data?.success) {
            setProductData((prevData) =>
                prevData.filter((product) => product._id !== deletingProductId)
            );
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Inventory"} />
            <DialogBox
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)} // Maps to the 'onClose' prop of the reusable component
                onConfirm={onConfirmDelete}
                loading={deleteLoading}
                // Soft Delete Specifics:
                title="Move to Trash?"
                message="This item will be moved to the trash bin. You can restore it later if you change your mind."
                confirmText="Move to Trash"
                variant="danger" // Keeps the red styling, but you could use 'warning' if preferred
                icon={Trash2} // Overrides the default alert triangle with a Trash icon
            />
            <div className="flex-1 p-2 sm:p-4 overflow-y-scroll flex flex-col">
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
                            onChange={setSearchQuery}
                            options={[
                                { label: " (Reset)" },
                                { label: "Banana", value: "banana" },
                                { label: "Orange", value: "orange" },
                                { label: "Orange", value: "orange" },
                            ]}
                        />
                    </div>

                    {/* Button Section */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
                        <Link
                            to={`/inventory/add-product?prevRoute=${document.location.pathname}`}
                        >
                            <Button className="w-full sm:w-auto">
                                Add Product
                            </Button>
                        </Link>
                        <Button className="w-full sm:w-auto">
                            Add Multiple Product
                        </Button>
                        <div className="flex items-center justify-between gap-2 w-full">
                            <CategoriesDropdown
                                categories={categoryData}
                                loading={getAllCategoriesLoading}
                            />
                            <Button>
                                <Plus size={18} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-hidden">
                    <ProductTable
                        columns={ProductColumns}
                        data={productData}
                        loading={getAllProductForTableLoading}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>
        </div>
    );
};

export default Inventory;
