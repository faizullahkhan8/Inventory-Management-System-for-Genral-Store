import { SearchIcon, Trash2 } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import Select from "../ui/Select";
import { Input } from "../ui/Input";
import { useEffect, useState } from "react";
import ProductTable from "../components/Tables/ProductTable";
import { getProductColumns } from "../components/Tables/ProductColumns";
import { useDeleteProduct, useGetAllProducts } from "../api/Hooks/product.api";
import DialogBox from "../components/DialogBox";
import DropdownWithAction from "../components/DropdownWithAction";
import {
    useDeleteCategory,
    useGetAllCategories,
} from "../api/Hooks/category.api";
import ManageCategoryDialog from "../components/Product/ManageCategoryDialog";
import ManageProductDialog from "../components/Product/ManageProductDialog";

const Inventory = () => {
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // --------------- State for Product Dialogs ---------------
    const [productState, setProductState] = useState({
        type: "",
        data: null,
    });

    // --------------- State for Category Dialogs ---------------
    const [categoryState, setCategoryState] = useState({
        type: "",
        data: null,
    });

    // --------------- API HOOKS ---------------
    const { loading: getAllProductForTableLoading, getAllProducts } =
        useGetAllProducts();

    const { deleteProduct, loading: deleteLoading } = useDeleteProduct();

    const { getAllCategories, loading: getAllCategoriesLoading } =
        useGetAllCategories();

    const { deleteCategory, loading: deleteCategoryLoading } =
        useDeleteCategory();

    // --------------- Fetch Data ---------------
    useEffect(() => {
        (async () => {
            const productResponse = await getAllProducts();
            const categoryResponse = await getAllCategories();

            if (productResponse) {
                setProductData(productResponse.Products);
            }

            if (categoryResponse) {
                setCategoryData(categoryResponse.categories);
            }
        })();
    }, []);

    const ProductColumns = getProductColumns({
        products: productData,
        setProductState,
    });

    const onConfirmDeleteProduct = async () => {
        if (productState.type !== "delete" || !productState.data?._id) return;

        const data = await deleteProduct(productState.data._id);
        if (data?.success) {
            setProductData((prevData) =>
                prevData.filter(
                    (product) => product._id !== productState.data._id
                )
            );
            setProductState({ type: "", data: null });
        }
    };

    const onDeleteCategoryConfirm = async () => {
        if (categoryState.type === "delete" && categoryState.data?._id) {
            const response = await deleteCategory(categoryState.data?._id);

            if (response.success) {
                const tempCategories = categoryData.filter(
                    (item) => item._id.toString() !== categoryState.data._id
                );

                setCategoryData(tempCategories);
                setCategoryState({ type: "", data: null });
            }
        }
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Inventory"} />

            {/* -------- PRODUCT DIALOGS ---------- */}

            {productState.type === "add" && (
                <ManageProductDialog
                    open={Boolean(productState.type === "add")}
                    onClose={() => setProductState({ type: "", data: null })}
                    setProductData={setProductData}
                    setProductState={setProductState}
                />
            )}

            {productState.type === "edit" && (
                <ManageProductDialog
                    open={Boolean(productState.type === "edit")}
                    onClose={() => setProductState({ type: "", data: null })}
                    isEditing={true}
                    setProductData={setProductData}
                    selectedProduct={productState.data}
                    setProductState={setProductState}
                />
            )}

            {productState.type === "delete" && (
                <DialogBox
                    isOpen={Boolean(productState.type === "delete")}
                    onClose={() => setProductState({ type: "", data: null })}
                    onConfirm={onConfirmDeleteProduct}
                    loading={deleteLoading}
                    title="Move to Trash?"
                    message="This item will be moved to the trash bin. You can restore it later if you change your mind."
                    confirmText="Move to Trash"
                    variant="danger"
                    icon={Trash2}
                />
            )}

            {/* -------- CATEGORY DIALOGS ---------- */}

            {categoryState.type === "add" && (
                <ManageCategoryDialog
                    open={true}
                    onClose={() => setCategoryState({ type: "", data: null })}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                />
            )}
            {categoryState.type === "edit" && (
                <ManageCategoryDialog
                    open={true}
                    onClose={() => {
                        setCategoryState({ type: "", data: null });
                    }}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                    isEditing={true}
                    selectedCategory={categoryState.data}
                />
            )}

            {categoryState.type === "delete" && (
                <DialogBox
                    isOpen={Boolean(categoryState.type === "delete")}
                    onClose={() => {
                        setCategoryState({ type: "", data: null });
                    }}
                    onConfirm={onDeleteCategoryConfirm}
                    loading={deleteCategoryLoading}
                    title="Move to Trash?"
                    message="This item will be moved to the trash bin. You can restore it later if you change your mind."
                    confirmText="Move to Trash"
                    variant="danger"
                    icon={Trash2}
                />
            )}

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

                    </div>

                    {/* Button Section */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
                        <DropdownWithAction
                            data={categoryData}
                            placeholder="Manage Categories"
                            loading={getAllCategoriesLoading}
                            onEdit={(cat) =>
                                setCategoryState({ type: "edit", data: cat })
                            }
                            onDelete={(cat) =>
                                setCategoryState({ type: "delete", data: cat })
                            }
                            onAdd={() =>
                                setCategoryState({ type: "add", data: null })
                            }
                            actions={{
                                edit: true,
                                delete: true,
                                add: true,
                            }}
                        />
                        <Button
                            onClick={() => setProductState({ type: "add" })}
                            className="w-full sm:w-auto"
                        >
                            Add Product
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-hidden flex flex-col">
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
