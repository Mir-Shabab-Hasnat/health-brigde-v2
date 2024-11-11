import { z } from "zod";

export const DeletePatientAppointmentSchema = z.object({
    appointmentId: z.string().min(1)
})