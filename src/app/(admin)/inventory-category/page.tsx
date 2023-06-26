import { DataTable } from "@/components/ui/data-table"
import { InvCat, columns } from "../../../components/tables/inventory-category/columns"
import { auth } from "@clerk/nextjs"
import { supabaseClient } from "@/lib/supabaseClient";


async function getData(): Promise<InvCat[]> {
  const { getToken } = auth();
  const token= await getToken({template:"supabase"});
const supabase=await supabaseClient(token);
const {data}=await supabase.from("inventory_category").select();
  return data!;
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
