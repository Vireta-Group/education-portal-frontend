import { useState } from "react";
import { Search, Filter, Download, Eye, Pencil, Trash } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

// Extremely basic implementation serving as the foundation
export function DataTable({ 
  data = [], 
  columns = [], 
  onView, 
  onEdit, 
  onDelete,
  searchPlaceholder = "Search..." 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15; // Set according to guidelines

  return (
    <div className="w-full bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            className="pl-9" 
            placeholder={searchPlaceholder} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Table Wrapper for horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-10">
                <input type="checkbox" className="rounded border-slate-300" />
              </th>
              {columns.map((col, idx) => (
                <th key={idx} scope="col" className="px-6 py-3 font-semibold">
                  {col.header}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-slate-500">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </td>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      {col.cell ? col.cell(row) : row[col.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       {onView && (
                         <button onClick={() => onView(row)} className="text-slate-400 hover:text-blue-500 transition-colors p-1" title="View">
                           <Eye size={16} />
                         </button>
                       )}
                       {onEdit && (
                         <button onClick={() => onEdit(row)} className="text-slate-400 hover:text-emerald-500 transition-colors p-1" title="Edit">
                           <Pencil size={16} />
                         </button>
                       )}
                       {onDelete && (
                         <button onClick={() => onDelete(row)} className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Delete">
                           <Trash size={16} />
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500">
        <div>
          Showing 1 to {Math.min(data.length, itemsPerPage)} of {data.length} entries
        </div>
        <div className="flex items-center gap-1">
           <Button variant="outline" size="sm" disabled>Previous</Button>
           <Button variant="default" size="sm">1</Button>
           <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
