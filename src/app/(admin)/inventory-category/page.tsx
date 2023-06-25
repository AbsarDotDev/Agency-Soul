import { TableDemo } from "@/components/demotable";
import ButtonWithIcon from "@/components/iconbutton";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-poppins">Inventory category</h1>
        <Button asChild>
      <Link href="/inventory-category/add">Login</Link>
    </Button>
        {/* <ButtonWithIcon
          hoverColor="bg-lime-500"
          buttonText="Add"
          icon={<PlusSquare className="mr-2 h-4 w-4" />}
        /> */}
      </div>
      <TableDemo />
    </div>
  );
};

export default Page;
