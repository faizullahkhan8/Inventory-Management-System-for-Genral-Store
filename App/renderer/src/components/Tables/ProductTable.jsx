import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Loader } from "lucide-react";

const ProductTable = ({ data, columns, loading }) => {
    const TableInstance = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <div className="w-full max-h-[70vh] overflow-auto border border-gray-200 rounded-lg">
            <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                    {TableInstance.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"
                                    style={{ width: header.column.getSize() }}
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
                                    className="px-4 py-3 text-sm text-gray-600"
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
    );
};

export default ProductTable;
