import { Search, ShoppingCart, X, Minus, Plus, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../../ui/Card";
import Select from "../../ui/Select";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useGetAllSuppliers } from "../../api/Hooks/supplier.api";
import { useGetAllProducts } from "../../api/Hooks/product.api";
import { useAddBill } from "../../api/Hooks/bill.api";
import ItemsList from "./ItemsList";

const SplitBillForm = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suppliersData, setSuppliersData] = useState([
        { _id: "s1", name: "Tech Supplies Inc." },
        { _id: "s2", name: "Global Electronics" },
        { _id: "s3", name: "Premium Hardware Co." },
    ]);

    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();

    const [billData, setBillData] = useState({
        supplierId: "",
        purchaseDate: new Date().toISOString().split("T")[0],
        paymentType: "cash",
        items: [],
        paidAmount: 0,
        note: "",
    });

    // ----------- HOOKS -----------
    const { getAllSuppliers } = useGetAllSuppliers();
    const { getAllProducts } = useGetAllProducts();
    const { addBill, loading: addBillLoading } = useAddBill();

    // Filter products based on search
    const filteredProducts = productsData.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Add or update product in bill
    const handleProductClick = (product) => {
        const existingIndex = billData.items.findIndex(
            (item) => item.productId === product._id
        );

        if (existingIndex >= 0) {
            // Increase quantity
            const items = [...billData.items];
            items[existingIndex].quantity += 1;
            setBillData({ ...billData, items });
        } else {
            // Add new item
            setBillData({
                ...billData,
                items: [
                    ...billData.items,
                    {
                        productId: product._id,
                        productName: product.name,
                        quantity: 1,
                        price: product.price,
                        discount: 0,
                    },
                ],
            });
        }
    };

    // Calculations
    const subtotal = billData.items.reduce((acc, item) => {
        const qty = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        return acc + (qty * price - discount);
    }, 0);

    const dueAmount = subtotal - (Number(billData.paidAmount) || 0);

    const handleAddBill = async (e) => {
        e.preventDefault();
        if (billData.supplierId) {
            const response = await addBill(billData);
            if (response.success) {
                navigate("/billing");
            }
        }
    };

    useEffect(() => {
        getAllSuppliers().then((res) => {
            if (res?.success) {
                setSuppliersData(res.suppliers);
            }
        });

        getAllProducts().then((res) => {
            if (res?.success) {
                console.log(res);
                setProductsData(res.Products);
            }
        });
    }, []);

    return (
        <div className="h-screen flex overflow-hidden">
            {/* LEFT SIDE - Products */}
            <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200">
                {/* Header */}
                <div className="p-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Search Products
                    </label>
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product._id}
                                className="max-w-max cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className=" bg-gray-100 overflow-hidden">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/${
                                            product.imageUrl
                                        }`}
                                        alt={product.name}
                                        className="w-38 h-38 object-cover hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-2">
                                    <h3
                                        className="font-semibold text-gray-800 truncate text-sm"
                                        title={product.name}
                                    >
                                        {product.name}
                                    </h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-bold text-blue-600">
                                            ${product.price?.toFixed(2)}
                                        </span>
                                        <span
                                            className={`text-xs px-1 py-0.5 rounded ${
                                                product.stock > 20
                                                    ? "bg-green-100 text-green-700"
                                                    : product.stock > 10
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Bill */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Supplier & Date */}
                <div className="flex p-2 items-center gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Supplier <span className="text-red-500">*</span>
                        </label>
                        <Select
                            value={billData.supplierId}
                            onChange={(val) =>
                                setBillData({ ...billData, supplierId: val })
                            }
                            placeholder="Select supplier"
                            options={suppliersData.map((s) => ({
                                label: s.name,
                                value: s._id,
                            }))}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="date"
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
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Payment
                        </label>
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

                {/* Items List */}
                <ItemsList billData={billData} setBillData={setBillData} />

                {/* Footer - Summary */}
                <div className="bg-gray-50 p-2">
                    <div className="flex items-center justify-between gap-2 w-full">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Paid Amount
                            </label>
                            <Input
                                type="number"
                                value={billData.paidAmount}
                                onChange={(e) =>
                                    setBillData({
                                        ...billData,
                                        paidAmount: Number(e.target.value),
                                    })
                                }
                                placeholder="0.00"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Note
                            </label>
                            <Input
                                value={billData.note}
                                onChange={(e) =>
                                    setBillData({
                                        ...billData,
                                        note: e.target.value,
                                    })
                                }
                                placeholder="Add note..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col justify-between">
                            <div className="flex justify-between text-md">
                                <span className="font-medium mr-2">Total:</span>
                                <span className="font-bold">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-md">
                                <span className="font-medium mr-2">Due:</span>
                                <span
                                    className={`font-bold ${
                                        dueAmount > 0
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }`}
                                >
                                    ${dueAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button variant="secondary" className="">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddBill}
                                className="bg-blue-600"
                            >
                                {addBillLoading ? (
                                    <Loader
                                        size={28}
                                        className="animate-spin"
                                    />
                                ) : (
                                    "Save Bill"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplitBillForm;
