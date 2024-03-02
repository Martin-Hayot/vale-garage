import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Vale Garage",
    description: "A car bidding website",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="theme"
                    >
                        <Navigation />
                        <div className="flex flex-col justify-between mt-10">
                            {children}
                            <Footer />
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
