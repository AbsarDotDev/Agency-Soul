"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeletePopUp } from "@/components/delete-popup"
import { SheetSide } from "@/components/forms/inventory-category/edit-inventory-category"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type InvCat = {
  id: number
  cat_name: string
  
}

export const columns: ColumnDef<InvCat>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "cat_name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    header:  () => <div className="text-right">Actions</div>,
    accessorKey: "actions",
    id: "actions",
    cell: ({ row }) => {
      const cat_row = row.original
 
      return (
      <div className="text-right">  <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild
              onClick={() => navigator.clipboard.writeText((cat_row.id.toString()))}
            >
               {/* @ts-ignore */}
              <SheetSide id={cat_row.id} table_name="inventory_category"/>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><DeletePopUp id={cat_row.id} table_name="inventory_category"/></DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu></div>
      )
    },
  },
  
]
