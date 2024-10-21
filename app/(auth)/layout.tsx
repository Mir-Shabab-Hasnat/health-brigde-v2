import Logo from "@/components/Logo";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className="flex bg-indigo-900 py-3 px-9 rounded-3xl"> <Logo /></div>
       
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default layout;
