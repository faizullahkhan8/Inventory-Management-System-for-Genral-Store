import { useState, useRef, useEffect } from "react";
import { ChevronDown, Loader, Pencil, Trash2 } from "lucide-react";

const CategoryDropdown = ({ categories = [], onEdit, onDelete, loading }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on outside click
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

    const renderCategories = (cats, level = 0) =>
        cats.map((cat) => (
            <div key={cat._id}>
                <div
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                    style={{ paddingLeft: `${level * 16 + 12}px` }}
                >
                    <span className="text-sm text-gray-700">{cat.name}</span>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                onEdit(cat);
                                setOpen(false);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            <Pencil size={16} />
                        </button>

                        <button
                            onClick={() => {
                                onDelete(cat);
                                setOpen(false);
                            }}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {cat.children?.length > 0 &&
                    renderCategories(cat.children, level + 1)}
            </div>
        ));

    return (
        <div className="relative w-72" ref={dropdownRef}>
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
                <span className="text-sm text-gray-600 font-semibold">
                    {loading ? (
                        <Loader className="animate-spin" size={18} />
                    ) : (
                        "Manage Categories"
                    )}
                </span>
                <ChevronDown
                    size={18}
                    className={`${
                        open && "rotate-180"
                    } transition-transform duration-300`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-auto">
                    {categories.length ? (
                        renderCategories(categories)
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

export default CategoryDropdown;
