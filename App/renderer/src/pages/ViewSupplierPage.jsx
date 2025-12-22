import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader, PlusCircle, SearchIcon } from "lucide-react";

// Components
import Header from "../components/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card"; // Assuming you have these UI components
import Stat from "../ui/Stat";
import ProductTable from "../components/Tables/ProductTable";
import { Input } from "../ui/Input";

// Dialogs
import ViewPaymentDialog from "../components/Suppliers/ViewPaymentDialog";
import AddPaymentDialog from "../components/Suppliers/AddPaymentDialog";

// Logic
import { useGetSupplier } from "../api/Hooks/supplier.api";
import { getSupplierPaymentAndPurchaseColumns } from "../components/Suppliers/SupplierPaymentAndPurchaseColumns";

const ViewSupplierPage = () => {
    const { id: supplierId } = useParams();
    const { getSupplier, loading: getSupplierLoading } = useGetSupplier();

    const [supplierData, setSupplierData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Best Practice: Unified Dialog State
    // Avoids separate booleans like isAddOpen, isEditOpen, isViewOpen
    const [dialogState, setDialogState] = useState({
        type: null, // 'ADD' | 'EDIT' | 'VIEW' | null
        data: null, // The payment object being acted upon
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
    const handleAdd = () => setDialogState({ type: "ADD", data: null });

    // Memoize columns to prevent re-calculations on every render
    const columns = useMemo(
        () =>
            getSupplierPaymentAndPurchaseColumns({
                onView: handleView,
                onEdit: handleEdit,
            }),
        []
    );

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

            {/* View Dialog */}
            <ViewPaymentDialog
                open={dialogState.type === "VIEW"}
                onClose={handleCloseDialog}
                payment={dialogState.data}
            />

            <div className="flex flex-col gap-2 overflow-y-scroll p-2">
                {/* ... (Your Top Cards/Stats Code remains the same) ... */}

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
