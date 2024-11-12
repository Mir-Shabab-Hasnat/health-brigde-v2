"use client";

import { Application } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SkeletonWrapper from "./SkeletonWrapper";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import SeverityBadge from "./ui/SeverityBadge";

const AdminApplicationTable = () => {
  const patientApplications = useQuery<Application[]>({
    queryKey: ["get-all-aplications"],
    queryFn: () => fetch("api/get-all-applications").then((res) => res.json()),
  });

  const allApplications = patientApplications.data;

  return (
    <SkeletonWrapper isLoading={patientApplications.isFetching}>
      <div className="w-full">
        <div className="table-container">
          <Table className="table">
            <TableHeader className="table-header">
              <TableRow>
                <TableHead className="table-header-cell">Issue</TableHead>
                <TableHead className="table-header-cell">
                  Name of Patient
                </TableHead>
                <TableHead className="table-header-cell">Severity</TableHead>
                <TableHead className="table-header-cell">Status</TableHead>
                <TableHead className="table-header-cell">Applied at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allApplications?.map((application) => (
                <TableRow key={application.id} className="table-row">
                  <TableCell className="table-cell">
                    {application.issue}
                  </TableCell>
                  <TableCell className="table-cell">
                    {application.name}
                  </TableCell>
                  <TableCell className="table-cell">
                    <SeverityBadge number={application.severity} />
                  </TableCell>
                  <TableCell className="table-cell">
                    <AppointmentStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="table-cell">
                    {new Date(application.createdAt).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default AdminApplicationTable;
