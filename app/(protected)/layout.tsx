import { currentUser } from "@/lib/auth";
import { NavBar } from "./_components/navbar";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    const user = await currentUser();
    if (!user) {
        redirect("/login");
    }
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-zinc-800 ">
            <div>
                <NavBar role={user?.role} />
            </div>
            <ScrollArea className="h-[800px]">{children}</ScrollArea>
        </div>
    );
};

export default ProtectedLayout;
