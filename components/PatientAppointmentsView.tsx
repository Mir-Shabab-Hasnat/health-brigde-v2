import { Application } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const PatientAppointmentsView = () => {
    const userApplications = useQuery<Application[]>({
        queryKey: ["userApplications"],
        queryFn: () => fetch("/api/get-user-applications").then((res) => res.json()),
      });

    const applications = userApplications.data
    if (applications) {
        console.log(applications[0])
    }
      
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied When</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map(application => (
            <TableRow key={application.id}>
                <TableCell>{application.issue}</TableCell>
                <TableCell>{application.status}</TableCell>
                <TableCell>{new Date(application.createdAt).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PatientAppointmentsView