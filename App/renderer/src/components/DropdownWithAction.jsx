import { useState, useRef, useEffect } from "react";
import { ChevronDown, Eye, Loader, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";

const DropdownWithAction = ({
    data = [],
    onView,
    onEdit,
    onDelete,
    loading,
    placeholder = "Select",
    onAdd,
    actions = { add: false, view: false, edit: false, delete: false },
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Render categories recursively
    const renderCategories = (items, level = 0) =>
        items.map((item, index) => {
            if (!item) return null;
            const children = Array.isArray(item.children) ? item.children : [];

            return (
                <div key={index || Math.random()}>
                    <div
                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                        style={{ paddingLeft: `${level * 16 + 12}px` }}
                    >
                        <span className="text-sm text-gray-700 truncate">
                            {item.name || "Unnamed"}
                        </span>
                        <div className="flex gap-2">
                            {actions.view && onView && (
                                <button
                                    onClick={() => {
                                        onView(item);
                                        setOpen(false);
                                    }}
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                >
                                    <Eye size={16} />
                                </button>
                            )}
                            {actions.edit && onEdit && (
                                <button
                                    onClick={() => {
                                        onEdit(item);
                                        setOpen(false);
                                    }}
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                >
                                    <Pencil size={16} />
                                </button>
                            )}
                            {actions.delete && onDelete && (
                                <button
                                    onClick={() => {
                                        onDelete(item);
                                        setOpen(false);
                                    }}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {children.length > 0 &&
                        renderCategories(children, level + 1)}
                </div>
            );
        });

    return (
        <div className="relative w-full min-w-[18rem]" ref={dropdownRef}>
            {/* Trigger */}
            <div
                className={`flex items-center justify-between gap-2 border border-gray-300 rounded-md pl-3 ${
                    !actions.add && "py-2"
                }`}
            >
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!loading) return setOpen(!open);
                    }}
                    className="flex items-center justify-between gap-2 cursor-pointer flex-1"
                >
                    <span className="text-sm text-gray-600 font-semibold">
                        {loading ? (
                            <Loader className="animate-spin" size={18} />
                        ) : (
                            placeholder
                        )}
                    </span>
                    <ChevronDown
                        size={18}
                        className={`${
                            open ? "rotate-180" : ""
                        } transition-transform duration-300`}
                    />
                </div>

                {actions.add && onAdd && (
                    <Button
                        className="rounded-l-none shrink-0"
                        onClick={() => {
                            setOpen(false);
                            onAdd();
                        }}
                    >
                        <Plus size={16} />
                    </Button>
                )}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-auto">
                    {data.length ? (
                        renderCategories(data)
                    ) : (
                        <p className="text-sm text-gray-500 p-3">
                            No categories found
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownWithAction;
