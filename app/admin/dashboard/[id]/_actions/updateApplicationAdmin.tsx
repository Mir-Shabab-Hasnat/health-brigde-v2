"use server"

import prisma from "@/lib/prisma";
import { ApplicationChangeFormSchema, ApplicationChangeFormSchemaType } from "@/schema/applicationConfirmation";

export async function UpdateApplicationAdmin({applicationAdminData, applicationId}: {applicationAdminData: ApplicationChangeFormSchemaType, applicationId: string}) {
    const parsedBody = ApplicationChangeFormSchema.safeParse(applicationAdminData)
    if (!parsedBody.success) {
        throw new Error("bad form request")
    }
    

    return await prisma.application.update({
        where: {
            id: applicationId
        },
        data: {
            appointmentDate: applicationAdminData.appointmentDate,
            status: applicationAdminData.status
            
        }
    })
}