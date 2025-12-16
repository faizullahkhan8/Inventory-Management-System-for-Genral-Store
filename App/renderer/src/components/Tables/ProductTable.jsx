import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, Loader } from "lucide-react";
import Select from "../../ui/Select";
import { Button } from "../../ui/Button";
import { useState } from "react";

const ProductTable = ({
    data,
    columns,
    loading,
    searchQuery,
    setSearchQuery,
}) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const TableInstance = useReactTable({
        columns,
        data,
        state: {
            globalFilter: searchQuery,
            pagination: pagination,
        },
        onGlobalFilterChange: setSearchQuery,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const pageIndex = TableInstance.getState().pagination.pageIndex;
    const pageSize = TableInstance.getState().pagination.pageSize;

    const start = pageIndex * pageSize + 1;
    const end = pageIndex * pageSize + TableInstance.getRowModel().rows.length;
    const total = TableInstance.getFilteredRowModel().rows.length;

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <>
            <div className="w-full lg:max-h-[60vh] max-h-[70vh] overflow-auto border border-gray-200 rounded-lg">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 sticky z-10 top-0">
                        {TableInstance.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={`${
                                            header.column.columnDef.meta
                                                ?.sticky === "right" &&
                                            "sticky right-0 bg-gray-50"
                                        } px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200`}
                                        style={{
                                            width: header.column.getSize(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {TableInstance.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={`${
                                            cell.column.columnDef.meta
                                                ?.sticky === "right" &&
                                            "sticky right-0 bg-gray-50"
                                        } px-4 py-2 text-sm text-gray-600`}
                                        style={{ width: cell.column.getSize() }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="my-2 flex items-center justify-between gap-2">
                {/* Drop Down */}
                <div className="px-2 flex items-center justify-center gap-2 w-max">
                    <Select
                        placeholder="10"
                        value={TableInstance.getState().pagination.pageSize}
                        onChange={(value) =>
                            TableInstance.setPageSize(Number(value))
                        }
                        options={[
                            { label: "5", value: 5 },
                            { label: "10", value: 10 },
                            { label: "30", value: 20 },
                            { label: "40", value: 30 },
                            { label: "50", value: 40 },
                        ]}
                    />
                    <div className="w-[20rem]">
                        Showing: {start} - {end} of {total}
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex items-center justify-center gap-2">
                    <Button
                        children={<ChevronLeftIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => TableInstance.previousPage()}
                        disabled={!TableInstance.getCanPreviousPage()}
                    />
                    <span>
                        Page {TableInstance.getState().pagination.pageIndex + 1}{" "}
                        of {TableInstance.getPageCount()}
                    </span>
                    <Button
                        children={<ChevronRightIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => TableInstance.nextPage()}
                        disabled={!TableInstance.getCanNextPage()}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductTable;
