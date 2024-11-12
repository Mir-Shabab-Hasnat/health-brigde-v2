import React from "react";
import { Badge } from "./ui/badge";

const statusMap: Record<
  string,
  { label: string; color: "secondary" | "default" | "destructive" | "outline" | null | undefined }
> = {
  pending: { label: "Pending", color: "secondary" },
  booked: { label: "Booked", color: "default" },
  closed: { label: "Booked", color: "destructive" },
};

const AppointmentStatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge variant={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default AppointmentStatusBadge;
