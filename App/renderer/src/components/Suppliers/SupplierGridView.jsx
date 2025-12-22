import { Building2, Mail, Phone, MapPin, Wallet } from "lucide-react";
import { Card } from "../../ui/Card";
import { Link } from "react-router-dom";

const SupplierGrid = ({ suppliers = [] }) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {suppliers.map((supplier, index) => (
                <Link
                    key={index}
                    to={`/suppliers/view-supplier/${supplier._id}`}
                >
                    <Card className="flex flex-col gap-4 p-4 hover:shadow-md transition">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">
                                    {supplier.name}
                                </h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Building2 size={14} />
                                    {supplier.company}
                                </p>
                            </div>

                            <span
                                className={`text-xs px-2 py-1 rounded-xl font-semibold ${
                                    supplier.remainingAmount <= 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {supplier.remainingAmount <= 0
                                    ? "Paid"
                                    : "Pending"}
                            </span>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2 text-xs">
                                <Mail size={14} />
                                {supplier.email}
                            </div>
                            <div className="flex items-center gap-2  text-xs">
                                <Phone size={14} />
                                {supplier.phone}
                            </div>
                            <div className="flex items-center gap-2  text-xs">
                                <MapPin size={14} />
                                {supplier.address}
                            </div>
                        </div>

                        {/* Amounts */}
                        <div className="grid grid-cols-3 gap-2 border-t border-gray-300 pt-3 text-sm">
                            <AmountItem
                                label="Total"
                                value={supplier.totalAmount}
                            />
                            <AmountItem
                                label="Paid"
                                value={supplier.paidAmount}
                                color="text-green-600"
                            />
                            <AmountItem
                                label="Remaining"
                                value={supplier.remainingAmount}
                                color={
                                    supplier.remainingAmount < 0
                                        ? "text-red-600"
                                        : "text-orange-600"
                                }
                            />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

const AmountItem = ({ label, value, color = "text-gray-700" }) => (
    <div className="flex flex-col text-center">
        <span className="text-xs text-gray-400">{label}</span>
        <span className={`font-semibold ${color}`}>
            Rs {value?.toLocaleString()}
        </span>
    </div>
);

export default SupplierGrid;
