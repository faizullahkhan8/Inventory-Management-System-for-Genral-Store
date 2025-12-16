import { Plus, SearchIcon, Trash, Trash2, Users } from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import { useMemo, useState } from "react";
import Select from "../ui/Select";
import { Input } from "../ui/Input";
import ProductTable from "../components/Tables/ProductTable";
import { getSupplierColumns } from "../components/Suppliers/SupplierColumns";
import { Link } from "react-router-dom";
import { useGetAllSuppliers } from "../api/Hooks/supplier.api";
import DialogBox from "../components/DialogBox";

const SupplierPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suppliersData, setSuppliersData] = useState([]);
    const [actionedId, setActionedId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const supplierColumns = getSupplierColumns({
        setActionedId,
        setIsDeleteDialogOpen,
    });

    const { getAllSuppliers, loading: getAllSupplierLoading } =
        useGetAllSuppliers();

    useMemo(() => {
        (async () => {
            const data = await getAllSuppliers();
            setSuppliersData(data.suppliers);
        })();
    }, []);

    const onConfirmDelete = () => {
        console.log("supplier moved to trash", actionedId);
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Suppliers"} />
            <DialogBox
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={onConfirmDelete}
                loading={false}
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
                        className="w-60!"
                        options={[
                            { label: " (Reset)" },
                            { label: "Banana", value: "banana" },
                            { label: "Orange", value: "orange" },
                        ]}
                    />
                </div>
                <div>
                    <ProductTable
                        columns={supplierColumns}
                        data={suppliersData}
                        loading={getAllSupplierLoading}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>
        </div>
    );
};

export default SupplierPage;
