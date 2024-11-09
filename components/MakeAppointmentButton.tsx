"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MakeAppointmentButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/appointment-form")}
      variant="outline"
      className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
    >
      Make an Appointment Application
    </Button>
  );
};

export default MakeAppointmentButton;