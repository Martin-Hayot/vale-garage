import { Separator } from "@/components/ui/separator";
import { ArrowLeft, LogOut, UserRoundX } from "lucide-react";
import Link from "next/link";
import { SidebarNav } from "./components/sidebar-nav";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/settings",
    },
    {
        title: "Merchants",
        href: "/settings/merchants",
    },
    {
        title: "Appearance",
        href: "/examples/forms/appearance",
    },
    {
        title: "Notifications",
        href: "/examples/forms/notifications",
    },
];

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center gap-6 mb-6">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Settings
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
            </header>

            <Separator className="mb-8" />

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8 flex-grow">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex flex-col">
                    <SidebarNav items={sidebarNavItems} />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 max-w-4xl">{children}</main>
                {/* Mobile Actions */}
                <div className="flex flex-col mt-6 space-y-3 md:hidden">
                    <Button
                        variant="destructive"
                        className="w-full flex items-center gap-2"
                    >
                        <UserRoundX className="h-4 w-4" />
                        Delete Account
                    </Button>

                    <LogoutButton>
                        <Button
                            variant="outline"
                            className="w-full flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 hover:text-white"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </LogoutButton>
                </div>
            </div>
        </div>
    );
}
