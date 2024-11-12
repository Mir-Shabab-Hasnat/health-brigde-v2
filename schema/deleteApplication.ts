import { z } from "zod";

export const DeletePatientAppointmentSchema = z.object({
    appointmentId: z.string().min(1)
})

export type DeletePatientAppointmentSchemaType = z.infer<typeof DeletePatientAppointmentSchema>