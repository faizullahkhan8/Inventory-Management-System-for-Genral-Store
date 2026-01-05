import { Search, ShoppingCart, X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Card } from "../../ui/Card";
import Select from "../../ui/Select";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";

// Mock Data
const mockProducts = [
    {
        _id: "1",
        name: "Wireless Mouse",
        price: 25.99,
        stock: 45,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop",
    },
    {
        _id: "2",
        name: "USB-C Cable",
        price: 12.5,
        stock: 120,
        image: "https://images.unsplash.com/photo-1590738927009-d8b6fc0ba756?w=200&h=200&fit=crop",
    },
    {
        _id: "3",
        name: "Laptop Stand",
        price: 45.0,
        stock: 30,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    },
    {
        _id: "4",
        name: "Mechanical Keyboard",
        price: 89.99,
        stock: 15,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop",
    },
    {
        _id: "5",
        name: "Headphones",
        price: 65.0,
        stock: 25,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    },
    {
        _id: "6",
        name: "Webcam HD",
        price: 55.0,
        stock: 18,
        image: "https://images.unsplash.com/photo-1589739900243-51091308ee52?w=200&h=200&fit=crop",
    },
    {
        _id: "7",
        name: "External SSD 1TB",
        price: 120.0,
        stock: 22,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&h=200&fit=crop",
    },
    {
        _id: "8",
        name: 'Monitor 27"',
        price: 299.99,
        stock: 8,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop",
    },
];

const mockSuppliers = [
    { _id: "s1", name: "Tech Supplies Inc." },
    { _id: "s2", name: "Global Electronics" },
    { _id: "s3", name: "Premium Hardware Co." },
];

const SplitBillForm = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [billData, setBillData] = useState({
        supplierId: "",
        purchaseDate: new Date().toISOString().split("T")[0],
        paymentType: "cash",
        items: [],
        paidAmount: 0,
        note: "",
    });

    // Filter products based on search
    const filteredProducts = mockProducts.filter((p) =>
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

    // Update item quantity
    const updateQuantity = (index, delta) => {
        const items = [...billData.items];
        const newQty = items[index].quantity + delta;

        if (newQty <= 0) {
            removeItem(index);
        } else {
            items[index].quantity = newQty;
            setBillData({ ...billData, items });
        }
    };

    // Update item field
    const updateItem = (index, field, value) => {
        const items = [...billData.items];
        items[index][field] = value;
        setBillData({ ...billData, items });
    };

    // Remove item
    const removeItem = (index) => {
        const items = billData.items.filter((_, i) => i !== index);
        setBillData({ ...billData, items });
    };

    // Calculations
    const subtotal = billData.items.reduce((acc, item) => {
        const qty = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        return acc + (qty * price - discount);
    }, 0);

    const dueAmount = subtotal - (Number(billData.paidAmount) || 0);

    return (
        <div className="h-screen flex overflow-hidden bg-gray-50">
            {/* LEFT SIDE - Products */}
            <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200">
                {/* Header */}
                <div className="bg-white border-b border-gray-300 p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        Products
                    </h2>
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
                                        src={product.image}
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
                                            ${product.price.toFixed(2)}
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
            <div className="flex-1 flex flex-col bg-white shadow-xl">
                {/* Supplier & Date */}
                <div className="flex p-2 items-center border-b border-gray-300 gap-4">
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
                            options={mockSuppliers.map((s) => ({
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
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {billData.items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <ShoppingCart size={48} className="mb-2" />
                            <p>No items in cart</p>
                            <p className="text-sm">Click on products to add</p>
                        </div>
                    ) : (
                        billData.items.map((item, index) => (
                            <Card key={index} className="p-3">
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm text-gray-800">
                                            {item.productName}
                                        </h4>

                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <div>
                                                <label className="text-xs text-gray-600">
                                                    Price
                                                </label>
                                                <Input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            "price",
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className="text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-600">
                                                    Discount
                                                </label>
                                                <Input
                                                    type="number"
                                                    value={item.discount}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            "discount",
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className="text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-1">
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm">
                                                    Quantity
                                                </label>
                                                <span
                                                    className="flex items-center justify-center border border-gray-300 rounded-lg hover:bg-red-100 transition-colors duration-200 h-6 w-6 text-red-600"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            index,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <Minus size={14} />
                                                </span>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="w-18! h-8! text-center text-sm "
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            index,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                                <span
                                                    className="flex items-center justify-center border border-gray-300 rounded-lg hover:bg-green-100 transition-colors duration-200 h-6 w-6 text-green-600"
                                                    onClick={() =>
                                                        updateQuantity(index, 1)
                                                    }
                                                >
                                                    <Plus size={14} />
                                                </span>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-xs text-gray-600">
                                                    Subtotal
                                                </p>
                                                <p className="font-bold text-sm text-blue-600">
                                                    $
                                                    {(
                                                        item.quantity *
                                                            item.price -
                                                        item.discount
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <span
                                        className="flex items-center justify-center border border-gray-300 rounded-lg hover:bg-red-100 transition-colors duration-200 h-6 w-6 text-red-600"
                                        onClick={() => removeItem(index)}
                                    >
                                        <X size={16} />
                                    </span>
                                </div>
                            </Card>
                        ))
                    )}
                </div>

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

                    <div className="space-y-2 pt-2 flex items-center justify-between">
                        <div className="flex justify-between text-md">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-md">
                            <span className="font-medium">Due:</span>
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
                        <Button variant="secondary" className="flex-1">
                            Cancel
                        </Button>
                        <Button className="flex-1 bg-blue-600">
                            Save Bill
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplitBillForm;
