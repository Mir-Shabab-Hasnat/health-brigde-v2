import { Application } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import SkeletonWrapper from "./SkeletonWrapper";

const PatientAppointmentsView = () => {
  const userApplications = useQuery<Application[]>({
    queryKey: ["userApplications"],
    queryFn: () =>
      fetch("/api/get-user-applications").then((res) => res.json()),
  });

  const applications = userApplications.data;
  if (applications) {
    console.log(applications[0]);
  }

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
                              <AppointmentStatusBadge status={application.status} />
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
