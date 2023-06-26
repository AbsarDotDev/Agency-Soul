"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "../../ui/use-toast"
import { supabaseClient } from "@/lib/supabaseClient"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
const formSchema = z.object({
    invcat: z.string().min(2, {
        message: "Category name must be of at least 2 characters.",
    }),
});


export function InCatForm() {
    const router =useRouter()
    const { getToken } = useAuth();
    type ValidationSchema = z.infer<typeof formSchema>;

    const form = useForm<ValidationSchema>({
        resolver: zodResolver(formSchema),

    });

    const onSubmit: SubmitHandler<ValidationSchema> = async(data) => {
        const token= await getToken({template:"supabase"});
        const supabase=await supabaseClient(token);
        const {error}=await supabase.from("inventory_category").insert({"cat_name":data.invcat})
            toast({
                variant: "default",
                title: "Category Added Successfully",
            });

         router.push('/inventory-category')
    
    };
    return (
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
                                        <Input placeholder="Enter new Category here" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /></div>
                    
                <Button type="submit" className="text-primary bg-gray-400 dark:bg-gray-700">Add Category</Button>
            </form>
        </Form>
    )
}
