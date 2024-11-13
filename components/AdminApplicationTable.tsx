"use client";

import { Application } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
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
import SeverityBadge from "./ui/SeverityBadge";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AdminApplicationTable = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState<string>("ascending");

  const patientApplications = useQuery<Application[]>({
    queryKey: ["get-all-aplications"],
    queryFn: () => fetch("api/get-all-applications").then((res) => res.json()),
  });

  const allApplications = patientApplications.data;

  // Handle search
  const filteredApplications = allApplications?.filter((application) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      application.issue.toLowerCase().includes(lowerCaseSearchTerm) ||
      application.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      application.severity.toString().includes(lowerCaseSearchTerm)
    );
  });

  // Handle status filter
  const filteredByStatus = filteredApplications?.filter((application) => {
    if (statusFilter === "") return true;
    return application.status === statusFilter;
  });

  // Handle sorting
  const sortedApplications = filteredByStatus?.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name); // Alphabetical sort by name
    } else if (sortBy === "severity") {
      if (sortOrder === "ascending") {
        return a.severity - b.severity; // Ascending sort by severity
      } else {
        return b.severity - a.severity; // Descending sort by severity
      }
    }
    return 0;
  });

  return (
    <SkeletonWrapper isLoading={patientApplications.isFetching}>
      <div className="w-full mb-6">
        <div className="flex gap-4 mb-4">
          {/* Search Field */}
          <input
            type="text"
            placeholder="Search by Issue, Name, or Severity"
           className="px-4 py-2 border rounded-lg w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Status Filter */}
          <select
            className="px-4 py-2 border rounded-lg w-full md:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="pending">Pending</option>
            <option value="booked">Booked</option>
            <option value="closed">Closed</option>
          </select>

          {/* Sort By */}
          <select
            className="px-4 py-2 border rounded-lg w-full md:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="severity">Sort by Severity</option>
          </select>
          {/* Severity Sort Order */}
          {sortBy === "severity" && (
            <select
              className="px-4 py-2 border rounded-lg w-full md:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          )}
        </div>

        <div className="table-container">
          <Table className="table">
            <TableHeader className="table-header">
              <TableRow>
                <TableHead className="table-header-cell">Issue</TableHead>
                <TableHead className="table-header-cell hidden md:table-cell">
                  Name of Patient
                </TableHead>
                <TableHead className="table-header-cell">Severity</TableHead>
                <TableHead className="table-header-cell hidden md:table-cell">
                  Status
                </TableHead>
                <TableHead className="table-header-cell hidden md:table-cell">
                  Applied at
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedApplications?.map((application) => (
                <TableRow key={application.id} className="table-row">
                  <TableCell className="table-cell">
                    <Button
                      variant="outline"
                      onClick={() => {
                        router.push(`/admin/dashboard/${application.id}`);
                      }}
                    >
                      {application.issue}
                    </Button>
                    <div className="block md:hidden mt-3">
                      <AppointmentStatusBadge status={application.status} />
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {application.name}
                  </TableCell>
                  <TableCell className="table-cell">
                    <SeverityBadge number={application.severity} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <AppointmentStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
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

