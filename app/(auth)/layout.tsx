import AdminButton from "@/components/AdminButton";
import AuthDecor from "@/components/AuthDecor";
import Logo from "@/components/Logo";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    
    <div className="flex min-h-screen max-md:flex-col ">
    <div className="flex flex-col w-[60%] max-md:w-full max-md:h-[25vh]">
      <AuthDecor />
    </div>
  
    <div className="flex flex-col w-[40%] max-md:w-full max-md:h-[75vh] justify-center items-center overflow-hidden md:flex-shrink-0 md:min-w-[300px]">
      {children}
      <AdminButton />
    </div>
  </div>
    
  );
};

export default layout;
