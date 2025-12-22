import { Button } from "../ui/Button";
import { Loader, TriangleAlert, Info, CheckCircle } from "lucide-react";

const VARIANTS = {
    danger: {
        color: "text-red-500",
        icon: TriangleAlert,
        btnVariant: "danger",
    },
    success: {
        color: "text-green-600",
        icon: CheckCircle,
        btnVariant: "success", //
    },
    info: {
        color: "text-blue-600",
        icon: Info,
        btnVariant: "primary",
    },
    warning: {
        color: "text-amber-500",
        icon: TriangleAlert,
        btnVariant: "warning",
    },
};

const DialogBox = ({
    isOpen,
    onClose,
    onConfirm,
    loading = false,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
    icon: CustomIcon,
}) => {
    if (!isOpen) return null;

    const activeVariant = VARIANTS[variant] || VARIANTS.danger;

    const IconComponent = CustomIcon || activeVariant.icon;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="transition-all z-50 w-max min-w-[350px] max-w-[90%] rounded-xl p-6 flex flex-col gap-4 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
            >
                {/* Header */}
                <div
                    className={`flex gap-3 items-center ${activeVariant.color}`}
                >
                    <div className="p-2 bg-current/10 rounded-full">
                        <IconComponent size={24} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h2>
                </div>

                {/* Body */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    {message}
                </p>

                {/* Footer */}
                <div className="self-end flex gap-3 mt-2">
                    <Button
                        variant="ghost"
                        className="border border-gray-200 hover:bg-gray-50 text-gray-700"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={activeVariant.btnVariant}
                        onClick={onConfirm}
                        disabled={loading}
                        className="min-w-[80px]"
                    >
                        {loading ? (
                            <Loader className="animate-spin" size={18} />
                        ) : (
                            confirmText
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;
