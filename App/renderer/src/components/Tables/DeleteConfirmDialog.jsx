import React from "react";
import { Button } from "../../ui/Button";
import { Loader, TriangleAlert } from "lucide-react";

const DeleteConfirmDialog = ({ onConfirm, isOpen, setIsOpen, loading }) => {
    return (
        isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
                <div className="z-9999 w-max min-w-max h-max rounded-xl p-4 flex flex-col gap-2 bg-white">
                    <div className="flex gap-2 items-center text-red-500">
                        <TriangleAlert size={20} />
                        <h2 className="text-lg font-semibold">
                            Are sure want to delete?
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        This action can be undone later form the trash in the
                        sidebar. <br /> Are you sure you want to proceed?
                    </p>
                    <div className="self-end">
                        <Button
                            variant="ghost"
                            className="border border-gray-300 cursor-pointer"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={onConfirm}
                            className="ml-2 cursor-pointer"
                        >
                            {loading ? (
                                <Loader className="animate-spin" size={20} />
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteConfirmDialog;
