"use client";

import { Application } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SkeletonWrapper from "./SkeletonWrapper";
import { DeletePatientApplication } from "@/app/patientAppointments/_actions/delete-application";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PatientAppointmentsView = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const userApplications = useQuery<Application[]>({
    queryKey: ["userApplications"],
    queryFn: () =>
      fetch("/api/get-user-applications").then((res) => res.json()),
    refetchOnWindowFocus: true,
  });

  const applications = userApplications.data;

  const deleteAplication = useMutation({
    mutationFn: DeletePatientApplication,
    onMutate: () => {
      toast.loading("Deleting your application...");
    },
    onSuccess: async (data: Application) => {
      toast.dismiss();
      toast.success(
        `Appointment for: ${data.issue} created on ${new Date(
          data.createdAt
        ).toDateString()} deleted`,
        {
          id: "delete-aplication",
        }
      );
      router.push("/");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "delete-application",
      });
    },
  });

  const handleSubmit = (applicationId: string) => {
    deleteAplication.mutate({ applicationId });
  };

  // Filter and sort applications based on search term, status, and sorting
  const filteredApplications = applications
    ?.filter((application) => {
      // Filter by search term (issue name)
      const matchesSearchTerm = application.issue
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // Filter by status if selected
      const matchesStatusFilter =
        statusFilter === "" || application.status === statusFilter;

      return matchesSearchTerm && matchesStatusFilter;
    })
    .sort((a, b) => {
      // Sort alphabetically by issue name
      return a.issue.localeCompare(b.issue);
    });

  return (
    <SkeletonWrapper isLoading={userApplications.isFetching}>
      <div className="w-full mb-6">
        {/* Search and Filter Controls */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Issue Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-auto"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-auto"
          >
            <option value="">Filter by Status</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
            <option value="booked">Booked</option>
          </select>
        </div>

        {/* Table of Applications */}
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
              {filteredApplications?.map((application) => (
                <TableRow key={application.id} className="table-row">
                  <TableCell className="table-cell">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">{application.issue}</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] p-10">
                        <DialogHeader>
                          <DialogTitle>
                            Appointment for: {application.issue}
                            <div className="mt-3">
                              <AppointmentStatusBadge
                                status={application.status}
                              />
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            View your appointment details here.
                          </DialogDescription>
                        </DialogHeader>
                        
                        
                        <div className="gap-4 py-4 space-y-4">
                          <div className="items-center">
                            <span className="font-bold">Patient Name: </span>{" "}
                            {application.name}
                          </div>
                          
                          <div className="items-center">
                            <span className="font-bold">Applied date: </span>{" "}
                            {new Date(application.createdAt).toDateString()}
                          </div>
                          
                          <div className="items-center mt-6">
                            <span className="font-bold">Symptoms: </span>{" "}
                            {application.symptoms}
                          </div>
                          {application.appointmentDate && (<div>
                            Appointment date: {new Date(application.appointmentDate).toDateString()}
                          </div>)}
                        </div>
                        
                        <DialogFooter>
                          <Button onClick={() => handleSubmit(application.id)}>
                            Delete Appointment
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <AppointmentStatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(application.createdAt).toLocaleDateString()}
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

export default PatientAppointmentsView;
