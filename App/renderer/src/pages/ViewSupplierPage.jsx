import {
    DollarSign,
    Mail,
    MapPin,
    Phone,
    PlusCircle,
    SearchIcon,
    User,
} from "lucide-react";
import Header from "../components/Header";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import Stat from "../ui/Stat";
import ProductTable from "../components/Tables/ProductTable";
import { getSupplierPaymentAndPurchaseColumns } from "../components/Suppliers/SupplierPaymentAndPurchaseColumns";
import { Input } from "../ui/Input";
import { useState } from "react";

const ViewSupplierPage = () => {
    const paymentAndPurchaseColumns = getSupplierPaymentAndPurchaseColumns();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="w-full h-screen flex flex-col">
            <Header title={"View Supplier"} />
            <div className="flex flex-col gap-2 overflow-y-scroll p-2">
                <Card className="flex p-4 justify-between">
                    <div className="">
                        <div className="flex gap-2 items-center">
                            <User />
                            <h2 className="text-xl">Supplier Name</h2>
                        </div>
                        <p className="text-sm text-gray-500 ml-1">
                            Supplier Company
                        </p>
                    </div>
                    <div>
                        <span className="rounded-full! text-xs px-4 py-1 bg-primary text-white font-semibold">
                            Active
                        </span>
                    </div>
                </Card>
                <Card className="flex p-4 gap-4 justify-between max-sm:flex-wrap">
                    <div className="relative">
                        <div className="absolute -left-2 bg-primary/80 w-[3px] h-full rounded" />
                        <div className="flex gap-2">
                            <Phone size={14} className="text-gray-500" />
                            <p className="text-xs text-gray-500">Phone</p>
                        </div>
                        <h3 className="text-lg">03328753452</h3>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-2 bg-primary/80 w-[3px] h-full rounded" />
                        <div className="flex gap-2">
                            <Mail size={14} className="text-gray-500" />
                            <p className="text-xs text-gray-500">E-Mail</p>
                        </div>
                        <h3 className="text-lg">
                            faizullahofficial0@gmail.com
                        </h3>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-2 bg-primary/80 w-[3px] h-full rounded" />
                        <div className="flex gap-2">
                            <MapPin size={14} className="text-gray-500" />
                            <p className="text-xs text-gray-500">Address</p>
                        </div>
                        <h3 className="text-lg">Fazal shah mitha khel bannu</h3>
                    </div>
                </Card>
                <div className="flex gap-4 justify-between max-sm:flex-wrap">
                    <Stat
                        icon={DollarSign}
                        subText={"Total Purchase"}
                        mainText={12000}
                    />
                    <Stat
                        icon={DollarSign}
                        subText={"Total Paid"}
                        mainText={4000}
                        color="yellow"
                    />
                    <Stat
                        icon={DollarSign}
                        subText={"Pending"}
                        mainText={8000}
                        color="rose"
                    />
                </div>
                <div className="flex flex-col p-4 gap-4">
                    <div className="flex justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Payment & Purchase History
                            </h2>
                            <p className="text-xs text-gray-500">
                                You can see full details of the purchase and
                                payments
                            </p>
                        </div>
                        <Button>
                            <PlusCircle size={18} />
                            <span className="text-xs">
                                Add Payment or Purchase
                            </span>
                        </Button>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <SearchIcon className="absolute left-[18px] top-[50%] -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search for payement and purchase."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ProductTable
                        data={[
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "purchase",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "payment",
                                paymentMethod: "cheque",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "purchase",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "payment",
                                paymentMethod: "cheque",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "purchase",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "payment",
                                paymentMethod: "cheque",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "purchase",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "payment",
                                paymentMethod: "cheque",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "purchase",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "payment",
                                paymentMethod: "cheque",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "purchase",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "payment",
                                paymentMethod: "cheque",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "purchase",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                            {
                                id: "6736384673623826",
                                date: "2025-12-18",
                                type: "payment",
                                paymentMethod: "cheque",
                                purchase: 12000,
                                paid: 8000,
                                pending: 4000,
                            },
                        ]}
                        columns={paymentAndPurchaseColumns}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewSupplierPage;
