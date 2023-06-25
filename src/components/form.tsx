"use client"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "./ui/use-toast"
const formSchema = z.object({
    firstname: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    age: z.number().min(18, {
        message: "Age must be at least 18.",
    }),
});

export function ProfileForm() {
    
    type ValidationSchema = z.infer<typeof formSchema>;

    const form = useForm<ValidationSchema>({
        resolver: zodResolver(formSchema),

    });

    const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    
            toast({
                variant: "default",
                title: "Successfully Added Data",
            });

         
    
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-wrap justify-between">
                    <div className="w-[47%]">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /></div>
                    <div className="w-[47%]">
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /></div>

                </div>
                <div className="w-[47%]">
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Age" {...field} onChange={(event) => {
                                        const value = event.target.value;
                                        field.onChange(parseInt(value, 10));
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="text-primary">Submit</Button>
            </form>
        </Form>
    )
}
