import { Button } from "@/components/ui/button";
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
  
  
  

  return (
    <div className="h-full bg-background">
        <div className="border-b bg-card">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
            <p className="text-3xl font-bold">
              Hello, {user.firstName}!
            </p>

            <div className="flex items-center gap-3">
              <Button variant={"outline"} className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white">
                Make an Appointment Application
              </Button>
            </div>
          </div>

        </div>
    </div>
  );
};

export default page;
