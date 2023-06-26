import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonWithIcon from "../iconbutton";
import { Pencil, PlusSquare, Trash2 } from "lucide-react";
import { DeletePopUp } from "../delete-popup";

const categories = [
  {
    id: "00000001",
    inventorycategory: "Furniture",
  },{
    id: "00000002",
    inventorycategory: "Kitchen Ka Saman",
  },{
    id: "00000003",
    inventorycategory: "Washroom Ka Saman",
  },{
    id: "00000004",
    inventorycategory: "Khana Pina ",
  },
  
];

export function InvCatTable() {
  return (<>
    <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-poppins">Inventory category</h1>
        <ButtonWithIcon
          hoverColor="bg-lime-500"
          buttonText="Add"
          icon={<PlusSquare className="mr-2 h-4 w-4" />} link={"/inventory-category/add"} />
      </div>
    <Table>
      <TableCaption>A list of your recent Inventory Categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>Inventory Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.inventorycategory}</TableCell>
            <TableCell className="text-right">
              <div className="flex flex-col lg:flex-row justify-end gap-x-2 gap-y-2">
                <ButtonWithIcon
                  hoverColor="bg-lime-500"
                  buttonText="Edit"
                  link="/inventory-category/edit"
                  icon={<Pencil className="mr-2 h-4 w-4" />}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
