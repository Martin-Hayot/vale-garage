import { currentUser } from "@/lib/auth";
import { NavBar } from "./_components/navbar";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    const user = await currentUser();
    if (!user) {
        redirect("/login");
    }
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-zinc-800 overflow-y-scroll overflow-x-hidden">
            <div className="mt-32">
                <NavBar role={user?.role} />
            </div>

            {children}
        </div>
    );
};

export default ProtectedLayout;
