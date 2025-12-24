import { Grid, List, Plus, SearchIcon, Trash2, Users } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import ProductTable from "../components/Tables/ProductTable";
import { getSupplierColumns } from "../components/Suppliers/SupplierColumns";
import { Link } from "react-router-dom";
import {
    useDeleteSupplier,
    useGetAllSuppliers,
} from "../api/Hooks/supplier.api";
import DialogBox from "../components/DialogBox";
import DataGrid from "../components/Suppliers/SupplierGridView";

const SupplierPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suppliersData, setSuppliersData] = useState([]);
    const [actionedId, setActionedId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [supplierView, setSupplierView] = useState("list");

    const supplierColumns = getSupplierColumns({
        setActionedId,
        setIsDeleteDialogOpen,
    });

    const { getAllSuppliers, loading: getAllSupplierLoading } =
        useGetAllSuppliers();
    const { deleteSupplier, loading: deleteSupplierLoading } =
        useDeleteSupplier();

    useEffect(() => {
        (async () => {
            const data = await getAllSuppliers();
            setSuppliersData(data.suppliers);
        })();
    }, []);

    const onConfirmDelete = async () => {
        const response = await deleteSupplier(actionedId);

        if (response.success) {
            const updatedSuppliers = suppliersData.filter(
                (item) => item._id !== actionedId
            );

            setSuppliersData(updatedSuppliers);

            setActionedId(null);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Suppliers"} />
            <DialogBox
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={onConfirmDelete}
                loading={deleteSupplierLoading}
                title="Move to Trash?"
                message="This item will be moved to the trash bin. You can restore it later if you change your mind."
                confirmText="Move to Trash"
                variant="danger"
                icon={Trash2}
            />
            <div className="w-full flex-1 overflow-y-scroll p-4 flex flex-col gap-4">
                <div className="w-full flex items-center justify-between gap-2 max-sm:flex-col p-4">
                    {/* left */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-2xl flex gap-2 items-center">
                            <Users size={25} />
                            Suppliers Managment
                        </h2>
                        <p>Manage supplier records and puchase history</p>
                    </div>
                    {/* right */}
                    <div>
                        <Link
                            to={"/suppliers/add-supplier?prevRoute=/suppliers"}
                        >
                            <Button>
                                <Plus />
                                <span>Add New Supplier</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center max-sm:flex-col justify-between gap-2 w-full lg:w-auto">
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
                    <div className="w-max flex items-center justify-center border rounded-full overflow-hidden">
                        <List
                            size={18}
                            onClick={() => setSupplierView("list")}
                            className={`${
                                supplierView === "list" &&
                                "bg-primary text-white"
                            } w-10 h-7 px-2 py-1 transition-colors duration-300`}
                        />
                        <Grid
                            size={18}
                            onClick={() => setSupplierView("grid")}
                            className={`${
                                supplierView === "grid" &&
                                "bg-primary text-white"
                            } w-10 h-7 px-2 py-1 transition-colors duration-300`}
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    {supplierView === "list" && (
                        <ProductTable
                            columns={supplierColumns}
                            data={suppliersData}
                            loading={getAllSupplierLoading}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    )}

                    {supplierView === "grid" && (
                        <DataGrid suppliers={suppliersData} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupplierPage;
