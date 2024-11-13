"use server";

import prisma from "@/lib/prisma";
import {
  ApplicationChangeFormSchema,
  ApplicationChangeFormSchemaType,
} from "@/schema/applicationConfirmation";

export async function UpdateApplicationAdmin({
  applicationAdminData,
  applicationId,
}: {
  applicationAdminData: ApplicationChangeFormSchemaType;
  applicationId: string;
}) {
  const parsedBody =
    ApplicationChangeFormSchema.safeParse(applicationAdminData);
  if (!parsedBody.success) {
    throw new Error("bad form request");
  }
  // Build the data object conditionally
  const dataToUpdate: { appointmentDate?: string; status?: string } = {};
  if (applicationAdminData.appointmentDate !== "") {
    dataToUpdate.appointmentDate = applicationAdminData.appointmentDate;
  }
  if (applicationAdminData.status !== "") {
    dataToUpdate.status = applicationAdminData.status;
  }

  return await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      appointmentDate: dataToUpdate.appointmentDate,
      status: dataToUpdate.status,
    },
  });
}
