import { X, Building2, Mail, MapPin, Phone, User } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";

const ViewSupplierDialog = ({ supplier, onClose }) => {
    if (!supplier) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <Card className="bg-white relative w-[95%] max-w-md p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-gray-800 truncate flex items-center gap-2">
                            <User size={16} />
                            {supplier.name}
                        </h2>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Building2 size={14} />
                            {supplier.company}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Supplier Details */}
                <div className="space-y-3 text-xs text-gray-600 mb-4">
                    {supplier.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            {supplier.email}
                        </div>
                    )}

                    {supplier.address && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            {supplier.address}
                        </div>
                    )}
                </div>

                {/* Contacts */}
                <div className="border border-gray-300 rounded-md mb-4">
                    <div className="bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">
                        Contacts
                    </div>

                    {supplier.contacts?.length ? (
                        supplier.contacts.map((contact, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-2 text-xs border-t border-gray-200"
                            >
                                <Phone size={14} />
                                <span className="capitalize">
                                    {contact.type}
                                </span>
                                :
                                <span className="font-medium">
                                    {contact.number}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-3 text-xs text-center text-gray-500">
                            No contacts available
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-right">
                    <Button variant="danger" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ViewSupplierDialog;
