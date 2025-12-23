import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
    DollarSign,
    Loader,
    Mail,
    MapPin,
    Phone,
    PlusCircle,
    SearchIcon,
    Trash2,
    User,
} from "lucide-react";

// Components
import Header from "../components/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card"; // Assuming you have these UI components
import Stat from "../ui/Stat";
import ProductTable from "../components/Tables/ProductTable";
import { Input } from "../ui/Input";
import DialogBox from "../components/DialogBox";

// Dialogs
import ViewPaymentDialog from "../components/Suppliers/ViewPaymentDialog";
import AddPaymentDialog from "../components/Suppliers/AddPaymentDialog";

// Logic
import {
    useDeleteSupplierPayment,
    useGetSupplier,
} from "../api/Hooks/supplier.api";
import { getSupplierPaymentAndPurchaseColumns } from "../components/Suppliers/SupplierPaymentAndPurchaseColumns";

const ViewSupplierPage = () => {
    const { id: supplierId } = useParams();

    const { getSupplier, loading: getSupplierLoading } = useGetSupplier();
    const { deleteSupplierPayment, loading: deleteSupplierPaymentLoading } =
        useDeleteSupplierPayment();

    const [supplierData, setSupplierData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [dialogState, setDialogState] = useState({
        type: null, // 'ADD' | 'EDIT' | 'VIEW' | 'DELETE' | null
        data: null,
    });

    // Fetch Data
    useEffect(() => {
        if (!supplierId) return;
        getSupplier(supplierId).then((res) => {
            if (res?.success) setSupplierData(res.supplier);
        });
    }, [supplierId]);

    // Handlers
    const handleCloseDialog = () => setDialogState({ type: null, data: null });

    // These handlers are passed to the Columns file
    const handleView = (payment) =>
        setDialogState({ type: "VIEW", data: payment });
    const handleEdit = (payment) =>
        setDialogState({ type: "EDIT", data: payment });

    const handleDelete = (paymentId) =>
        setDialogState({
            type: "DELETE",
            data: { supplierId: supplierData?._id, paymentId },
        });
    const handleAdd = () => setDialogState({ type: "ADD", data: null });

    // Memoize columns to prevent re-calculations on every render
    const columns = useMemo(
        () =>
            getSupplierPaymentAndPurchaseColumns({
                onView: handleView,
                onEdit: handleEdit,
                onDelete: handleDelete,
            }),
        []
    );

    const onConfirmDelete = async () => {
        if (dialogState.type === "DELETE" && dialogState.data) {
            const response = await deleteSupplierPayment({
                supplierId: dialogState.data.supplierId,
                paymentId: dialogState.data.paymentId,
            });

            if (response.success) {
                setSupplierData(response.supplier);
                handleCloseDialog();
            }
        }
    };

    if (getSupplierLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title="View Supplier" />

            {/* Render Add/Edit Dialog Conditionally */}
            {/* This ensures the form resets completely when closed */}
            {(dialogState.type === "ADD" || dialogState.type === "EDIT") && (
                <AddPaymentDialog
                    open={true}
                    onClose={handleCloseDialog}
                    supplierId={supplierId}
                    setSupplierData={setSupplierData}
                    existingPayment={dialogState.data}
                    isEditing={dialogState.type === "EDIT"}
                />
            )}

            {dialogState.type === "DELETE" && (
                <DialogBox
                    isOpen={dialogState.type === "DELETE"}
                    onClose={handleCloseDialog}
                    onConfirm={onConfirmDelete}
                    loading={deleteSupplierPaymentLoading}
                    title="Delete permanently?"
                    message="This item cannot be restored once you delete it."
                    confirmText="Delete Permanently"
                    variant="danger"
                    icon={Trash2}
                />
            )}

            {/* View Dialog */}
            <ViewPaymentDialog
                open={dialogState.type === "VIEW"}
                onClose={handleCloseDialog}
                payment={dialogState.data}
            />

            <div className="flex flex-col gap-2 overflow-y-scroll p-2">
                {" "}
                <Card className="flex p-4 justify-between">
                    {" "}
                    <div className="">
                        {" "}
                        <div className="flex gap-2 items-center">
                            {" "}
                            <User />{" "}
                            <h2 className="text-xl">
                                {supplierData?.name}
                            </h2>{" "}
                        </div>{" "}
                        <p className="text-sm text-gray-500 ml-1">
                            {" "}
                            {supplierData?.company}{" "}
                        </p>{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <span className="rounded-full! text-xs px-4 py-1 bg-primary text-white font-semibold">
                            {" "}
                            Active{" "}
                        </span>{" "}
                    </div>{" "}
                </Card>{" "}
                <Card className="flex p-4 gap-4 justify-between max-sm:flex-wrap">
                    {" "}
                    <div className="relative">
                        {" "}
                        <div className="absolute -left-2 bg-primary/80 w-[3px] h-full rounded" />{" "}
                        <div className="flex gap-2">
                            {" "}
                            <Phone size={14} className="text-gray-500" />{" "}
                            <p className="text-xs text-gray-500">Phone</p>{" "}
                        </div>{" "}
                        <h3 className="text-lg">
                            {" "}
                            {supplierData?.contacts[0].number}{" "}
                        </h3>{" "}
                    </div>{" "}
                    <div className="relative">
                        {" "}
                        <div className="absolute -left-2 bg-primary/80 w-[3px] h-full rounded" />{" "}
                        <div className="flex gap-2">
                            {" "}
                            <Mail size={14} className="text-gray-500" />{" "}
                            <p className="text-xs text-gray-500">E-Mail</p>{" "}
                        </div>{" "}
                        <h3 className="text-lg">{supplierData?.email}</h3>{" "}
                    </div>{" "}
                    <div className="relative">
                        {" "}
                        <div className="absolute -left-2 bg-primary/80 w-[3px] h-full rounded" />{" "}
                        <div className="flex gap-2">
                            {" "}
                            <MapPin size={14} className="text-gray-500" />{" "}
                            <p className="text-xs text-gray-500">Address</p>{" "}
                        </div>{" "}
                        <h3 className="text-lg">{supplierData?.address}</h3>{" "}
                    </div>{" "}
                </Card>{" "}
                <div className="flex gap-4 justify-between max-sm:flex-wrap">
                    {" "}
                    <Stat
                        icon={DollarSign}
                        subText={"Total Purchase"}
                        mainText={supplierData?.totalAmount}
                    />{" "}
                    <Stat
                        icon={DollarSign}
                        subText={"Total Paid"}
                        mainText={supplierData?.paidAmount}
                        color="yellow"
                    />{" "}
                    <Stat
                        icon={DollarSign}
                        subText={"Pending"}
                        mainText={supplierData?.remainingAmount}
                        color="rose"
                    />{" "}
                </div>
                {/* Table Section */}
                <div className="flex flex-col p-4 gap-4">
                    <div className="flex justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Payment & Purchase History
                            </h2>
                            <p className="text-xs text-gray-500">
                                Full details of transactions
                            </p>
                        </div>
                        <Button onClick={handleAdd}>
                            <PlusCircle size={18} />
                            <span className="text-xs">Add Transaction</span>
                        </Button>
                    </div>

                    <div className="relative w-full sm:w-auto">
                        <SearchIcon
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            placeholder="Search history..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <ProductTable
                        data={supplierData?.paymentSnapshots || []}
                        columns={columns}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewSupplierPage;
