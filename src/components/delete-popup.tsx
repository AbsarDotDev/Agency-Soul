'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  import { Button, buttonVariants } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { auth, useAuth } from "@clerk/nextjs"
import { supabaseClient } from "@/lib/supabaseClient"
import { toast } from "./ui/use-toast"
import { useRouter } from "next/navigation"
import { ApiProps } from "@/interfaces/interface"

  

  export  function DeletePopUp({id , table_name}:ApiProps) {
    const router= useRouter()
    const { getToken } = useAuth();

    const  handleDelete= async()=>{

      const token= await getToken({template:"supabase"});
      const supabase=await supabaseClient(token);
const {error}=await supabase.from(table_name).delete().eq("id",id);
router.refresh()

toast({
  variant: "default",
  title: "Category Deleted Successfully",
});    
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button  variant="destructive"><Trash2 className="mr-2 h-4 w-4"/> Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this record and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className={cn(buttonVariants({ variant: "secondary" }))}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  