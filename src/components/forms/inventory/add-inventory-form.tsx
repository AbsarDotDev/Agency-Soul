"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "../../ui/use-toast";
import { supabaseClient } from "@/lib/supabaseClient";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const inventorySchema = z.object({
    inventory_name: z.string().nonempty({
      message: "Inventory name is required.",
    }),
    unit_price: z.coerce.number().min(0.01, {
      message: "Unit price must be a positive number.",
    }),
    quantity: z.coerce.number().int().min(1, {
      message: "Quantity must be a positive integer.",
    }),
    inventory_category_id: z.coerce.number().int().positive({
      message: "Inventory category ID must be a positive integer.",
    }),
  });
  
export function InventoryForms() {
    const [inventoryCategories, setInventoryCategories] = useState<{ id: number; cat_name: string, created_at:string }[]>([]);
    const { getToken } = useAuth();
    const router = useRouter();
    // Fetch the inventory categories on component mount
    useEffect(() => {
      const fetchInventoryCategories = async () => {
        const token = await getToken({ template: "supabase" });
        const supabase = await supabaseClient(token);
        const { data, error } = await supabase.from("inventory_category").select("*");
        if (error) {
          // Handle the error
        } else {
          setInventoryCategories(data);
        }
      };
  
      fetchInventoryCategories();
    }, []);
  

  type ValidationSchema = z.infer<typeof inventorySchema>;

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(inventorySchema),
  });
  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const token = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(token);
    const { error } = await supabase
      .from("inventory")
      .insert({
        inventory_name: data.inventory_name,
        unit_price: Number(data.unit_price),
        quantity: Number(data.quantity),
        inventory_category_id: Number(data.inventory_category_id), // Convert to number
      });
  
    if (error) {
      // Handle error
      console.log("Error inserting inventory:", error);
    } else {
      toast({
        variant: "default",
        title: "Inventory Added Successfully",
      });
  
      router.push("/inventory-category");
    }
  };
  return (
<Form {...form}>
  <h2 className="pt-2 pb-8 text-3xl font-poppins">Add Inventory</h2>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <div className="w-[75%]">
      <FormField
        control={form.control}
        name="inventory_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inventory Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter inventory name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <div className="w-[75%]">
      <FormField
        control={form.control}
        name="unit_price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unit Price</FormLabel>
            <FormControl>
              <Input placeholder="Enter unit price" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <div className="w-[75%]">
      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input placeholder="Enter quantity" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <div className="w-[75%]">
      <FormField
        control={form.control}
        name="inventory_category_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inventory Category</FormLabel>
            <FormControl>
              <select {...field} className="form-select">
                <option value="">Select an inventory category</option>
                {inventoryCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.cat_name}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>

    <Button
      type="submit"
      className="text-primary bg-gray-400 dark:bg-gray-700"
    >
      Add Inventory
    </Button>
  </form>
</Form>

  );
}
