import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        const allApplications = await prisma.application.findMany();
        revalidatePath("/admin/dashboard/applications")
        return Response.json(allApplications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        revalidatePath("/admin/dashboard/applications")
        return Response.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}