import { z } from "zod";

export const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    dateOfBirth: z.string().min(1, {
        message: "Date of birth is required.",
    }),
    phoneNumber: z.string().min(1, {
        message: "Phone number is required.",
    }),
    healthCardNumber: z.string().min(1, {
        message: "Health card number is required.",
    }),
    address: z.string().min(1, {
        message: "Address is required.",
    }),
});

export type FormSchemaType = z.infer<typeof FormSchema>