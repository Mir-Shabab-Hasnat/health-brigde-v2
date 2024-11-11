import prisma from "@/lib/prisma";
import { DeletePatientAppointmentSchema } from "@/schema/deleteApplication";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeletePatientApplication({applicationId} : {applicationId: string}) {
    const parsedId = DeletePatientAppointmentSchema.safeParse({
        applicationId
    })

    if (!parsedId.success) {
        throw parsedId.error
    }

    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const deleteApplication = await prisma.application.delete({
        where: {
            patientId: user.id,
            id: applicationId
            }
    })

    return deleteApplication
}