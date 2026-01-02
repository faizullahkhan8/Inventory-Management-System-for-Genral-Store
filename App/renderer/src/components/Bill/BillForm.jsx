import { Loader, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import Select from "../../ui/Select";
import { Card } from "../../ui/Card";
import { Label } from "../../ui/Label";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { useGetAllSuppliers } from "../../api/Hooks/supplier.api";
import { useGetAllProducts } from "../../api/Hooks/product.api";

const BillForm = ({
    handler,
    loading,
    billData,
    setBillData,
    isEditing = false,
}) => {
    const [supplierData, setSupplierData] = useState([]);
    const [productData, setProductData] = useState([]);

    const { getAllSuppliers, loading: supplierLoading } = useGetAllSuppliers();
    const { getAllProducts, loading: productLoading } = useGetAllProducts();

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        (async () => {
            const supplierRes = await getAllSuppliers();
            const productRes = await getAllProducts();

            if (supplierRes?.success) {
                setSupplierData(supplierRes.suppliers);
            }

            if (productRes?.success) {
                setProductData(productRes.Products);
            }
        })();
    }, []);

    /* ================= ITEM HANDLERS ================= */
    const handleItemChange = (index, field, value) => {
        const items = billData.items.map((it, i) =>
            i === index ? { ...it, [field]: value } : it
        );
        setBillData({ ...billData, items });
    };

    const addItem = () => {
        setBillData({
            ...billData,
            items: [
                ...billData.items,
                { productId: "", quantity: 1, price: 0, discount: 0 },
            ],
        });
    };

    const removeItem = (index) => {
        if (billData?.items.length === 1) {
            return toast.error("At least one item is required.");
        }

        const items = billData.items.filter((_, i) => i !== index);
        setBillData({ ...billData, items });
    };

    /* ================= CALCULATIONS ================= */
    const total = billData.items.reduce((acc, item) => {
        const qty = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        return acc + qty * price - discount;
    }, 0);

    const dueAmount = total - (Number(billData.paidAmount) || 0);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen w-full p-4 overflow-y-scroll">
            <div className="mb-4">
                <h1 className="text-primary font-bold text-xl">
                    {isEditing ? "Edit Purchase Bill" : "Add Purchase Bill"}
                </h1>
                <p>
                    {isEditing
                        ? "Update the details of the purchase bill."
                        : "Fill the details to create a new purchase bill."}
                </p>
                <p>
                    <span className="text-red-500">*</span> Required fields
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {/* SUPPLIER / DATE / PAYMENT */}
                <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
                    <div>
                        <label>
                            Supplier <span className="text-red-500">*</span>
                        </label>
                        <Select
                            required
                            value={billData.supplierId._id}
                            onChange={(val) =>
                                setBillData({
                                    ...billData,
                                    supplierId: val,
                                })
                            }
                            placeholder={
                                supplierLoading
                                    ? "Loading..."
                                    : "Select supplier"
                            }
                            options={supplierData.map((sup) => ({
                                label: sup.name,
                                value: sup._id,
                            }))}
                        />
                    </div>

                    <div>
                        <label>
                            Purchase Date{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="date"
                            required
                            value={billData.purchaseDate}
                            onChange={(e) =>
                                setBillData({
                                    ...billData,
                                    purchaseDate: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label>Payment Type</label>
                        <Select
                            value={billData.paymentType}
                            onChange={(val) =>
                                setBillData({
                                    ...billData,
                                    paymentType: val,
                                })
                            }
                            options={[
                                { label: "Cash", value: "cash" },
                                { label: "Bank", value: "bank" },
                                { label: "Online", value: "online" },
                                { label: "Cheque", value: "cheque" },
                            ]}
                        />
                    </div>
                </div>

                {/* ITEMS */}
                <Card className="p-3">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl">Items</h3>
                        <Button
                            type="button"
                            onClick={addItem}
                            className="flex gap-1"
                        >
                            <PlusCircle size={18} /> Add Item
                        </Button>
                    </div>

                    {billData.items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 items-center gap-2 mb-2 max-sm:grid-cols-1 max-sm:items-start"
                        >
                            {/* PRODUCT */}
                            <div>
                                <label>
                                    Product
                                    <span className="text-red-500">*</span> #
                                    {index + 1}
                                </label>

                                <Select
                                    id={`items.${index}.productId`}
                                    name={`items[${index}].productId`}
                                    required
                                    value={item.productId._id}
                                    onChange={(val) =>
                                        handleItemChange(
                                            index,
                                            "productId",
                                            val
                                        )
                                    }
                                    placeholder={
                                        productLoading
                                            ? "Loading..."
                                            : "Product"
                                    }
                                    options={productData?.map((p) => ({
                                        label: p.name,
                                        value: p._id,
                                    }))}
                                />
                            </div>

                            {/* QUANTITY */}

                            <div>
                                <label>Quantity</label>
                                <Input
                                    id={`items.${index}.quantity`}
                                    name={`items[${index}].quantity`}
                                    type="number"
                                    min={1}
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "quantity",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>

                            {/* PRICE */}
                            <div>
                                <label>Price</label>
                                <Input
                                    id={`items.${index}.price`}
                                    name={`items[${index}].price`}
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "price",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>

                            {/* DISCOUNT */}
                            <div>
                                <label>Discount (Rs)</label>
                                <Input
                                    id={`items.${index}.discount`}
                                    name={`items[${index}].discount`}
                                    type="number"
                                    placeholder="Discount"
                                    value={item.discount}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "discount",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                            {/* REMOVE */}
                            <Button className="w-max" variant="danger">
                                <Trash2
                                    onClick={() => removeItem(index)}
                                    className="cursor-pointer"
                                />
                            </Button>
                        </div>
                    ))}
                </Card>

                {/* PAYMENT SUMMARY */}
                <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
                    <div>
                        <label>Paid Amount</label>
                        <Input
                            type="number"
                            value={billData.paidAmount}
                            onChange={(e) =>
                                setBillData({
                                    ...billData,
                                    paidAmount: Number(e.target.value),
                                })
                            }
                        />
                    </div>

                    <div>
                        <label>Note</label>
                        <Input
                            value={billData.note}
                            onChange={(e) =>
                                setBillData({
                                    ...billData,
                                    note: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4 p-4">
                        <p>
                            Total: <strong>{total}</strong>
                        </p>
                        <p>
                            Due:{" "}
                            <strong className="text-red-500">
                                {dueAmount}
                            </strong>
                        </p>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-2">
                    <Link to="/bills">
                        <Button variant="danger">Cancel</Button>
                    </Link>

                    <Button
                        onClick={(e) => handler(e, billData)}
                        className="bg-blue-500"
                    >
                        {isEditing ? "Update Bill" : "Save Bill"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BillForm;
