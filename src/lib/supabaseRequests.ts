import { supabaseClient } from "./supabaseClient"

export const getCategoryInventory=async (token:any)=>{
const supabase=await supabaseClient(token)
const {data}=await supabase.from("inventory_category").select();
return data;
}