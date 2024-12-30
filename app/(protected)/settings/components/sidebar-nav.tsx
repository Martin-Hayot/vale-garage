"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";
import { LogOut, UserRoundX } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <div className="h-full flex flex-col justify-between">
            <nav
                className={cn(
                    "flex justify-evenly space-x-2 md:flex-col md:space-x-0 md:space-y-1",
                    className
                )}
                {...props}
            >
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:bg-transparent hover:underline",
                            "justify-start hover:text-white"
                        )}
                    >
                        {item.title}
                    </Link>
                ))}
            </nav>

            <div className="hidden md:block border-t mt-auto">
                <div className="flex flex-col space-y-3 p-4">
                    <Button variant="destructive" className="relative w-full">
                        <UserRoundX className="absolute left-3 h-4 w-4" />
                        <span>Delete Account</span>
                    </Button>
                    <LogoutButton>
                        <Button
                            variant="outline"
                            className="relative w-full border-none dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:text-white"
                        >
                            <LogOut className="absolute left-3 h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    </LogoutButton>
                </div>
            </div>
        </div>
    );
}
