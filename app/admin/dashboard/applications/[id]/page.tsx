import AdminApplicationForm from "@/components/AdminApplicationForm";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SeverityBadge from "@/components/ui/SeverityBadge";
import prisma from "@/lib/prisma";

import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const applicationDetails = async ({ params }: Props) => {
  const application = await prisma.application.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!application) notFound();

  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <h1 className="text-3xl font-bold">
            Appointment Application details of {application.name}
          </h1>
        </div>
      </div>
      <div className="container mx-auto w-full gap-6 px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <div className="text-2xl font-bold">
                  Health Issue : {application.issue}
                </div>
                <div className="text-2xl font-bold">
                  <div>
                    Severity: <SeverityBadge number={application.severity} />
                  </div>
                </div>
              </div>
            </CardTitle>
            <div>
              <div className="flex justify-between">
                <AppointmentStatusBadge status={application.status} />
                <div className="text-sm mt-3">
                  Created at: {new Date(application.createdAt).toDateString()}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3 space-y-3">
              <CardTitle>
                <div className="text-lg underline">Patient Info</div>
              </CardTitle>

              <div>Name: {application.name}</div>
              <div>
                Date of birth:{" "}
                {new Date(application.dateOfBirth).toDateString()}
              </div>
              <div>Health number: {application.healthNumber}</div>
              <div>Contact: {application.phoneNumber}</div>
            </div>

            <div className="mb-3 space-y-3">
              <CardTitle>
                <div className="text-lg underline">Health Issues</div>
              </CardTitle>
              <div>Issue: {application.issue}</div>
              <div>Symptoms: {application.symptoms}</div>
              <div>Medications taking currently: {application.medications}</div>
              <div>Severity: {application.severity}</div>
            </div>
          </CardContent>
          <CardFooter className="block">
            <AdminApplicationForm applicationId={application.id} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default applicationDetails;
