import { z } from "zod";

export const ApiApplicationAdminChangeSchema = z.object({
    appointmentDate: z.date().optional(),
    status: z.string().optional()
});

export type ApiApplicationAdminChangeSchemaType = z.infer<typeof ApiApplicationAdminChangeSchema>;
