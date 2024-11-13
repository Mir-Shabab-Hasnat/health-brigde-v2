"use client";

import MakeAppointmentButton from "@/components/MakeAppointmentButton";
import PatientAppointmentsView from "@/components/PatientAppointmentsView";


import Image from "next/image";

import React from "react";



const page = () => {
  
  return (
    <div className="relative h-full">
      <Image
        src={'/Artboard.png'}
        alt="background image"
        fill
        style={{ objectFit: "cover" }} // This ensures the image covers the whole area
        className="absolute inset-0 -z-10" // Position the image behind everything else
      />
      <div className="border-b bg-card">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <p className="text-3xl font-bold">View all your appointments.</p>

          <div className="flex items-center gap-3">
            <MakeAppointmentButton />
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full gap-6 px-8 py-32">
        
        <PatientAppointmentsView />
      </div>
    </div>
  );
};

export default page;
