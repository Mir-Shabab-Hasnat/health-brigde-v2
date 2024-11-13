import prisma from "@/lib/prisma";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import AppointmentStatusBadge from "./AppointmentStatusBadge";

const LatestApplications = async () => {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return (
    <div className="table-container">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 font-semibold text-lg">
            Latest Issues
        </div>
      <Table className="table">
        <TableHeader className="table-header">
          <TableRow>
            <TableHead className="table-header-cell">Issue</TableHead>
            <TableHead className="table-header-cell">
              <div className="flex justify-end">Name of Patient</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((applications) => (
            <TableRow key={applications.id} className="table-row">
              <TableCell className="table-cell">
                <div className="flex-col">
                  {applications.issue}
                  <div>
                    <AppointmentStatusBadge status={applications.status} />
                  </div>
                </div>
              </TableCell>
              <TableCell className="table-cell">
                <div className="flex justify-end">{applications.name}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LatestApplications;
