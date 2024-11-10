"use server"

import prisma from "@/lib/prisma"
import { UpdateUserInfoSchema } from "@/schema/userInfo"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function UpdateUserInfo({ phoneNumber, location, dateOfBirth }: { phoneNumber: string | null; location: string | null; dateOfBirth: string | null }) {
    const parsedBody = UpdateUserInfoSchema.safeParse({
        phoneNumber, location, dateOfBirth
    })

    if (!parsedBody.success) {
        throw parsedBody.error
    }

    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

    const userInfo = await prisma.user.update({
        where: {
            userId: user.id
        },
        data: {
            phoneNumber: parsedBody.data.phoneNumber,
            location: parsedBody.data.location,
            dateOfBirth: parsedBody.data.dateOfBirth

        }
    })

    return userInfo
}