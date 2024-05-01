import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer";
import QueryProvider from "@/components/providers/query-client-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "VaLe Garage",
    description: "a car sales and auction platform",
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
                        <QueryProvider>
                            <Navigation />
                            <div className="flex flex-col justify-between">
                                {children}
                                <Toaster />
                                <Footer />
                            </div>
                        </QueryProvider>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
