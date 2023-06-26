import SidebarWithHeader from "@/components/Sidebar";
import Header from "@/components/header";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
} from "@clerk/nextjs";
import ButtonWithIcon from "@/components/iconbutton";
import { ChevronRight } from "lucide-react";
export default async function Home() {


  return (
    <div className="flex justify-center items-center gap-x-10 align-middle">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
        <ButtonWithIcon
        buttonText="Go to Dashboard"
        icon={<ChevronRight />}
        hoverColor="bg-primary"
        link="/dashboard"
      />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton mode="redirect" redirectUrl="/sign-in" />
      </SignedOut>
  
    </div>
  );
}
