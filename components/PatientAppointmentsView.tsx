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
              <TableHead className="table-header-cell">Status</TableHead>
              <TableHead className="table-header-cell">Applied When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.map((application) => (
              <TableRow key={application.id} className="table-row">
                <TableCell className="table-cell">
                  {application.issue}
                </TableCell>
                <TableCell className="table-cell">
                  {application.status}
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
  );
};

export default PatientAppointmentsView;
