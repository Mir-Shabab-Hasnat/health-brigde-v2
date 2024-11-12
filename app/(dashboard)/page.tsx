"use client"

import MakeAppointmentButton from "@/components/MakeAppointmentButton";
import PatientAppointmentsView from "@/components/PatientAppointmentsView";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter()
  const userInfo = useQuery<User>({
    queryKey: ["getUserInfo"],
    queryFn: () => fetch("/api/get-user-info").then((res) => res.json()),
  });

  

  if (!userInfo.data) {
    console.log("no user in db")
    router.push("/wizard")
  }
  
  
  return (
    <div className="h-full bg-background">
        <div className="border-b bg-card">
          <SkeletonWrapper isLoading={userInfo.isFetching}><div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
            <p className="text-3xl font-bold">
              Hello, {userInfo.data?.name}!
            </p>

            <div className="flex items-center gap-3">
              <MakeAppointmentButton />
            </div>
          </div></SkeletonWrapper>
          
        </div>
      
        
    </div>
  );
};

export default page;
