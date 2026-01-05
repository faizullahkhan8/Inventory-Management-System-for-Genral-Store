import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import React from "react";
import { Card } from "../../ui/Card";
import { Input } from "../../ui/Input";

const ItemsList = ({ billData, setBillData }) => {
    // Update item quantity
    const updateQuantity = (index, change) => {
        const items = [...billData.items];

        if (items[index].quantity === 0 && change < 1) return;

        const newQty = items[index].quantity + change;

        items[index].quantity = newQty;
        setBillData({ ...billData, items });
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

    return (
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
                        <div className="relative flex gap-3">
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm text-gray-800">
                                    {item.productName}
                                </h4>

                                <div className="grid grid-cols-4 items-center justify-center gap-2 mt-2">
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
                                                    Number(e.target.value)
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
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <div>
                                            <label className="text-xs text-gray-600">
                                                Quantity
                                            </label>
                                            <div className="w-full flex items-center gap-2">
                                                <div
                                                    className="flex items-center justify-center border border-gray-300 rounded-lg hover:bg-red-100 transition-colors duration-200 h-6 w-6 text-red-600 cursor-pointer"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            index,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <Minus size={14} />
                                                </div>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    className="w-28! h-8! text-center text-sm "
                                                    onChange={(e) =>
                                                        setBillData({
                                                            ...billData,
                                                            items: billData.items.map(
                                                                (item, idx) =>
                                                                    idx ===
                                                                    index
                                                                        ? {
                                                                              ...item,
                                                                              quantity:
                                                                                  Number(
                                                                                      e
                                                                                          .target
                                                                                          .value
                                                                                  ),
                                                                          }
                                                                        : item
                                                            ),
                                                        })
                                                    }
                                                />
                                                <div
                                                    className="flex items-center justify-center border border-gray-300 rounded-lg hover:bg-green-100 transition-colors duration-200 h-6 w-6 text-green-600 cursor-pointer z-10"
                                                    onClick={() =>
                                                        updateQuantity(index, 1)
                                                    }
                                                >
                                                    <Plus size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-14 top-0 flex gap-4 items-center">
                                <p className="text-xs text-gray-600">
                                    Subtotal
                                </p>
                                <p className="font-bold text-sm text-blue-600">
                                    $
                                    {(
                                        item.quantity * item.price -
                                        item.discount
                                    ).toFixed(2)}
                                </p>
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
    );
};

export default ItemsList;
