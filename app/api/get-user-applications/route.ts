import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const user = await currentUser()
    const url = new URL(request.url)
    const status = url.searchParams.get("status")

    if (!user) {
        redirect("/sign-in")
    }

    const userApplications = await prisma.application.findMany({
        where: {
            patientId: user.id,
           
        }
    })

    return Response.json(userApplications)

}