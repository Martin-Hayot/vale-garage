import { Resend } from "resend";
import { EmailVerificationTemplate } from "@/components/mail/verification-template";
import { getUserByEmail } from "@/data/user";
import { AppointmentSchema } from "@/schemas";
import { z } from "zod";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
    throw new Error(
        'Missing API key. Pass it to the constructor `new Resend("re_123")`'
    );
}

const resend = new Resend(resendApiKey);

export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "noreply@martinhayot.com",
        to: email,
        subject: "Two Factor Authentication Code",
        html: `<p>Your Two Factor Authentication code : ${token}</p>`,
    });
};

export const sendVerificationEmail = async (email: string, token: string) => {
    try {
        const confirmLink = `${
            process.env.NODE_ENV == "production"
                ? process.env.NEXT_PUBLIC_WEBSITE_URL
                : process.env.NEXT_PUBLIC_DEV_WEBSITE_URL
        }/auth/new-verification?token=${token}`;

        const user = await getUserByEmail(email);

        await resend.emails.send({
            from: "noreply@martinhayot.com",
            to: email,
            subject: "Verify your email",
            react: EmailVerificationTemplate({
                name: user?.name || "",
                href: confirmLink,
            }),
        });
    } catch (error) {
        console.error("Error sending verification email:", error);
        return { error: "Error sending verification email" };
    }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${
        process.env.NODE_ENV == "production"
            ? process.env.NEXT_PUBLIC_WEBSITE_URL
            : process.env.NEXT_PUBLIC_DEV_WEBSITE_URL
    }/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "noreply@martinhayot.com",
        to: email,
        subject: "Reset your password",
        html: `Click <a href="${resetLink}">here</a> to reset your password`,
    });
};

export const sendAppointmentEmail = async (
    data: z.infer<typeof AppointmentSchema>
) => {
    await resend.emails.send({
        from: "noreply@martinhayot.com",
        to: "mart.hyt2002@gmail.com",
        subject: "New appointment",
        html: `
            <p>Hi Martin, you have a new appointment request from ${data.firstname} ${data.lastname} (${data.gender})</p>
            <p>Email: ${data.email}</p>
            <p>Phone: ${data.phone}</p>
            <p>Message: ${data.message}</p>
        `,
    });
};
