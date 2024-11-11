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
    <div className="w-full">
      <div className="table-container">
        <Table className="table">
          <TableHeader className="table-header">
            <TableRow>
              <TableHead className="table-header-cell">Issue</TableHead>
              <TableHead className="table-header-cell hidden md:table-cell">Status</TableHead>
              <TableHead className="table-header-cell hidden md:table-cell">Applied When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.map((application) => (
              <TableRow key={application.id} className="table-row">
                <TableCell className="table-cell">
                  {application.issue}
                  <div className="block md:hidden mt-3">
                    <AppointmentStatusBadge status={application.status}/>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                <AppointmentStatusBadge status={application.status}/>
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
  );
};

export default PatientAppointmentsView;
