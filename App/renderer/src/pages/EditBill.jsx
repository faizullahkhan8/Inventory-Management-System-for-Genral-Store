import React, { useEffect, useState } from "react";
import { useGetSingleBill, useUpdateBill } from "../api/Hooks/bill.api";
import { useNavigate, useParams } from "react-router-dom";
import BillForm from "../components/Bill/BillForm";
import Header from "../components/Header";

const EditBill = () => {
    const [billData, setBillData] = useState(null);
    const billId = useParams().id;
    const navigate = useNavigate();

    const { getSingleBill, loading: getSingleBillLoading } = useGetSingleBill();
    const { updateBill, loading: updateBillLoading } = useUpdateBill();

    useEffect(() => {
        (async () => {
            const response = await getSingleBill(billId);
            console.log(response);
            if (response.success) {
                setBillData(response.bill);
            }
        })();
    }, []);

    const handleEditBill = async (e, data) => {
        e.preventDefault();
        const response = await updateBill(billId, data);

        if (response && response.success && !updateBillLoading) {
            navigate("/billing");
        }
    };

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
