import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

import QueryProvider from "@/components/providers/query-client-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "VaLe Garage",
    description: "a car sales and auction platform",
    icons: [
        {
            rel: "apple-touch-icon",
            url: "/vale-gaage-logo.png",
            sizes: "180x180",
        },
        {
            rel: "shortcut icon",
            url: "/favicon.ico",
        },
    ],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <SessionProvider refetchOnWindowFocus session={session}>
            <html lang="en" suppressHydrationWarning>
                <Head>
                    <link rel="icon" href="/vale-gaage-logo.png" />
                </Head>
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="theme"
                    >
                        <TooltipProvider>
                            <QueryProvider>
                                {children}
                                <Toaster />
                            </QueryProvider>
                        </TooltipProvider>
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
