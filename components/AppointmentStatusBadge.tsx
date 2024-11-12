import React from "react";
import { Badge } from "./ui/badge";

const statusMap: Record<
  string,
  { label: string; color:  "gray" | "red" | "green" | "blue" | "yellow" | "orange" | "violet" }
> = {
  pending: { label: "Pending", color: "orange" },
  booked: { label: "Booked", color: "green" },
  closed: { label: "Booked", color: "red" },
};

const AppointmentStatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default AppointmentStatusBadge;
