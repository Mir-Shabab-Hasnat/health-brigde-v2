import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const allApplications = await prisma.application.findMany();
        return Response.json(allApplications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        return Response.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}