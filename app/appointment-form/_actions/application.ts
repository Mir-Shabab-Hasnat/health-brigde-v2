"use server"

import prisma from "@/lib/prisma";
import ApiResponse from "@/schema/ApiResponse";
import { FormSchema, FormSchemaType } from "@/schema/appointment";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateAplication(formData: FormSchemaType, patientAnalysis: ApiResponse) {
    const parsedFormBody = FormSchema.safeParse(formData)
    if (!parsedFormBody.success) {
        throw new Error("bad form request")
    }

    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const {name, dateOfBirth, phoneNumber, healthCardNumber, address} = parsedFormBody.data

    return await prisma.application.create({
        data: {
            patientId: user.id,
            name,
            dateOfBirth,
            phoneNumber,
            healthNumber: healthCardNumber,
            address,
            issue: patientAnalysis.issue,
            symptoms: patientAnalysis.symptom,
            medications: patientAnalysis.medication,
            severity: patientAnalysis.severity
            }
    })
}