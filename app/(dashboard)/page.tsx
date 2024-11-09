import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in")
  }

  const userSettings = await prisma.user.findUnique({
    where: {
      userId: user.id
    }
  })

  if (!userSettings) {
    redirect("/wizard")
  }
  
  
  

  return <div>page</div>;
};

export default page;
