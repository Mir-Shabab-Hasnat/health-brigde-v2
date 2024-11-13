"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeletePatientApplication({applicationId} : {applicationId: string}) {
    

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