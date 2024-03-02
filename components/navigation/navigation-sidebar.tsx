import Link from "next/link";
import { UserButton } from "../auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Shield } from "lucide-react";
import { ModeToggle } from "../mode-toggle";

const NavigationSidebar = ({ setOpen }: { setOpen: Function }) => {
    const user = useCurrentUser();

    const closeSidebar = () => {
        setOpen(false);
    };
    return (
        <div className="ml-6 mt-6">
            <div className="flex flex-row gap-x-6">
                {user && <UserButton align="start" />}
                <ModeToggle />
            </div>

            <nav className="flex flex-col text-4xl mt-12 gap-y-5 text-nowrap">
                <Link
                    href="/"
                    className="hover:text-accent dark:hover:text-accent duration-150"
                    onClick={closeSidebar}
                >
                    Home
                </Link>
                <Link
                    href="/offers"
                    className="hover:text-accent dark:hover:text-accent duration-150"
                    onClick={closeSidebar}
                >
                    Offers
                </Link>
                <Link
                    href="/biddings"
                    className="hover:text-accent dark:hover:text-accent duration-150"
                    onClick={closeSidebar}
                >
                    Biddings
                </Link>
                <Link
                    href="/about"
                    className="hover:text-accent dark:hover:text-accent duration-150"
                    onClick={closeSidebar}
                >
                    About us
                </Link>
                <Link
                    href="/auth/login"
                    className="hover:text-accent dark:hover:text-accent duration-150"
                    onClick={closeSidebar}
                >
                    Sign in
                </Link>
                <Link
                    href="/auth/register"
                    className="hover:text-accent dark:hover:text-accent duration-150"
                    onClick={closeSidebar}
                >
                    Register
                </Link>
                {user?.role === "ADMIN" && (
                    <Link href="/admin/dashboard">
                        <div className="hover:text-accent dark:hover:text-accent duration-150">
                            <Shield className="w-8 h-8 inline mr-2 mb-2" />
                            Admin
                        </div>
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default NavigationSidebar;
