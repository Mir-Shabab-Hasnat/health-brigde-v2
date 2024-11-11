import { Application } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

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
    <div>PatientAppointmentsView</div>
  )
}

export default PatientAppointmentsView