import ApplicationChart from "@/components/ApplicationChart";
import ApplicationSummary from "@/components/ApplicationSummary";
import LatestApplications from "@/components/LatestApplications";
import MakeAppointmentButton from "@/components/MakeAppointmentButton";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }

  const pendingCount = await prisma.application.count({
    where: {
      patientId: user.id,
      status: "pending",
    },
  });
  const bookedCount = await prisma.application.count({
    where: {
      patientId: user.id,
      status: "booked",
    },
  });
  const closedCount = await prisma.application.count({
    where: {
      patientId: user.id,
      status: "closed",
    },
  });

  return (
    <div className="relative h-full">
      <Image
        src={"/Artboard.png"}
        alt="background image"
        fill
        style={{ objectFit: "cover" }} // This ensures the image covers the whole area
        className="absolute inset-0 -z-10" // Position the image behind everything else
      />
      <div className="border-b bg-card">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <p className="text-3xl font-bold">Hello, {userSettings.name}!</p>

          <div className="flex items-center gap-3">
            <MakeAppointmentButton />
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full gap-6 px-8 py-32">
        <div className="container mx-auto w-full px-8 py-32">
          <div className="flex flex-col space-y-4 justify-center items-center">
            <ApplicationSummary
              pending={pendingCount}
              booked={bookedCount}
              closed={closedCount}
            />
            <div className="w-full md:w-3/5">
              <ApplicationChart
                pending={pendingCount}
                booked={bookedCount}
                closed={closedCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
