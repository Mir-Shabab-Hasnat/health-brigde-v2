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
                <TableHead className="table-header-cell hidden md:table-cell">
                  Status
                </TableHead>
                <TableHead className="table-header-cell hidden md:table-cell">
                  Applied When
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

                {allApplications?.map((application) => (
                    <TableRow key={application.id} className="table-row">
                    <TableCell className="table-cell">
                      <div className="block md:hidden mt-3"></div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell"></TableCell>
                    <TableCell className="hidden md:table-cell"></TableCell>
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
