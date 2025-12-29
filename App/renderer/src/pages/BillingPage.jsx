import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import BillGrid from "../components/Bill/BillGrid";
import { useGetAllBills } from "../api/Hooks/bill.api";
import ViewBillDialog from "../components/Bill/ViewBillDialog";

const BillingPage = () => {
    const [searchQuery, setSearchQuery] = useState();
    const [billData, setBillData] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);

    console.log(selectedBill);

    const { getAllBills, loading } = useGetAllBills();

    useEffect(() => {
        (async () => {
            const response = await getAllBills();

            if (response.bills) {
                setBillData(response.bills);
            }
        })();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col overflow-y-hidden">
            <Header title={"Billing"} />
            <div className="flex-1 flex flex-col overflow-y-scroll">
                <div className="p-4 flex items-center justify-between gap-4">
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
                    <Link to={"/billing/add-bill"}>
                        <Button>Add Bill</Button>
                    </Link>
                </div>

                <BillGrid
                    bills={billData}
                    loading={loading}
                    setSelectedBill={setSelectedBill}
                />

                {selectedBill && (
                    <ViewBillDialog
                        bill={selectedBill}
                        onClose={() => setSelectedBill(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default BillingPage;
