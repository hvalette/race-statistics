'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

import { DataTablePagination } from './data-table-pagination';

import { Result } from '@/lib/results';
import { DataTableCategoriesFilter } from './data-table-category-filter';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<Result, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      columnFilters,
      columnVisibility: {
        gender_category: false,
      },
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Rechercher par nom ou dossard"
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="w-full sm:max-w-sm"
        />
        <div className="hidden sm:block">
          <ToggleGroup
            type="single"
            variant={'outline'}
            value={
              (table.getColumn('gender_category')?.getFilterValue() as string) +
                '' || undefined
            }
            onValueChange={(value) => {
              console.log(value || undefined);
              table
                .getColumn('gender_category')
                ?.setFilterValue(value || undefined);
            }}
          >
            <ToggleGroupItem value="M" className="w-10">
              M
            </ToggleGroupItem>
            <ToggleGroupItem value="F" className="w-10">
              F
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="hidden sm:block">
          <DataTableCategoriesFilter table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
