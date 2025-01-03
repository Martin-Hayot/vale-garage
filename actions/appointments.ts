"use server";

import * as z from "zod";

import { AppointmentSchema } from "@/schemas";
import { sendAppointmentEmail } from "@/lib/mail";

export const appointment: (
    values: z.infer<typeof AppointmentSchema>
) => Promise<{ error?: string; success?: string }> = async (
    values: z.infer<typeof AppointmentSchema>
) => {
    const validatedFields = AppointmentSchema.parse(values);

    if (!validatedFields) {
        return { error: "Invalid fields!" };
    }

    await sendAppointmentEmail(validatedFields);

    return { success: "Email sent!" };
};
