"use client";

import { User2Icon, LogOut, Settings } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";

import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

export const UserButton = ({
    align,
}: {
    align?: "center" | "start" | "end" | undefined;
}) => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:ring-0 focus:outline-none">
                <Avatar>
                    <AvatarImage
                        src={user?.image || ""}
                        className="focus:ring-0"
                    />
                    <AvatarFallback className="bg-zinc-800 ">
                        <User2Icon className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-40 dark:bg-white dark:text-black "
                align={align}
            >
                <DropdownMenuItem className="dark:hover:bg-gray-200">
                    <Link
                        className="flex flex-row items-center"
                        href="/settings"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <LogoutButton>
                    <DropdownMenuItem className="dark:hover:bg-gray-200">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
