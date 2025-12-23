import { X, Calendar, Wallet } from "lucide-react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";

const ViewPaymentDialog = ({ open, onClose, payment }) => {
    if (!open || !payment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xs"
                onClick={onClose}
            />

            {/* Dialog */}
            <Card className="relative w-[95%] max-w-lg p-5 z-10 animate-scaleIn bg-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Payment Details
                    </h2>
                    <Button variant="ghost" onClick={onClose}>
                        <X size={18} />
                    </Button>
                </div>

                {/* Payment Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-xs text-gray-400">Payment ID</p>
                        <h3 className="font-semibold text-gray-700">
                            {payment._id}
                        </h3>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <h3 className="font-semibold text-gray-700 flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(payment.timestamp).toLocaleDateString()}
                        </h3>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Type</p>
                        <h3 className="font-semibold text-gray-700 flex items-center gap-1">
                            <Wallet size={14} /> {payment.actionType}
                        </h3>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Amount</p>
                        <h3 className="font-semibold text-green-600">
                            Rs {payment.amount?.toLocaleString()}
                        </h3>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                    <p className="text-xs text-gray-400">Payment Method</p>
                    <h3 className="font-semibold text-gray-700">
                        {payment.paymentMethod || "--"}
                    </h3>
                </div>

                {/* Remaining Amount */}
                <div className="mb-4">
                    <p className="text-xs text-gray-400">Remaining</p>
                    <h3
                        className={`font-semibold ${
                            payment.remainingDueAmount < 0
                                ? "text-red-600"
                                : "text-orange-600"
                        }`}
                    >
                        Rs {payment.remainingDueAmount?.toLocaleString()}
                    </h3>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 mt-5">
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ViewPaymentDialog;
