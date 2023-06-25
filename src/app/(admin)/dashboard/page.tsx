import React from "react";
import { getCategoryInventory } from "@/lib/supabaseRequests";
import { auth } from "@clerk/nextjs";
import { supabaseClient } from "@/lib/supabaseClient";

const Page = async () => {
  const { userId, getToken } = auth();
  const token = await getToken({ template: "supabase" });
  //   const data=await getCategoryInventory(token);
//   const supabase = await supabaseClient(token);
//   const { data } = await supabase
//     .from("inventory_category")
//     .insert({ cat_name: 'Test' }).select();
//   console.log(data);
  return <div>Dashboard</div>;
};

export default Page;
