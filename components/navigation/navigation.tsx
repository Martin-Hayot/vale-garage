"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileToggle } from "../mobile-toggle";
import { ModeToggle } from "../mode-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "../auth/user-button";
import { Heart } from "lucide-react";

const Navigation = () => {
    const user = useCurrentUser();

    const [isSticky, setIsSticky] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos > 150) {
                setIsSticky(prevScrollPos > currentScrollPos);
                setPrevScrollPos(currentScrollPos);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <header
            className={cn(
                "w-full sticky z-50 top-0 transition-all duration-300 bg-neutral-100 dark:bg-neutral-900",
                isSticky ? "opacity-100 " : "opacity-0 -translate-y-full"
            )}
        >
            <nav className="flex flex-row items-center p-5 justify-between lg:justify-evenly border-b border-gray-200 dark:border-neutral-800">
                <h2 className="text-3xl font-semibold lg:pl-12">
                    <Link href="/">VaLe Garage</Link>
                </h2>
                <div>
                    <MobileToggle />
                </div>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="md:gap-x-4 md:pr-12">
                        <NavigationMenuItem>
                            <Link href="/offers" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Offers
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                >
                                    About us
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        {!user && (
                            <>
                                <NavigationMenuItem>
                                    <Link
                                        href="/auth/login"
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Sign in
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        href="/auth/register"
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md dark:bg-primary bg-primary hover:bg-[#072663] text-primary-foreground dark:hover:bg-[#042a75] px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                                            Register
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        )}
                        {user?.role === "ADMIN" && (
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Admin
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-neutral-900">
                                        <ListItem
                                            title="Dashboard"
                                            href="/admin/dashboard"
                                        >
                                            Manage users and offers
                                        </ListItem>
                                        <ListItem
                                            title="Manage Offers"
                                            href="/admin/offers"
                                        >
                                            Edit, delete or archive offers
                                        </ListItem>
                                        <ListItem
                                            title="Manage Users Accounts"
                                            href="/admin/users"
                                        >
                                            Manage normal customers and
                                            merchants accounts
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        )}
                        <Link href="/profile/likes">
                            <Heart className="w-5 h-5 hover:fill-red-500 hover:text-red-500 transition-all duration-100" />
                        </Link>
                        <ModeToggle />

                        {user && <UserButton align="end" />}
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
        </header>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors dark:hover:bg-neutral-800 hover:bg-gray-200",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default Navigation;
