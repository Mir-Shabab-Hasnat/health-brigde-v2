"use client"

import MakeAppointmentButton from "@/components/MakeAppointmentButton";
import PatientAppointmentsView from "@/components/PatientAppointmentsView";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <p className="text-3xl font-bold">View all your appointments.</p>

          <div className="flex items-center gap-3">
            <MakeAppointmentButton />
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full gap-6 px-8 py-8">
        <PatientAppointmentsView/>
      </div>
    </div>
  );
};

export default page;
