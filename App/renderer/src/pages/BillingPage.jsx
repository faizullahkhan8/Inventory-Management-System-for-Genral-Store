import { useEffect, useState } from "react";
import Header from "../components/Header";
import { CloudCog, SearchIcon, Trash2 } from "lucide-react";
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
import ManageSupplierDialog from "../components/Bill/ManageSupplierDialog";
import ViewSupplierDialog from "../components/Bill/ViewSupplierDialog";

const BillingPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [billData, setBillData] = useState([]);
    const [supplierData, setSupplierData] = useState([]);

    const [selectedSupplier, setSelectedSupplier] = useState({
        type: "",
        data: null,
    });
    const [selectedBill, setSelectedBill] = useState({
        type: "",
        data: null,
    });

    const { getAllBills, loading: getAllBillLoading } = useGetAllBills();
    const { deleteBill, loading: deleteBillLoading } = useDeleteBill();

    const { getAllSuppliers, loading: getAllSupplierLoading } =
        useGetAllSuppliers();
    const { deleteSupplier, loading: deleteSupplierLoading } =
        useDeleteSupplier();

    /* -------------------- Fetch Data -------------------- */
    useEffect(() => {
        (async () => {
            const billResponse = await getAllBills();
            const supplierResponse = await getAllSuppliers();

            if (billResponse?.bills) {
                setBillData(billResponse.bills);
            }

            if (supplierResponse?.suppliers) {
                setSupplierData(supplierResponse.suppliers);
            }
        })();
    }, []);

    /* -------------------- Handlers -------------------- */

    const handleDeleteSupplier = async () => {
        if (!selectedSupplier.data?._id) return;

        const response = await deleteSupplier(selectedSupplier.data._id);

        if (response?.success) {
            setSupplierData((prev) =>
                prev.filter((s) => s._id !== selectedSupplier.data._id)
            );
            setSelectedSupplier({ type: "", data: null });
        }
    };

    const handleDeleteBill = async () => {
        if (!selectedBill.data?._id) return;

        const response = await deleteBill(selectedBill.data._id);

        if (response?.success) {
            setBillData((prev) =>
                prev.filter((b) => b._id !== selectedBill.data._id)
            );
            setSelectedBill({ type: "", data: null });
        }
    };

    console.log(selectedSupplier)

    /* -------------------- UI -------------------- */

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <Header title="Billing" />

            {/* View Supplier */}
            {selectedSupplier?.type === "view" && (
                <ViewSupplierDialog
                    supplier={selectedSupplier.data}
                    onClose={() => setSelectedSupplier({ type: "", data: null })}
                />
            )}

            {/* Add / Edit Supplier */}
            <ManageSupplierDialog
                open={Boolean(selectedSupplier.type === "add" || selectedSupplier.type === "edit")}
                onClose={() => {
                    setSelectedSupplier({ type: "", data: null });
                }}
                supplierData={Boolean(selectedSupplier.type === "edit") && selectedSupplier.data}
                isEditing={Boolean(selectedSupplier.type === "edit")}
            />

            {/* Delete Supplier Dialog */}
            {Boolean(selectedSupplier.type === "delete") && (
                <DialogBox
                    isOpen={Boolean(selectedSupplier.type === "delete")}
                    onClose={() => {
                        setSelectedSupplier({ type: "", data: null });
                    }}
                    onConfirm={handleDeleteSupplier}
                    loading={deleteSupplierLoading}
                    title="Delete Supplier?"
                    message="This supplier will be moved to trash. You can restore it from trash."
                    confirmText="Delete Supplier"
                    variant="danger"
                    icon={Trash2}
                />
            )}

            {/* Delete Bill Dialog */}
            {Boolean(selectedBill.type === "delete") && (
                <DialogBox
                    isOpen={Boolean(selectedBill.type === "delete")}
                    onClose={() => {
                        setSelectedBill({ type: "", data: null });
                    }}
                    onConfirm={handleDeleteBill}
                    loading={deleteBillLoading}
                    title="Delete Bill?"
                    message="This bill will be moved to trash. You can restore it from trash."
                    confirmText="Delete Bill"
                    variant="danger"
                    icon={Trash2}
                />
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Bar */}
                <div className="p-4 flex justify-between gap-4 max-sm:flex-col">
                    <div className="relative w-full sm:w-80">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search bills..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex gap-3 max-sm:flex-col">
                        <DropdownWithAction
                            placeholder="Manage Suppliers"
                            data={supplierData}
                            loading={getAllSupplierLoading}
                            actions={{
                                view: true,
                                add: true,
                                edit: true,
                                delete: true,
                            }}
                            onAdd={() => {
                                setSelectedSupplier({ type: "add", data: null });
                            }}
                            onEdit={(item) => {
                                setSelectedSupplier({ type: "edit", data: item });
                            }}
                            onDelete={(item) => {
                                setSelectedSupplier({ type: "delete", data: item });
                            }}
                            onView={(item) => {
                                setSelectedSupplier({ type: "view", data: item });
                            }}
                        />

                        <Link to="/billing/add-bill">
                            <Button>Add Bill</Button>
                        </Link>
                    </div>
                </div>

                {/* Bills */}
                <BillGrid
                    bills={billData}
                    loading={getAllBillLoading}
                    setSelectedBill={setSelectedBill}
                />

                {/* View Bill */}
                {selectedBill?.type === "view" && (
                    <ViewBillDialog
                        bill={selectedBill.data}
                        onClose={() => setSelectedBill({ type: "", data: null })}
                    />
                )}
            </div>
        </div>
    );
};

export default BillingPage;
