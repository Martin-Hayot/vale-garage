import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    const user = await currentUser();
    if (!user) {
        redirect("/auth/login");
    }
    return (
        <div className="h-full w-full flex flex-col items-center mx-auto mt-10">
            {children}
        </div>
    );
};

export default ProtectedLayout;
