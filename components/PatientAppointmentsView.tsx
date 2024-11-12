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
  DialogClose,
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
import { DeletePatientAppointmentSchemaType } from "@/schema/deleteApplication";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const PatientAppointmentsView = () => {
  const router = useRouter();

  const userApplications = useQuery<Application[]>({
    queryKey: ["userApplications"],
    queryFn: () =>
      fetch("/api/get-user-applications").then((res) => res.json()),
  });

  const applications = userApplications.data;
  if (applications) {
    console.log(applications[0]);
  }

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

  return (
    <SkeletonWrapper isLoading={userApplications.isFetching}>
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
              {applications?.map((application) => (
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
                            View your appointment details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="gap-4 py-4">
                          <div className="items-center gap-4">
                            <span className="font-bold">Patient Name: </span>{" "}
                            {application.name}
                          </div>
                          <div className="items-center gap-4">
                            <span className="font-bold">Applied date: </span>{" "}
                            {new Date(application.createdAt).toDateString()}
                          </div>
                          <div className="items-center gap-4 mt-6">
                            <span className="font-bold">Symptoms: </span>{" "}
                            {application.symptoms}
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              type="button"
                              onClick={() => handleSubmit(application.id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <div className="block md:hidden mt-3">
                      <AppointmentStatusBadge status={application.status} />
                    </div>
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

export default PatientAppointmentsView;
