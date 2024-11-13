import { z } from "zod";

export const ApplicationChangeFormSchema = z.object({
    appointmentDate: z.string().optional(),
    status: z.string().optional()

    })
    


export type ApplicationChangeFormSchemaType = z.infer<typeof ApplicationChangeFormSchema>