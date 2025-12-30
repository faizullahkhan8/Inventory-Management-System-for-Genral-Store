import { useEffect, useState } from "react";
import Header from "../components/Header";
import { SearchIcon, Trash2 } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import BillGrid from "../components/Bill/BillGrid";
import { useDeleteBill, useGetAllBills } from "../api/Hooks/bill.api";
import ViewBillDialog from "../components/Bill/ViewBillDialog";
import DialogBox from "../components/DialogBox";
import DropdownWithAction from "../components/DropdownWithAction";
import {
    useDeleteSupplier,
    useGetAllSuppliers,
} from "../api/Hooks/supplier.api";

const BillingPage = () => {
    const [searchQuery, setSearchQuery] = useState();
    const [billData, setBillData] = useState([]);
    const [supplierData, setSupplierData] = useState([]);
    const [isSupplierDeleteDialogOpen, setIsSupplierDeleteDialogOpen] =
        useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState({
        type: null,
        data: null,
    });
    const [selectedBill, setSelectedBill] = useState({
        type: null,
        data: null,
    });
    const [isBillDeleteDialogOpen, setIsBillDeleteDialogOpen] = useState(false);
    const { getAllBills, loading: getAllBillLoading } = useGetAllBills();

    // const { updateSupplier, loading: updateSupplierLoading } =
    //     useUpdateSupplier();

    const { deleteSupplier, loading: deleteSupplierLoading } =
        useDeleteSupplier();

    const { deleteBill, loading: deleteBillLoading } = useDeleteBill();

    const { getAllSuppliers, loading: getAllSupplierLoading } =
        useGetAllSuppliers();

    useEffect(() => {
        (async () => {
            const billResponse = await getAllBills();
            const supplierResponse = await getAllSuppliers();

            if (billResponse.bills) {
                setBillData(billResponse.bills);
            }

            if (supplierResponse.suppliers) {
                setSupplierData(supplierResponse.suppliers);
            }
        })();
    }, []);

    const handleDeleteSupplier = async () => {
        const response = await deleteSupplier(selectedSupplier.data._id);

        if (response.success) {
            const updatedSuppliers = supplierData.filter(
                (item) => item._id !== selectedSupplier.data._id
            );

            setSupplierData(updatedSuppliers);

            setSelectedSupplier(null);
            setIsSupplierDeleteDialogOpen(false);
        }
    };

    const handleDeleteBill = async () => {
        if (
            selectedBill.type === "delete" &&
            selectedBill.data &&
            selectedBill.data._id
        ) {
            const response = await deleteBill(selectedBill.data._id);

            if (response && response.success && !deleteBillLoading) {
                setBillData((prevBills) =>
                    prevBills.filter(
                        (bill) => bill._id !== selectedBill.data._id
                    )
                );
                setIsBillDeleteDialogOpen(false);
                setSelectedBill(null);
            }
        }
    };

    return (
        <div className="w-full h-screen flex flex-col overflow-y-hidden">
            <Header title={"Billing"} />

            {isSupplierDeleteDialogOpen &&
                selectedSupplier?.type === "delete" && (
                    <DialogBox
                        isOpen={isSupplierDeleteDialogOpen}
                        onClose={() => {
                            setIsSupplierDeleteDialogOpen(false);
                            setSelectedSupplier(null);
                        }}
                        onConfirm={handleDeleteSupplier}
                        loading={deleteSupplierLoading}
                        title="Delete Supplier?"
                        message="This item will be moved to the trash bin. You can restore it later if you change your mind."
                        confirmText="Delete Supplier"
                        variant="danger"
                        icon={Trash2}
                    />
                )}

            {isBillDeleteDialogOpen && selectedBill?.type === "delete" && (
                <DialogBox
                    isOpen={isBillDeleteDialogOpen}
                    onClose={() => {
                        setIsBillDeleteDialogOpen(false);
                        setSelectedBill(null);
                    }}
                    onConfirm={handleDeleteBill}
                    loading={false}
                    title="Move to Trash?"
                    message="This item will be moved to the trash bin. You can restore it later if you change your mind."
                    confirmText="Move to Trash"
                    variant="danger"
                    icon={Trash2}
                />
            )}
            <div className="flex-1 flex flex-col overflow-y-scroll">
                <div className="p-4 flex justify-between gap-4 max-sm:flex-col">
                    <div className="relative w-full sm:w-auto">
                        <SearchIcon className="absolute left-[18px] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search for bill..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 max-sm:flex-col">
                        <DropdownWithAction
                            actions={{
                                add: true,
                                view: true,
                                delete: true,
                                edit: true,
                            }}
                            placeholder="Manage Suppliers"
                            data={supplierData}
                            loading={getAllSupplierLoading}
                            onDelete={(item) => {
                                setSelectedSupplier({
                                    type: "delete",
                                    data: item,
                                });
                                setIsSupplierDeleteDialogOpen(true);
                            }}
                            onAdd={() => {}}
                        />
                        <Link to={"/billing/add-bill"}>
                            <Button className="max-sm:w-full">Add Bill</Button>
                        </Link>
                    </div>
                </div>

                <BillGrid
                    bills={billData}
                    loading={getAllBillLoading}
                    setSelectedBill={setSelectedBill}
                    setIsDeleteDialogOpen={setIsBillDeleteDialogOpen}
                />

                {selectedBill && (
                    <ViewBillDialog
                        bill={
                            selectedBill.type === "view"
                                ? selectedBill.data
                                : null
                        }
                        onClose={() => setSelectedBill(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default BillingPage;
