import {
    BoxesIcon,
    CircleQuestionMark,
    Clipboard,
    Package,
    RefreshCcw,
    SearchIcon,
    Trash,
    Truck,
    Users,
} from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import Stat from "../ui/Stat";
import { Card } from "../ui/Card";
import ProductTable from "../components/Tables/ProductTable";
import { useMemo, useState } from "react";
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import {
    useDeleteOneItem,
    useGetAllTrashedItems,
    useRestoreOneItem,
} from "../api/Hooks/trash.api";
import { getTrashedTableColumns } from "../components/Trash/TrashTableColumns";
import DialogBox from "../components/DialogBox";

const TrashPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [trashedItems, setTrashedItems] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [actionedItemId, setActionedItemId] = useState(null);
    const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

    const TrashTableColumns = getTrashedTableColumns({
        setActionedItemId,
        setIsDeleteDialogOpen,
        setIsRestoreDialogOpen,
    });

    const { getAllTrashedItems, loading: trashLoading } =
        useGetAllTrashedItems();

    const { restoreOneItem, loading: restoreLoading } = useRestoreOneItem();
    const { deleteOneItem, loading: deleteLoading } = useDeleteOneItem();

    useMemo(() => {
        const fetchTrashedItems = async () => {
            const data = await getAllTrashedItems();
            setTrashedItems(data.trashedItems);
        };
        fetchTrashedItems();
    }, []);

    const onConfirmDelete = async () => {
        if (!actionedItemId) return;

        const data = await deleteOneItem(actionedItemId);

        if (data) {
            setTrashedItems((prevItems) =>
                prevItems.filter((item) => item.id !== actionedItemId)
            );
            setIsDeleteDialogOpen(false);
        }

        setActionedItemId(null);
    };

    const onConfirmRestore = async () => {
        if (!actionedItemId) return;
        const data = await restoreOneItem(actionedItemId);
        if (data) {
            setTrashedItems((prevItems) =>
                prevItems.filter((item) => item.id !== actionedItemId)
            );
            setIsRestoreDialogOpen(false);
        }
        setActionedItemId(null);
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"Trash"} />
            <DialogBox
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={onConfirmDelete}
                loading={deleteLoading}
                // Permanent Delete Specifics:
                title="Permanently Delete?"
                message="This action cannot be undone. This item will be permanently removed from your account and servers."
                confirmText="Delete Forever"
                variant="danger"
            />
            <DialogBox
                isOpen={isRestoreDialogOpen}
                onClose={() => setIsRestoreDialogOpen(false)}
                onConfirm={onConfirmRestore} // Use your specific restore handler
                loading={restoreLoading}
                title="Restore Item"
                message="This item will be successfully moved out of the trash and returned to its previous location."
                confirmText="Restore"
                variant="success" // Changes theme to green/positive
                icon={RefreshCcw} // Icon suggesting undo or circular refresh
            />
            <div className="flex flex-col gap-4 p-4 overflow-y-scroll">
                {/* top */}
                <div className="flex items-center justify-between p-4">
                    {/* left */}
                    <div>
                        <div className="flex gap-2 items-center">
                            <Trash size={25} />
                            <h2 className="text-xl font-semibold">Trash</h2>
                        </div>
                        <p>Manage Deleted items and restore them if needed</p>
                    </div>
                    {/* right */}
                    <div>
                        <Button variant="danger">
                            <Trash size={20} />
                            Empty Trash
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 max-md:flex-wrap">
                    <Stat
                        icon={Trash}
                        mainText={trashedItems.length}
                        subText={"Total Items"}
                        color="rose"
                    />
                    <Stat
                        icon={Package}
                        mainText={
                            trashedItems.filter(
                                (item) => item.type === "products"
                            ).length
                        }
                        subText={"Products"}
                        color="sky"
                    />
                    <Stat
                        icon={BoxesIcon}
                        mainText={
                            trashedItems.filter(
                                (item) => item.type === "category"
                            ).length
                        }
                        subText={"Categories"}
                        color="emerald"
                    />
                </div>
                <div className="flex items-center justify-center gap-2 max-md:flex-wrap">
                    <Stat
                        icon={Users}
                        mainText={
                            trashedItems.filter(
                                (item) => item.type === "customer"
                            ).length
                        }
                        subText={"Customers"}
                        color="indigo"
                    />
                    <Stat
                        icon={Truck}
                        mainText={
                            trashedItems.filter(
                                (item) => item.type === "supplier"
                            ).length
                        }
                        subText={"Suppliers"}
                        color="purple"
                    />
                    <Stat
                        icon={Clipboard}
                        mainText={
                            trashedItems.filter(
                                (item) => item.type === "invoice"
                            ).length
                        }
                        subText={"In-voices"}
                        color="purple"
                    />
                </div>
                <Card className="flex flex-col gap-2 p-4">
                    {/* top */}
                    <div>
                        <h2 className="text-lg font-semibold">Deleted Items</h2>
                        <p className="text-sm text-gray-500">
                            Items in trash will be permanently deleted after 30
                            days
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        {/* Search Section */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
                            <div className="relative w-full sm:w-auto">
                                <SearchIcon className="absolute left-[18px] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search for product."
                                    className="pl-10 w-full"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
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
                                    { label: "Orange", value: "orange" },
                                ]}
                            />
                        </div>
                        <ProductTable
                            columns={TrashTableColumns}
                            data={trashedItems}
                            loading={trashLoading}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TrashPage;
