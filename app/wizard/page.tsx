import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Welcome, <span className="ml-2 font-bold">{user.firstName}</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Please let us know your personal details
        </h2>
      </div>

      <Separator />

      <Card className="w-full">
        <CardHeader>
            <CardTitle>
                Personal Info
            </CardTitle>
            <CardDescription>
                Give us some of your vital information
            </CardDescription>
            <CardContent>
                
            </CardContent>
        </CardHeader>

      </Card>
    </div>
  );
};

export default page;
