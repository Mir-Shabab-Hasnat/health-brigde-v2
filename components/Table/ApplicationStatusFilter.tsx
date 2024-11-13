import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const statuses: { label: string; value?: "pending" | "booked" | "closed" }[] = [
  { label: "All" },
  { label: "Pending", value: "pending" },
  { label: "Booked", value: "booked" },
  { label: "Closed", value: "closed" },
];

const ApplicationStatusFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-full md:w-1/5 bg-background">
        <SelectValue placeholder="Filter by status..." />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value || "All"}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ApplicationStatusFilter;
