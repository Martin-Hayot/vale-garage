"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarProps {
    role: UserRole;
}

export const NavBar = ({ role }: NavBarProps) => {
    const pathname = usePathname();
    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                {role === "ADMIN" && (
                    <>
                        <Button
                            variant={
                                pathname === "/cars/models"
                                    ? "default"
                                    : "outline"
                            }
                            asChild
                        >
                            <Link href="/cars/models">Car Models</Link>
                        </Button>
                        <Button
                            variant={
                                pathname === "/offers/create"
                                    ? "default"
                                    : "outline"
                            }
                            asChild
                        >
                            <Link href="/offers/create">Create Offer</Link>
                        </Button>
                    </>
                )}

                <Button
                    variant={pathname === "/settings" ? "default" : "outline"}
                    asChild
                >
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
};
