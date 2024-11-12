import AdminNavBar from "@/components/AdminNavBar";

import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
        <AdminNavBar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;