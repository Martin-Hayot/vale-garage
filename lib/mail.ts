import { Resend } from "resend";
import { EmailVerificationTemplate } from "@/components/mail/verification-template";
import { getUserByEmail } from "@/data/user";

const resend = new Resend(process.env.RESEND_API_KEY);

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
