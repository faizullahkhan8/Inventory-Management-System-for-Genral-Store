import React, { useEffect, useState } from "react";
import { useGetSingleBill } from "../api/Hooks/bill.api";
import { useParams } from "react-router-dom";
import BillForm from "../components/Bill/BillForm";
import Header from "../components/Header";

const EditBill = () => {
    const [billData, setBillData] = useState(null);
    const billId = useParams().id;

    const { getSingleBill, loading: getSingleBillLoading } = useGetSingleBill();

    useEffect(() => {
        (async () => {
            const response = await getSingleBill(billId);
            console.log(response);
            if (response.success) {
                setBillData(response.bill);
            }
        })();
    }, []);

    const handleEditBill = async (e) => {
        e.preventDefault();
        // Implement edit bill logic here
    };

    console.log(billData, getSingleBillLoading, billId);

    return (
        <div>
            <Header title="Edit Bill" />
            {!getSingleBillLoading && billData && (
                <BillForm
                    billData={billData}
                    handler={handleEditBill}
                    loading={getSingleBillLoading}
                    setBillData={setBillData}
                    isEdit={true}
                />
            )}
        </div>
    );
};

export default EditBill;
