import {z} from "zod"

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

export const UpdateUserInfoSchema = z.object({
    phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneNumberRegex)
    .min(10),
  location: z.string(),
  dateOfBirth: z
    .string()
    
});