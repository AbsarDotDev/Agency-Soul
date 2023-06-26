"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ApiProps } from "@/interfaces/interface"
import { supabaseClient } from "@/lib/supabaseClient"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { toast } from "../../ui/use-toast"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm, SubmitHandler } from "react-hook-form"
import { InvCat } from "@/components/tables/inventory-category/columns"
const formSchema = z.object({
    invcat: z.string().min(2, {
        message: "Category name must be of at least 2 characters.",
    }),
});
async function getSingleInventroyCat(token:string,id:number){
const supabase=await supabaseClient(token);
const {data}=await supabase.from("inventory_category").select().eq("id",id);
  return data;
}
const SHEET_SIDES = "top";

type SheetSide = (typeof SHEET_SIDES)[number]

export  function SheetSide({ id, table_name }: ApiProps) {

  const { getToken } = useAuth();
  const [invcat, setInvcat] = useState<string>("");
  useEffect(() => {
    handleGetData();
  }, []);
async function handleGetData() {
  const token= await getToken({template:"supabase"});
  const data=await getSingleInventroyCat(token!,id);
  setInvcat(data![0].cat_name);
  form.setValue("invcat", data![0].cat_name); 
}

  const router = useRouter()
  type ValidationSchema = z.infer<typeof formSchema>;

  const form = useForm<ValidationSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        invcat: invcat,
      },

  });
console.log(invcat)
  const onSubmit: SubmitHandler<ValidationSchema> = async(data) => {
    const token= await getToken({template:"supabase"});
    const supabase=await supabaseClient(token);
const {error}=await supabase.from(table_name).update({"cat_name":data.invcat}).eq('id',id );
router.refresh()
          toast({
              variant: "default",
              title: "Category Updated Successfully",
          });

       
  
  };

  //   const  handleUpdate= async()=>{

  //       const token= await getToken({template:"supabase"});
  //       const supabase=await supabaseClient(token);
  // const {error}=await supabase.from(table_name).update('invcat'=value).eq('id', 1);
  // router.refresh()

  // toast({
  //   variant: "default",
  //   title: "Category Deleted Successfully",
  // });    
  //     }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key={SHEET_SIDES}>
        <SheetTrigger asChild>
          <Button variant="ghost" onClick={handleGetData}>Edit</Button>
        </SheetTrigger>
   <SheetContent side={SHEET_SIDES}>
          <SheetHeader>
            <SheetTitle>Edit Inventory Category</SheetTitle>
            <SheetDescription>
              Make changes to your Inventory Category here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <h2 className="pt-2 pb-8 text-3xl font-poppins">Add Your Category</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="w-[75%]">
                <FormField
                  control={form.control}
                  name="invcat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter new Category here"  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /></div>

              <Button type="submit" className="text-primary bg-gray-400 dark:bg-gray-700">Add Category</Button>
            </form>
          </Form>
          {/* <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleUpdate} type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  )
}
